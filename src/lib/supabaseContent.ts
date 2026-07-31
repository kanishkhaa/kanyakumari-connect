type ContentRow<T> = {
  collection_key: string;
  payload: T;
};

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://pznlkhxpwzjfcvoxagbl.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

const getHeaders = () => ({
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  "Content-Type": "application/json",
});

export async function fetchCollection<T>(collectionKey: string, fallback: T): Promise<T> {
  if (!isSupabaseConfigured) return fallback;

  const url = new URL(`${SUPABASE_URL}/rest/v1/app_content`);
  url.searchParams.set("select", "collection_key,payload");
  url.searchParams.set("collection_key", `eq.${collectionKey}`);

  try {
    const res = await fetch(url.toString(), { headers: getHeaders() });
    if (!res.ok) throw new Error(`Supabase returned ${res.status}`);
    const rows = (await res.json()) as Array<ContentRow<T>>;
    const payload = rows[0]?.payload;
    if (Array.isArray(payload) && payload.length === 0) return fallback;
    return payload ?? fallback;
  } catch (error) {
    console.warn(`Using fallback for ${collectionKey}`, error);
    return fallback;
  }
}

export async function saveCollection<T>(collectionKey: string, payload: T): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/app_content`, {
      method: "POST",
      headers: {
        ...getHeaders(),
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify({ collection_key: collectionKey, payload, updated_at: new Date().toISOString() }),
    });
    return res.ok;
  } catch (err) {
    console.error(`Failed to save collection ${collectionKey}:`, err);
    return false;
  }
}

export async function fetchTableRows<T>(table: string, queryParams: Record<string, string> = {}): Promise<T[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const url = new URL(`${SUPABASE_URL}/rest/v1/${table}`);
    Object.entries(queryParams).forEach(([key, val]) => url.searchParams.set(key, val));
    const res = await fetch(url.toString(), { headers: getHeaders() });
    if (!res.ok) return [];
    return (await res.json()) as T[];
  } catch (err) {
    console.warn(`Fetch table ${table} failed:`, err);
    return [];
  }
}

export async function insertRow<T extends Record<string, unknown>>(table: string, row: T): Promise<{ ok: boolean }> {
  if (!isSupabaseConfigured) return { ok: false };
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        ...getHeaders(),
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify(row),
    });
    return { ok: res.ok };
  } catch (err) {
    console.error(`Insert to ${table} failed:`, err);
    return { ok: false };
  }
}

export async function updateRow<T extends Record<string, unknown>>(table: string, filterKey: string, filterValue: string, updates: T): Promise<{ ok: boolean }> {
  if (!isSupabaseConfigured) return { ok: false };
  try {
    const url = new URL(`${SUPABASE_URL}/rest/v1/${table}`);
    url.searchParams.set(filterKey, `eq.${filterValue}`);
    const res = await fetch(url.toString(), {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(updates),
    });
    return { ok: res.ok };
  } catch (err) {
    console.error(`Update to ${table} failed:`, err);
    return { ok: false };
  }
}

