import { useEffect, useState } from "react";
import { Word } from "../types";

export const useWords = (
  status: string | null,
  categoryId: number | null,
  limit: number | null
) => {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();
    if (status!== null) params.append("status", status);
    if (categoryId !== null) params.append("category_id", String(categoryId));
    if (limit !== null) params.append("limit", String(limit));

    setLoading(true);
    fetch(`http://localhost:3001/api/words?${params.toString()}`)
      .then((res) => res.json())
      .then(setWords)
      .catch(() => setWords([]))
      .finally(() => setLoading(false));
  }, [status, categoryId, limit]);

  return { words, loading };
};
