import { Word } from "../types";

interface Props {
  words: Word[];
  loading: boolean;
  status: string;
}

const WordList = ({ words, loading, status }: Props) => (
  <div className="...">
    <h2>Palabras con estado: {status.replace("_", " ")}</h2>
    {loading ? (
      <p>Cargando...</p>
    ) : words.length > 0 ? (
      <div className="grid ...">
        {words.map((word) => (
          <div key={word.id} className="...">
            <p>{word.english}</p>
            <p>{word.spanish}</p>
          </div>
        ))}
      </div>
    ) : (
      <p>No hay palabras con este estado.</p>
    )}
  </div>
);

export default WordList;
