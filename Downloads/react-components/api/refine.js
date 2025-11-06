// Vercel Serverless Function for text refinement
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
    const { selectedText, userFeedback } = req.body;

    if (!selectedText || !userFeedback) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a helpful writing assistant. When given a sentence and feedback about it, provide 3 different refined versions of that sentence. Return ONLY the 3 refined sentences, one per line, without numbering or additional explanation."
        },
        {
          role: "user",
          content: `Original sentence: "${selectedText}"\n\nUser feedback: ${userFeedback}\n\nPlease provide 3 refined versions of this sentence that address the feedback.`
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const refinedText = response.choices[0].message.content.trim();
    const options = refinedText.split('\n').filter(line => line.trim().length > 0);

    res.status(200).json({ 
      options: options.length >= 3 ? options.slice(0, 3) : options 
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}

