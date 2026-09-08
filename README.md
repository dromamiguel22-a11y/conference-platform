# LinConference Hub

This is my internship project for Lincoln University College — a website where users can browse conferences, check out details, register, and build a simple schedule.

**Live site:** [add your Vercel link here]

I'm a beginner and this was my first real project with React, so the code isn't perfect, but everything listed below is working.

---

## What it does

- Browse conferences by category (AI, Business, Healthcare, IT, Sustainability)
- Search and filter conferences
- Click into a conference to see details, speakers, and the agenda
- Register for a conference
- Add sessions to a personal schedule (it warns you if two sessions clash)
- Simple dashboard showing what you've registered for
- A chatbot that answers basic questions
- Recommends conferences based on what you've clicked on before

---

## What I used

- **React** (with Vite) — for building the UI
- **React Router** — so the site has multiple pages (Home, Details, Dashboard) without reloading
- **Tailwind CSS** — for styling
- **Vercel** — to host the site so it's actually online

---

## How it's organized

\`\`\`
src/
  App.jsx                  → main file, handles routing and shared data
  conference.js             → fake conference data (I made this up)
  utils.js                  → small helper functions
  pages/
    Home.jsx                → homepage with search/filter/cards
    ConferenceDetails.jsx   → single conference page
    Dashboard.jsx            → shows registered conferences + schedule
  components/
    Chatbot.jsx              → the chat widget
\`\`\`

---

## About the "AI" features

None of this uses real AI/ML — it's all just regular JavaScript logic that acts kind of smart:

- **Search** just checks if the typed text matches a conference title
- **Chatbot** checks your message for keywords (like "AI" or "register") and replies with a matching pre-written answer
- **Recommendations** count which category you've clicked into the most and show more of that
- **Schedule builder** just compares session times and flags it if two are the same time

---

## Problems I ran into

- Had a lot of trouble with npm/terminal stuff at the start (my Windows username had a space in it, which broke a bunch of commands — took a while to figure out)
- Had some React Router errors when I added routing, turned out to be a dependency install issue
- Had to fix a routing bug on Vercel where refreshing a page other than the homepage would 404

## What I'd improve if I had more time

- Right now if you refresh the page, your registrations/schedule disappear (no saving between sessions)
- A real chatbot instead of the keyword-matching one
- Make it look better on mobile
- Let admins add/edit conferences instead of hardcoding the data

---

## Running it yourself

\`\`\`bash
npm install
npm run dev
\`\`\`
Then open \`http://localhost:5173\`
