// Vercel Serverless Function for generating brainstorm questions
import OpenAI from 'openai';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { brainstormInput } = req.body;

    if (!brainstormInput) {
      return res.status(400).json({ error: 'Missing brainstormInput' });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a perceptive writing coach. Analyze the writer's brainstorming and identify the most important unaddressed question or gap in their thinking. Generate a single, direct question that points to what they're avoiding, missing, or haven't fully explored yet. Keep it under 15 words. Return ONLY the question, nothing else."
        },
        {
          role: "user",
          content: `Read this brainstorming and identify the most pervasive unaddressed question:\n\n${brainstormInput}\n\nWhat critical question is still lingering despite all this brainstorming?`
        }
      ],
      temperature: 0.8,
      max_tokens: 50,
    });

    const question = response.choices[0].message.content.trim().replace(/['"]/g, '');

    res.status(200).json({ question });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}

