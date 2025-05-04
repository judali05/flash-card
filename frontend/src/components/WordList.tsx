import { Word } from '../services/api';

interface Props {
  words: Word[];
}

export default function WordList({ words }: Props) {
  return (
    <ul className="mt-4 space-y-2">
      {words.map((word) => (
        <li key={word.id} className="p-2 border rounded bg-gray-100">
          <strong>{word.english}</strong> — {word.spanish}
        </li>
      ))}
    </ul>
  );
}
