/**
 * Splits text into chunks with overlap
 * @param {string} text - The input text
 * @param {number} chunkSize - Number of characters per chunk
 * @param {number} overlap - Number of characters to overlap
 * @returns {string[]} Array of text chunks
 */
function chunkText(text, chunkSize = 500, overlap = 50) {
  if (!text) return [];

  // Normalize whitespace
  const normalizedText = text.replace(/\s+/g, ' ').trim();
  
  const chunks = [];
  let startIndex = 0;

  while (startIndex < normalizedText.length) {
    let endIndex = startIndex + chunkSize;
    
    // Try to break at a space if possible to avoid breaking words
    if (endIndex < normalizedText.length) {
      let spaceIndex = normalizedText.lastIndexOf(' ', endIndex);
      // If we found a space within the latter half of the chunk, break there
      if (spaceIndex > startIndex + (chunkSize / 2)) {
        endIndex = spaceIndex;
      }
    }
    
    const chunk = normalizedText.slice(startIndex, endIndex).trim();
    if (chunk) {
      chunks.push(chunk);
    }
    
    // Move forward, subtracting overlap
    startIndex = endIndex - overlap;
    
    // Safety check to avoid infinite loop if overlap >= chunkSize
    if (startIndex <= 0 || endIndex - startIndex <= 0) {
      startIndex += chunkSize;
    }
  }

  return chunks;
}

module.exports = { chunkText };
