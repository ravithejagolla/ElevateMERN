import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getSimilarBooks = async (book) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
Suggest 3 books similar to '${book.title}' by ${book.author}. 
It is a ${book.genre} book with tags like ${book.tags.join(', ')}. 
Return as a JSON array like:
[
  { "title": "Book Title", "author": "Author Name" },
  ...
]
Only return raw JSON array, without markdown formatting or explanation.
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  let text = response.text().trim();

  if (text.startsWith("```")) {
    text = text.replace(/```json|```/g, "").trim();
  }

  try {
    return JSON.parse(text);
  } catch (err) {
    return { error: 'Could not parse JSON', raw: text };
  }
};
