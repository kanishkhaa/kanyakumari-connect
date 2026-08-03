import { places } from '../src/data/places';
import { restaurants, dishes } from '../src/data/food';
import { stays } from '../src/data/stays';
import { experiences } from '../src/data/experiences';

// Loose matcher: does this record look related to the given interest?
// We stringify the whole object rather than assuming exact field names
// (category/tags/etc.) since the schema of these data files isn't fixed here.
function matchesInterest(record, interest) {
  const hay = JSON.stringify(record).toLowerCase();
  const keywordMap = {
    Spiritual: ['temple', 'shrine', 'pooja', 'amman', 'ashram', 'church', 'mosque', 'spiritual'],
    Nature: ['nature', 'hill', 'forest', 'waterfall', 'wildlife', 'sanctuary', 'garden', 'view point', 'viewpoint'],
    Heritage: ['heritage', 'fort', 'palace', 'museum', 'memorial', 'monument', 'colonial', 'historic'],
    Food: ['food', 'restaurant', 'dish', 'cuisine', 'snack'],
    Beach: ['beach', 'shore', 'coast', 'sea', 'rock', 'sunrise', 'sunset'],
  };
  const keywords = keywordMap[interest] || [interest.toLowerCase()];
  return keywords.some((k) => hay.includes(k));
}

// Strips fields most likely to be large/irrelevant to the model (image URLs,
// galleries) and truncates long text fields, without assuming an exact schema.
// This is what actually keeps us under the token-per-minute budget.
function compactRecord(obj, maxFieldLen = 140) {
  if (!obj || typeof obj !== 'object') return obj;
  const out = {};
  for (const [key, val] of Object.entries(obj)) {
    if (typeof val === 'string') {
      const looksLikeAsset = /^https?:\/\//i.test(val) || /\.(jpg|jpeg|png|webp|svg|gif|avif)$/i.test(val);
      if (looksLikeAsset) continue;
      out[key] = val.length > maxFieldLen ? `${val.slice(0, maxFieldLen)}…` : val;
    } else if (typeof val === 'number' || typeof val === 'boolean') {
      out[key] = val;
    } else if (Array.isArray(val) && val.every((v) => typeof v === 'string') && val.length <= 8) {
      out[key] = val; // e.g. tags/categories
    }
    // nested objects/arrays (galleries, coordinates blobs, etc.) are dropped
  }
  return out;
}

function compactList(list, count) {
  return (list || []).slice(0, count).map((r) => compactRecord(r));
}

function buildContext({ interests = [] }) {
  const interestList = interests.length ? interests : ['Spiritual', 'Nature', 'Heritage', 'Food', 'Beach'];

  const relevantPlaces = (places || []).filter((p) => interestList.some((i) => matchesInterest(p, i)));
  const relevantExperiences = (experiences || []).filter((e) => interestList.some((i) => matchesInterest(e, i)));

  const sections = [
    `PLACES (filtered by interests: ${interestList.join(', ')}):\n${JSON.stringify(
      compactList(relevantPlaces.length ? relevantPlaces : places, 6),
    )}`,
    `EXPERIENCES:\n${JSON.stringify(compactList(relevantExperiences.length ? relevantExperiences : experiences, 4))}`,
    `RESTAURANTS:\n${JSON.stringify(compactList(restaurants, 4))}`,
    `DISHES:\n${JSON.stringify(compactList(dishes, 4))}`,
    `STAYS:\n${JSON.stringify(compactList(stays, 4))}`,
  ];

  return sections.join('\n\n');
}

function extractJsonArray(text) {
  // Strip markdown code fences if the model wrapped the JSON
  const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
  // Find the first [...] block in case the model added any stray preamble
  const start = cleaned.indexOf('[');
  const end = cleaned.lastIndexOf(']');
  if (start === -1 || end === -1 || end < start) {
    throw new Error('No JSON array found in model response');
  }
  return JSON.parse(cleaned.slice(start, end + 1));
}

function validateDays(days, expectedCount) {
  if (!Array.isArray(days)) throw new Error('Response is not an array');
  return days
    .filter((d) => d && typeof d === 'object')
    .slice(0, expectedCount)
    .map((d, idx) => ({
      day: typeof d.day === 'number' ? d.day : idx + 1,
      title: String(d.title || `Day ${idx + 1}`),
      morning: String(d.morning || ''),
      afternoon: String(d.afternoon || ''),
      evening: String(d.evening || ''),
      tip: d.tip ? String(d.tip) : undefined,
    }));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { days, budget, pace, interests = [], travelMode, lang = 'en' } = req.body || {};

  const numDays = Number(days) || 3;
  if (numDays < 1 || numDays > 10) {
    return res.status(400).json({ error: 'days must be between 1 and 10' });
  }

  const context = buildContext({ interests, budget, travelMode });

  const systemPrompt = `You are Kaniya, an AI trip planner for Kanyakumari Connect (Kanniyakumari district, Tamil Nadu).

Generate a ${numDays}-day itinerary using ONLY places, restaurants, dishes, stays and experiences found in the CONTEXT below. Do not invent names, prices, or timings that aren't grounded in the CONTEXT.

Trip preferences:
- Budget: ${budget || 'not specified'}
- Pace: ${pace || 'Balanced'} (Relaxed = 1-2 stops/day, Balanced = 2-3 stops/day, Packed = 3-4 stops/day)
- Interests: ${interests.length ? interests.join(', ') : 'general sightseeing'}
- Travel mode: ${travelMode || 'Cab'}
- Language: ${lang === 'ta' ? 'Tamil' : 'English'}

Respond with ONLY a valid JSON array, no markdown fences, no commentary, matching exactly this shape:
[
  {
    "day": 1,
    "title": "Short evocative day title",
    "morning": "1-2 sentences describing the morning plan, referencing real places/experiences from CONTEXT",
    "afternoon": "1-2 sentences for the afternoon",
    "evening": "1-2 sentences for the evening",
    "tip": "One short practical traveler tip (optional)"
  }
]
The array must contain exactly ${numDays} objects, one per day, in ${lang === 'ta' ? 'Tamil' : 'English'}.

CONTEXT:
${context}`;

  const callGroq = async () =>
    fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate my ${numDays}-day itinerary.` },
        ],
        temperature: 0.4,
        max_tokens: Math.min(300 * numDays + 200, 1200),
      }),
    });

  try {
    let groqRes = await callGroq();

    // Rate limits on the free tier are common and transient - wait the
    // suggested time (from the error body) and retry once before giving up.
    if (groqRes.status === 429) {
      const errText = await groqRes.text();
      console.error('Groq rate limited:', errText);
      const waitMatch = errText.match(/(\d+(?:\.\d+)?)s/);
      const waitMs = waitMatch ? Math.min(Number(waitMatch[1]) * 1000 + 500, 20000) : 5000;
      await new Promise((resolve) => setTimeout(resolve, waitMs));
      groqRes = await callGroq();
    }

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error('Groq error:', errText);
      const isRateLimit = groqRes.status === 429;
      return res.status(isRateLimit ? 429 : 502).json({
        error: isRateLimit
          ? 'The AI planner is busy right now (rate limit). Please try again in a few seconds.'
          : 'AI provider error',
      });
    }

    const data = await groqRes.json();
    const raw = data.choices?.[0]?.message?.content ?? '';

    let parsedDays;
    try {
      parsedDays = validateDays(extractJsonArray(raw), numDays);
    } catch (parseErr) {
      console.error('Itinerary parse error:', parseErr, raw);
      return res.status(502).json({ error: 'Could not parse itinerary from AI response' });
    }

    if (!parsedDays.length) {
      return res.status(502).json({ error: 'AI returned no itinerary days' });
    }

    return res.status(200).json({ itinerary: parsedDays });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Itinerary generation failed' });
  }
}