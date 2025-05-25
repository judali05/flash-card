import { useEffect, useState } from "react";
import { Word } from "../types";

export const useWords = (
  status: string | null,
  categoryId: number | null,
) => {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!status) return;

    const params = new URLSearchParams({ status });
    if (categoryId !== null) params.append("category_id", String(categoryId));

    setLoading(true);
    fetch(`http://localhost:3001/api/words/count?${params.toString()}`)
      .then((res) => res.json())
      .then(setWords)
      .catch(() => setWords([]))
      .finally(() => setLoading(false));
  }, [status, categoryId]);

  return { words, loading };
};
