import { useEffect, useState } from 'react';
import api from '../services/api';
import { Word } from '../types';

function WordList() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await api.get<Word[]>('/words');
        setWords(response.data);
      } catch (error) {
        console.error('Error fetching words:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Lista de Palabras</h2>
      <ul className="list-disc pl-5">
        {words.map((word) => (
          <li key={word.id}>
            <strong>{word.english}</strong> - {word.spanish}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WordList;
