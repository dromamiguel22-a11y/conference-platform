// Vercel serverless function — this runs on the server, never in the
// browser, so the API key stays hidden from anyone inspecting the site.
import conferences from '../src/conference.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ reply: 'The assistant is not configured yet — missing API key.' });
  }

  const conferenceSummary = conferences
    .map((c) => `${c.title} (${c.domain}, ${c.location}, ${c.date})`)
    .join('; ');

  const systemPrompt = `You are the LinConference Hub Assistant, a warm, slightly formal 1920s-style concierge for a conference discovery website called LinConference Hub. Here are the current conferences available: ${conferenceSummary}. Help visitors find conferences that match their interests, answer questions about dates/locations/domains, and explain that they can register on a conference's details page ("Register Now" button) and view their saved conferences and schedule via "Schedule" in the navigation. Keep replies concise (2-4 sentences). If asked something unrelated to conferences, politely redirect back to how you can help with the event listings.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] },
        }),
      }
    );

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm not sure how to respond to that just now.";

    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({ reply: "I'm having trouble connecting right now — please try again shortly." });
  }
}