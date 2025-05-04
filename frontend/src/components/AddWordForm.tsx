import { useState } from 'react';
import { addWord } from '../services/api';

interface Props {
  onAdd: () => void;
}

export default function AddWordForm({ onAdd }: Props) {
  const [english, setEnglish] = useState('');
  const [spanish, setSpanish] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!english || !spanish) return;
    await addWord(english, spanish);
    setEnglish('');
    setSpanish('');
    onAdd(); // refrescar lista
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-2 bg-white shadow rounded">
      <input
        className="border p-2 w-full"
        placeholder="English word"
        value={english}
        onChange={(e) => setEnglish(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Spanish translation"
        value={spanish}
        onChange={(e) => setSpanish(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
        Add Word
      </button>
    </form>
  );
}
