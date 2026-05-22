/**
 * Using Hugging Face transformers.js for local embeddings.
 * No API key is required, and embeddings are generated directly in Node.js.
 */
let pipeline;

async function getPipeline() {
  if (!pipeline) {
    // Dynamically import since it's an ESM module (or CommonJS wrapper)
    const transformers = await import("@xenova/transformers");
    
    // We use all-MiniLM-L6-v2 which generates 384-dimensional embeddings
    pipeline = await transformers.pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }
  return pipeline;
}

/**
 * Generates an embedding for a given text
 * @param {string} text - The input text
 * @returns {Promise<number[]>} Array of 384 numbers representing the embedding
 */
async function generateEmbedding(text) {
  const extractor = await getPipeline();
  const output = await extractor(text, { pooling: "mean", normalize: true });
  // Convert the Float32Array to a standard JavaScript Array
  return Array.from(output.data);
}

module.exports = { generateEmbedding };
