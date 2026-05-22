const fs = require("fs");
const pdfParse = require("pdf-parse");

/**
 * Extracts text from a PDF file
 * @param {string} filePath - Path to the PDF file
 * @returns {Promise<string>} Extracted text
 */
async function extractTextFromPDF(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
}

module.exports = { extractTextFromPDF };
