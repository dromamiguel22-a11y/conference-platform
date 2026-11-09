// Vercel serverless function — runs on the server, never in the
// browser, so the API key stays hidden from anyone inspecting the site.
//
// Uses Groq's free tier (no credit card required, ~1,000 requests/day
// as of testing) instead of Gemini, since Gemini's free-tier request
// limit turned out to be too strict for regular use.
import conferences from '../src/conference.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ reply: 'The assistant is not configured yet — missing API key.' });
  }

  const conferenceSummary = conferences
    .map((c) => `${c.title} (${c.domain}, ${c.location}, ${c.date})`)
    .join('; ');

  const systemPrompt = `You are the LinConference Hub Assistant, a warm, slightly formal 1920s-style concierge for a conference discovery website called LinConference Hub. Here are the current conferences available: ${conferenceSummary}. Help visitors find conferences that match their interests, answer questions about dates/locations/domains, and explain that they can register on a conference's details page ("Register Now" button) and view their saved conferences and schedule via "Schedule" in the navigation. Keep replies concise (2-4 sentences). If asked something unrelated to conferences, politely redirect back to how you can help with the event listings.`;

  // NOTE: Groq's free-tier model lineup shifts fairly often. If this
  // model name stops working, check console.groq.com for the current
  // free-tier model list and swap it in below.
  const MODEL_NAME = 'llama-3.3-70b-versatile';

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ],
      }),
    });

    const data = await response.json();

    // If Groq returned an error (bad model name, quota, etc.), surface
    // it directly in the chat instead of a generic unhelpful fallback.
    if (data.error) {
      console.error('Groq API error:', data.error);
      return res.status(200).json({
        reply: `The assistant hit an error: ${data.error.message || 'unknown error'}. (Check the Vercel function logs for details.)`,
      });
    }

    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      console.error('Unexpected Groq response shape:', JSON.stringify(data));
      return res.status(200).json({
        reply: "I received a response I couldn't understand — check the Vercel function logs for the raw output.",
      });
    }

    res.status(200).json({ reply });
  } catch (err) {
    console.error('Request to Groq failed:', err);
    res.status(500).json({ reply: "I'm having trouble connecting right now — please try again shortly." });
  }
}