// Vercel Serverless Function - keeps API key secure on the server
import OpenAI from 'openai';

export const config = {
  api: {
    bodyParser: false, // Disable body parsing to handle both JSON and FormData
  },
};

// Helper to parse request body
async function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(data));
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // No VITE_ prefix - stays server-side
    });

    const { endpoint, body } = await parseBody(req);

    let response;
    
    // Handle different OpenAI endpoints
    if (endpoint === 'chat') {
      response = await openai.chat.completions.create(body);
    } else {
      return res.status(400).json({ error: 'Invalid endpoint' });
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}

