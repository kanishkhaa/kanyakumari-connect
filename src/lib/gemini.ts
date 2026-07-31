const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

export async function askGeminiChatbot(prompt: string, lang: "en" | "ta" = "en"): Promise<string> {
  const isTamil = lang === "ta";

  if (!GEMINI_API_KEY) {
    return getLocalChatFallback(prompt, isTamil);
  }

  const systemInstruction = `You are Kaniya, an expert tourism assistant for Kanyakumari district, Tamil Nadu, India.
Provide helpful, welcoming, and accurate answers about Kanyakumari places (Vivekananda Rock, Thiruvalluvar Statue, Kumari Amman Temple, Sunset Point, Padmanabhapuram Palace, Mathoor Aqueduct, Thirparappu Falls), local food (seafood, appam, banana leaf meals), weather, buses, and stays.
IMPORTANT: You MUST reply entirely in ${isTamil ? "TAMIL (தமிழ்)" : "ENGLISH"}.
Keep your response concise, polite, and well-structured with bullet points where appropriate.`;

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `${systemInstruction}\n\nUser Question: ${prompt}` }],
          },
        ],
      }),
    });

    if (!res.ok) throw new Error(`Gemini API error: ${res.status}`);
    const data = await res.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (replyText) return replyText;
    return getLocalChatFallback(prompt, isTamil);
  } catch (err) {
    console.warn("Gemini API call failed, using smart fallback:", err);
    return getLocalChatFallback(prompt, isTamil);
  }
}

export type ItineraryDay = {
  day: number;
  title: string;
  places: string[];
  morning: string;
  afternoon: string;
  evening: string;
  tip: string;
};

export async function generateGeminiItinerary(params: {
  days: number;
  budget: string;
  pace: string;
  interests: string[];
  travelMode: string;
  lang: "en" | "ta";
}): Promise<ItineraryDay[]> {
  const isTamil = params.lang === "ta";

  if (!GEMINI_API_KEY) {
    return getLocalItineraryFallback(params, isTamil);
  }

  const systemPrompt = `You are an AI Travel Planner for Kanyakumari district, India.
Generate a customized ${params.days}-day trip itinerary based on these traveler options:
- Duration: ${params.days} Days
- Budget: ${params.budget}
- Travel Pace: ${params.pace}
- Interests: ${params.interests.join(", ")}
- Transport Mode: ${params.travelMode}
- Output Language: ${isTamil ? "TAMIL (தமிழ்)" : "ENGLISH"}

Respond strictly with valid JSON inside a markdown code block (\`\`\`json ... \`\`\`) containing an array of objects matching this exact structure:
[
  {
    "day": 1,
    "title": "${isTamil ? "நாள் 1: விவேகானந்தர் பாறை மற்றும் அஸ்தமனம்" : "Day 1: Cape Landmarks & Sunset"}",
    "places": ["Vivekananda Rock Memorial", "Thiruvalluvar Statue", "Sunset Point"],
    "morning": "Detailed morning activity...",
    "afternoon": "Detailed afternoon activity...",
    "evening": "Detailed evening activity...",
    "tip": "Useful local tip..."
  }
]`;

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: systemPrompt }] }],
      }),
    });

    if (!res.ok) throw new Error(`Gemini API error ${res.status}`);
    const data = await res.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const jsonMatch = rawText.match(/```json\s*([\s\S]*?)\s*```/) || rawText.match(/\[\s*\{[\s\S]*\}\s*\]/);

    if (jsonMatch) {
      const jsonStr = jsonMatch[1] || jsonMatch[0];
      const parsed = JSON.parse(jsonStr) as ItineraryDay[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    return getLocalItineraryFallback(params, isTamil);
  } catch (err) {
    console.warn("Gemini Itinerary generation failed, using smart fallback:", err);
    return getLocalItineraryFallback(params, isTamil);
  }
}

// Context-aware Smart Fallback Engine for Chatbot
function getLocalChatFallback(prompt: string, isTamil: boolean): string {
  const p = prompt.toLowerCase();

  if (p.includes("sunrise") || p.includes("sunset") || p.includes("சூரிய")) {
    return isTamil
      ? "🌅 **சூரிய உதயம் & அஸ்தமனம்:**\n• **சூரிய உதயம்:** திரிவேணி சங்கமத்தில் காலை 6:00 மணி அளவில்.\n• **சூரிய அஸ்தமனம்:** சன்செட் பாயிண்ட்டில் மாலை 6:00 - 6:30 மணி அளவில் சிறப்பாகக் காணலாம்."
      : "🌅 **Sunrise & Sunset Highlights:**\n• **Sunrise:** Best viewed at Triveni Sangam around 6:00 AM.\n• **Sunset:** Head to Sunset Point between 6:00 PM - 6:30 PM for magnificent Arabian Sea sunset views.";
  }

  if (p.includes("rock") || p.includes("vivekananda") || p.includes("விவேகானந்தர்")) {
    return isTamil
      ? "🗿 **விவேகானந்தர் பாறை நினைவாலயம்:**\n• படகு இயங்கும் நேரம்: காலை 8:00 - மாலை 4:00.\n• தியான மண்டபத்தில் அமைதியாக தியானம் செய்யலாம்.\n• அருகே உள்ள திருவள்ளுவர் சிலையையும் படகு வழியே காணலாம்."
      : "🗿 **Vivekananda Rock Memorial:**\n• Ferry timings: 8:00 AM to 4:00 PM daily.\n• Visit Dhyana Mandapam for peaceful meditation.\n• Pair your ferry trip with the neighboring 133-ft Thiruvalluvar Statue.";
  }

  if (p.includes("food") || p.includes("eat") || p.includes("fish") || p.includes("உணவு")) {
    return isTamil
      ? "🍛 **கன்னியாகுமரி சிறப்பு உணவுகள்:**\n• மீன் குழம்பு மற்றும் கடல் உணவு பிளேட்டர்\n• தேங்காய் அப்பம் மற்றும் இடியாப்பம்\n• பனை வெல்ல சுக்கு காபி மற்றும் நெல்லை அல்வா"
      : "🍛 **Must-Try Local Food:**\n• Fresh Meen Kuzhambu (Fish Curry) & Seafood Platter\n• Hot Appam with Coconut Stew & Fish Fry\n• Palm Jaggery Coffee & Local Banana Chips.";
  }

  return isTamil
    ? "✨ **கன்னியாகுமரி சுற்றுலா வழிகாட்டி:**\nகன்னியாகுமரி முக்கடல் சங்கமம், விவேகானந்தர் பாறை, பகவதி அம்மன் கோவில், பத்மநாபபுரம் அரண்மனை மற்றும் மாத்தூர் தொட்டிப் பாலம் ஆகியவை முக்கிய இடங்களாகும். மேலும் தகவல்களுக்கு பயண திட்ட பக்கத்தை பார்வையிடுங்கள்!"
    : "✨ **Welcome to Kanyakumari!**\nKey attractions include Vivekananda Rock Memorial, Kumari Amman Temple, Padmanabhapuram Palace, Mathoor Aqueduct, and Thirparappu Falls. Feel free to ask about hotels, transport, or food!";
}

// Context-aware Smart Fallback Engine for Itinerary
function getLocalItineraryFallback(params: { days: number; budget: string; pace: string; interests: string[]; travelMode: string }, isTamil: boolean): ItineraryDay[] {
  const days = Math.max(1, Math.min(params.days, 5));
  const result: ItineraryDay[] = [];

  const pool = [
    {
      titleEn: "Day 1: Iconic Cape Attractions & Sunset",
      titleTa: "நாள் 1: முக்கடல் சங்கமம் & பாறை நினைவாலயம்",
      places: ["Vivekananda Rock", "Thiruvalluvar Statue", "Kumari Amman Temple", "Sunset Point"],
      morningEn: "Watch sunrise at Triveni Sangam, followed by morning darshan at Devi Kanyakumari Temple.",
      morningTa: "திரிவேணி சங்கமத்தில் சூரிய உதயம் பார்த்து, பகவதி அம்மன் கோவிலில் காலை தரிசனம் செய்யுங்கள்.",
      afternoonEn: "Board the ferry to Vivekananda Rock Memorial & Thiruvalluvar Statue.",
      afternoonTa: "படகு சவாரி மூலம் விவேகானந்தர் பாறை மற்றும் 133 அடி திருவள்ளுவர் சிலையை பார்வையிடுங்கள்.",
      eveningEn: "Enjoy evening breeze and golden sunset views at Kanyakumari Sunset Point.",
      eveningTa: "சன்செட் பாயிண்ட்டில் மனதை மயக்கும் சூரிய அஸ்தமனத்தை கண்டு மகிழுங்கள்.",
      tipEn: "Book ferry tickets early in the morning to avoid queue.",
      tipTa: "வரிசையில் காத்திருப்பதை தவிர்க்க காலை 8 மணிக்கே படகு சீட்டு பெறுங்கள்.",
    },
    {
      titleEn: "Day 2: Royal Heritage & World's Longest Aqueduct",
      titleTa: "நாள் 2: அரண்மனை & மாத்தூர் தொட்டிப் பாலம்",
      places: ["Padmanabhapuram Palace", "Mathoor Aqueduct", "Thirparappu Falls"],
      morningEn: "Drive to Padmanabhapuram Palace to explore 400-year-old wooden Travancore architecture.",
      morningTa: "400 ஆண்டுகள் பழமையான மரக் கட்டிடக்கலை பத்மநாபபுரம் அரண்மனையை பார்வையிடுங்கள்.",
      afternoonEn: "Visit Mathoor Hanging Aqueduct, one of Asia's highest canal bridges.",
      afternoonTa: "ஆசியாவின் உயரமான மாத்தூர் தொட்டிப் பாலத்தை பார்வையிட்டு இயற்கை அழகை ரசியுங்கள்.",
      eveningEn: "Relax at Thirparappu Waterfalls and enjoy fresh local fish fry.",
      eveningTa: "திருப்பரப்பு அருவியில் குளித்து மகிழுங்கள்.",
      tipEn: "Wear comfortable footwear for walking inside the palace.",
      tipTa: "அரண்மனையில் நடக்க ஏற்ற காலணிகளை அணியுங்கள்.",
    },
    {
      titleEn: "Day 3: Coastal Beaches & Local Handicrafts",
      titleTa: "நாள் 3: கடற்கரை & கைவினைப் பொருட்கள்",
      places: ["Sothavilai Beach", "Vattakottai Fort", "Local Sea Shell Market"],
      morningEn: "Visit Vattakottai Seaside Fort and enjoy coastal views of the Bay of Bengal.",
      morningTa: "வட்டக்கோட்டை கடற்கரை கோட்டையை பார்வையிட்டு கடலின் அழகை ரசியுங்கள்.",
      afternoonEn: "Relax at the peaceful Sothavilai Beach with long sandy coastlines.",
      afternoonTa: "அமைதியான சொத்தவிளை கடற்கரையில் நேரத்தை செலவிடுங்கள்.",
      eveningEn: "Shop for sea-shell artifacts, palmyra handicrafts, and banana chips.",
      eveningTa: "சங்கு அலங்கார பொருட்கள் மற்றும் பனை கைவினைப் பொருட்களை வாங்குங்கள்.",
      tipEn: "Great opportunity for photography during late afternoon.",
      tipTa: "புகைப்படம் எடுக்க மாலை நேரம் சிறந்தது.",
    },
  ];

  for (let i = 0; i < days; i++) {
    const item = pool[i % pool.length];
    result.push({
      day: i + 1,
      title: isTamil ? item.titleTa : item.titleEn,
      places: item.places,
      morning: isTamil ? item.morningTa : item.morningEn,
      afternoon: isTamil ? item.afternoonTa : item.afternoonEn,
      evening: isTamil ? item.eveningTa : item.eveningEn,
      tip: isTamil ? item.tipTa : item.tipEn,
    });
  }

  return result;
}
