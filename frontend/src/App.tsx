import { useEffect, useState } from 'react';
import AddWordForm from './components/AddWordForm';
import WordList from './components/WordList';
import { fetchWords, Word } from './services/api';

function App() {
  const [words, setWords] = useState<Word[]>([]);

  const loadWords = async () => {
    const data = await fetchWords();
    setWords(data);
  };

  useEffect(() => {
    loadWords();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">🧠 English Flashcards</h1>
      <AddWordForm onAdd={loadWords} />
      <WordList words={words} />
    </div>
  );
}

export default App;
