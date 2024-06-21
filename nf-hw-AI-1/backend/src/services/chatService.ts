const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export async function sendMessageToGPT(message) {
  
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  const resultStream = await model.generateContentStream(message );
  
  return resultStream;
}