const { Anthropic } = require("@anthropic-ai/sdk");

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Generates an answer using Claude given a question and context
 * @param {string} question - The user's question
 * @param {string} context - The combined text chunks from the PDF
 * @returns {Promise<string>} Claude's answer
 */
async function generateAnswer(question, context) {
  const systemPrompt = "You are an AI assistant that answers questions only from the provided PDF context. If the answer is not found in the context, say 'I could not find this information in the uploaded PDF.'";
  
  const userPrompt = `Context from PDF:\n---\n${context}\n---\n\nQuestion: ${question}`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307", // Using Haiku as it's fast and cost-effective
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        { role: "user", content: userPrompt }
      ]
    });

    return response.content[0].text;
  } catch (error) {
    console.error("Error calling Anthropic API:", error);
    throw error;
  }
}

module.exports = { generateAnswer };
