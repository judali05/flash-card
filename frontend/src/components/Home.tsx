import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Word } from "../types";

const Home = () => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const statuses = [
    { label: "Aprendidas", value: "aprendida", emoji: "🧠" },
    { label: "En proceso", value: "en_proceso", emoji: "⚙️" },
    { label: "Por aprender", value: "por_aprender", emoji: "📚" },
  ];
  
  useEffect(() => {
    if (!selectedStatus) return;

    setLoading(true);
    fetch(`http://localhost:3001/api/words?status=${selectedStatus}`)
      .then((res) => res.json())
      .then(setWords)
      .catch((err) => {
        console.error("Error al obtener palabras:", err);
        setWords([]);
      })
      .finally(() => setLoading(false));
  }, [selectedStatus]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-blue-800">Bienvenido a FlashCart</h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
        Practica vocabulario en inglés con tarjetas interactivas. ¡Mejora tu memoria y diviértete!
      </p>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition mb-6"
        onClick={() => navigate("/practice")}
      >
        Comenzar práctica
      </button>

      {/* Tarjetas de estado */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {statuses.map((s) => (
          <div
            key={s.value}
            className={`cursor-pointer border p-4 rounded-xl text-center shadow transition ${
              selectedStatus === s.value ? "bg-blue-100 border-blue-400" : "bg-white"
            }`}
            onClick={() => navigate(`/practice?status=${s.value}`)}
          >
            <div className="text-3xl">{s.emoji}</div>
            <div className="mt-2 font-semibold">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Lista de palabras */}
      {selectedStatus && (
        <div className="w-full max-w-xl">
          <h2 className="text-xl font-bold mb-2 text-blue-800">Palabras a practicar</h2>
          {loading ? (
            <p className="text-gray-600">Cargando palabras...</p>
          ) : words.length > 0 ? (
            <ul className="space-y-2">
              {words.map((word) => (
                <li key={word.id} className="p-3 border rounded bg-white shadow-sm">
                  {word.english} - {word.spanish}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No hay palabras con este estado aún.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;

