export type ItineraryDay = {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  tip?: string;
};

type ChatMsg = { role: "bot" | "user"; text: string };

export async function askGeminiChatbot(
  message: string,
  lang: string,
  history: ChatMsg[] = []
): Promise<string> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, lang, history }),
  });
  if (!res.ok) throw new Error('Chat request failed');
  const data = await res.json();
  return data.reply as string;
}

type ItineraryParams = {
  days: number;
  budget: string;
  pace: string;
  interests: string[];
  travelMode: string;
  lang: string;
};

export async function generateGeminiItinerary(params: ItineraryParams): Promise<ItineraryDay[]> {
  const res = await fetch('/api/itinerary', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error('Itinerary request failed');
  const data = await res.json();
  return data.itinerary as ItineraryDay[];
}