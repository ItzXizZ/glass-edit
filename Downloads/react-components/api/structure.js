// Vercel Serverless Function for generating story structure
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
          content: "You are a creative writing assistant. Analyze the stream of consciousness writing and break it into logical story sections. Return a JSON array of objects with 'title' (section name, 2-4 words), 'description' (1-2 sentences describing this part), and 'size' ('small', 'medium', or 'large' based on importance and content depth). Return ONLY valid JSON, no additional text."
        },
        {
          role: "user",
          content: `Analyze this stream of consciousness and create a story structure:\n\n${brainstormInput}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const sectionsText = response.choices[0].message.content.trim();
    let sections;
    
    try {
      sections = JSON.parse(sectionsText);
    } catch (e) {
      const jsonMatch = sectionsText.match(/```(?:json)?\s*(\[[\s\S]*?\])\s*```/);
      if (jsonMatch) {
        sections = JSON.parse(jsonMatch[1]);
      } else {
        throw new Error('Could not parse response as JSON');
      }
    }

    res.status(200).json({ sections });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}

