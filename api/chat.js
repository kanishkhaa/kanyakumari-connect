import { places } from '../src/data/places';
import { restaurants, dishes, emergencyContacts } from '../src/data/food';
import { stays } from '../src/data/stays';
import { events } from '../src/data/events';
import { faqs } from '../src/data/faq';
import { dtpcCenters } from '../src/data/dtpc';
import { experiences } from '../src/data/experiences';
import { operators } from '../src/data/operators';

function findRelevantContext(message) {
  const q = message.toLowerCase();
  const sections = [];

  if (/place|visit|see|temple|beach|rock|memorial|attraction|sight|spot|monument/.test(q)) {
    sections.push(`PLACES:\n${JSON.stringify(places?.slice(0, 25))}`);
  }
  if (/food|eat|restaurant|dish|cuisine|snack|meal|breakfast|lunch|dinner/.test(q)) {
    sections.push(`RESTAURANTS:\n${JSON.stringify(restaurants?.slice(0, 15))}`);
    sections.push(`DISHES:\n${JSON.stringify(dishes?.slice(0, 15))}`);
  }
  if (/stay|hotel|resort|homestay|room|book|accommodation|lodge/.test(q)) {
    sections.push(`STAYS:\n${JSON.stringify(stays?.slice(0, 20))}`);
  }
  if (/event|festival|calendar|celebration|season/.test(q)) {
    sections.push(`EVENTS:\n${JSON.stringify(events?.slice(0, 15))}`);
  }
  if (/experience|activity|thing to do|adventure|tour\b/.test(q)) {
    sections.push(`EXPERIENCES:\n${JSON.stringify(experiences?.slice(0, 15))}`);
  }
  if (/operator|guide|agency|package/.test(q)) {
    sections.push(`OPERATORS:\n${JSON.stringify(operators?.slice(0, 10))}`);
  }
  if (/emergency|police|hospital|help|sos|contact|office|ambulance|fire/.test(q)) {
    sections.push(`DTPC_CENTERS:\n${JSON.stringify(dtpcCenters)}`);
    sections.push(`EMERGENCY_CONTACTS:\n${JSON.stringify(emergencyContacts)}`);
  }

  sections.push(`FAQ:\n${JSON.stringify(faqs)}`);

  if (sections.length <= 1) {
    sections.push(`PLACES_OVERVIEW:\n${JSON.stringify(places?.slice(0, 10))}`);
  }

  return sections.join('\n\n');
}

function trimHistory(history, maxTurns = 8) {
  return history.slice(-maxTurns);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message, lang = 'en', history = [] } = req.body || {};
  if (!message) return res.status(400).json({ error: 'message is required' });

  const context = findRelevantContext(message);
  console.log('--- CONTEXT SENT TO GROQ ---');
console.log(context.slice(0, 500)); // first 500 chars, enough to verify it's real data
console.log('--- END CONTEXT ---');
  const trimmedHistory = trimHistory(history);

  const systemPrompt = `You are Kaniya, the AI travel assistant for Kanyakumari Connect (Kanniyakumari district, Tamil Nadu).

RULES:
1. Answer ONLY using facts present in the CONTEXT below. Do not invent prices, timings, ratings, or contact details not explicitly there.
2. If the answer isn't in the CONTEXT, say so honestly and point to the relevant page (/places, /stays, /food, /dtpc, /travelcare) instead of guessing.
3. For emergencies, give exact contacts from CONTEXT and suggest the SOS button on the site.
4. Keep answers concise, ideally under 100 words.
5. Reply in ${lang === 'ta' ? 'Tamil' : 'English'}.
6. CRITICAL: If unsure a fact is in CONTEXT, say you're unsure rather than guessing.

CONTEXT:
${context}`;

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          ...trimmedHistory.map((h) => ({ role: h.role === 'bot' ? 'assistant' : 'user', content: h.text })),
          { role: 'user', content: message },
        ],
        temperature: 0.25,
        max_tokens: 500,
      }),
    });

    if (!groqRes.ok) {
      console.error('Groq error:', await groqRes.text());
      return res.status(502).json({ error: 'AI provider error' });
    }

    const data = await groqRes.json();
    const reply = data.choices?.[0]?.message?.content ?? 'Sorry, I could not generate a response.';
    return res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Chat failed' });
  }
}