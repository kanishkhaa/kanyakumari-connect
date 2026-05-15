type ContentRow<T> = {
  collection_key: string;
  payload: T;
};

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://pznlkhxpwzjfcvoxagbl.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export async function fetchCollection<T>(collectionKey: string, fallback: T): Promise<T> {
  if (!isSupabaseConfigured) return fallback;

  const url = new URL(`${SUPABASE_URL}/rest/v1/app_content`);
  url.searchParams.set("select", "collection_key,payload");
  url.searchParams.set("collection_key", `eq.${collectionKey}`);

  try {
    const res = await fetch(url.toString(), {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    if (!res.ok) throw new Error(`Supabase returned ${res.status}`);
    const rows = (await res.json()) as Array<ContentRow<T>>;
    const payload = rows[0]?.payload;
    if (Array.isArray(payload) && payload.length === 0) return fallback;
    return payload ?? fallback;
  } catch (error) {
    console.warn(`Using local fallback for ${collectionKey}`, error);
    return fallback;
  }
}

export async function insertRow<T extends Record<string, unknown>>(table: string, row: T) {
  if (!isSupabaseConfigured) return { ok: false, localOnly: true };

  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });

  if (!res.ok) throw new Error(`Unable to save ${table}: ${res.status}`);
  return { ok: true, localOnly: false };
}
