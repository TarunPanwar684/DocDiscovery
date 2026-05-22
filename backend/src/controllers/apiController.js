const Document = require("../models/Document");
const Chunk = require("../models/Chunk");
const { extractTextFromPDF } = require("../services/pdfService");
const { chunkText } = require("../utils/chunker");
const { generateEmbedding } = require("../services/embeddingService");
const { generateAnswer } = require("../services/llmService");

const uploadPDF = async (req, res) => {
  try {
    console.log("Upload request received");
    console.log("req.file:", req.file);
    if (!req.file) {
      console.log("Error: req.file is undefined. Body:", req.body);
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;
    const filename = req.file.originalname;

    // 1. Extract text
    const text = await extractTextFromPDF(filePath);
    console.log("Extracted text length:", text ? text.length : 0);
    
    if (!text || text.trim() === "") {
      console.log("Error: Extracted text is empty");
      return res.status(400).json({ error: "Could not extract text from PDF" });
    }

    // 2. Chunk text
    const textChunks = chunkText(text, 500, 50);

    // 3. Create Document record
    const document = new Document({ filename });
    await document.save();

    // 4. Generate embeddings and create Chunk records
    const chunkPromises = textChunks.map(async (chunkText, index) => {
      const embedding = await generateEmbedding(chunkText);
      return {
        documentId: document._id,
        text: chunkText,
        embedding: embedding,
        chunkIndex: index
      };
    });

    const chunkData = await Promise.all(chunkPromises);
    
    // 5. Save all chunks
    await Chunk.insertMany(chunkData);

    res.status(200).json({ 
      message: "File uploaded and processed successfully", 
      documentId: document._id,
      chunksProcessed: chunkData.length
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "An error occurred during file processing" });
  }
};

const chat = async (req, res) => {
  try {
    const { question } = req.body;
    
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    // 1. Embed the question
    const queryEmbedding = await generateEmbedding(question);

    // 2. Vector Search in MongoDB
    // Note: This requires an Atlas Vector Search index named "vector_index" on the chunks collection
    const pipeline = [
      {
        $vectorSearch: {
          index: "vector_index",
          path: "embedding",
          queryVector: queryEmbedding,
          numCandidates: 100,
          limit: 5 // Get top 5 matching chunks
        }
      },
      {
        $project: {
          _id: 0,
          text: 1,
          score: { $meta: "vectorSearchScore" }
        }
      }
    ];

    const matchingChunks = await Chunk.aggregate(pipeline);
    
    if (!matchingChunks || matchingChunks.length === 0) {
      return res.status(200).json({ answer: "I could not find relevant information in the uploaded PDF." });
    }

    // 3. Combine context
    const context = matchingChunks.map(chunk => chunk.text).join("\n\n");

    // 4. Generate Answer using Claude
    const answer = await generateAnswer(question, context);

    // Bonus: Return source chunks along with answer
    res.status(200).json({ 
      answer: answer,
      sources: matchingChunks
    });

  } catch (error) {
    console.error("Chat error details:", error);
    res.status(500).json({ error: "An error occurred while generating the answer", details: error.message });
  }
};

module.exports = { uploadPDF, chat };
