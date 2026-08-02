import { useEffect, useState } from "react";
import { fetchCollection } from "@/lib/supabaseContent";

export function useCollection<T>(collectionKey: string, fallback: T) {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetchCollection(collectionKey, fallback)
      .then((next) => {
        if (alive) setData(next);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [collectionKey, fallback]);

  return { data, loading };
}
