import { useEffect, useState } from "react";
import StatusSelector from "../components/StatusSelect";
import CategorySelector from "../components/CategorySelect";
import WordLimitInput from "../components/WordLimitInput";
import PracticeButton from "../components/PracticeButton";
import WordList from "../components/WordList";
import { useCategories } from "../hooks/useCategories";
import { useWords } from "../hooks/useWordsCount";

const Home = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [category, setCategory] = useState<number | null>(null);
  const [limit, setLimit] = useState<number | null>(null);

  const categories = useCategories();
  const { words, loading } = useWords(status, category);

  useEffect(() => {
    setLimit(null);
  }, [status]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-blue-50 px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-blue-800">Bienvenido a FlashCart</h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
        Practica vocabulario en inglés con tarjetas interactivas. ¡Mejora tu memoria y diviértete!
      </p>

      <StatusSelector selectedStatus={status} onSelect={setStatus} />
      <CategorySelector
        categories={categories}
        selectedCategory={category}
        onChange={setCategory}
        disabled={!status}
      />
      <WordLimitInput value={limit} onChange={setLimit} words={words} disabled={!status}/>
      <PracticeButton status={status} categoryId={category} limit={limit} />
    </div>
  );
};

export default Home;


// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Word, Category } from "../types";

// const Home = () => {
//   const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
//   const [words, setWords] = useState<Word[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
//   const [wordLimit, setWordLimit] = useState<number | null>(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const statuses = [
//     { label: "Aprendidas", value: "aprendida", emoji: "🧠" },
//     { label: "En proceso", value: "en_proceso", emoji: "⚙️" },
//     { label: "Por aprender", value: "por_aprender", emoji: "📚" },
//   ];

//   useEffect(() => {
//     fetch("http://localhost:3001/api/categories")
//       .then((res) => res.json())
//       .then(setCategories)
//       .catch((err) => console.error("Error al obtener categorías:", err));
//   }, []);

//   useEffect(() => {
//     if (!selectedStatus) return;

//     setWords([]);
//     setLoading(true);

//     const params = new URLSearchParams();
//     params.append("status", selectedStatus);
//     if (selectedCategory !== null) {
//       params.append("category_id", String(selectedCategory));
//     }
//     if (wordLimit !== null) {
//       params.append("limit", String(wordLimit));
//     }

//     fetch(`http://localhost:3001/api/words?${params.toString()}`)
//       .then((res) => res.json())
//       .then(setWords)
//       .catch((err) => {
//         console.error("Error al obtener palabras:", err);
//         setWords([]);
//       })
//       .finally(() => setLoading(false));
//   }, [selectedStatus, selectedCategory, wordLimit]); // ✅ Agregamos wordLimit a las dependencias

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-start bg-blue-50 px-4 py-8">
//       <h1 className="text-4xl font-bold mb-4 text-blue-800">Bienvenido a FlashCart</h1>
//       <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
//         Practica vocabulario en inglés con tarjetas interactivas. ¡Mejora tu memoria y diviértete!
//       </p>

//       {/* Botones de estado */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 w-full max-w-2xl">
//         {statuses.map((s) => (
//           <button
//             key={s.value}
//             className={`flex flex-col items-center justify-center p-4 rounded-xl shadow text-center transition border-2
//               ${
//                 selectedStatus === s.value
//                   ? "bg-blue-100 border-blue-500"
//                   : "bg-white border-transparent hover:border-blue-300"
//               }`}
//             onClick={() => setSelectedStatus(s.value)}
//           >
//             <span className="text-4xl mb-2">{s.emoji}</span>
//             <span className="font-semibold text-blue-800">{s.label}</span>
//           </button>
//         ))}
//       </div>

//       {/* Select de categoría */}
//       <div className="mb-6 w-full max-w-sm">
//         <label className="block text-blue-800 font-semibold mb-1" htmlFor="category">
//           Selecciona una categoría:
//         </label>
//         <select
//           id="category"
//           value={selectedCategory ?? ""}
//           onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : null)}
//           className="w-full border border-gray-300 rounded-xl p-2"
//           disabled={!selectedStatus} // ✅ Desactivado hasta que se seleccione un status
//         >
//           <option value="">Todas</option>
//           {categories.map((cat) => (
//             <option key={cat.id} value={cat.id}>
//               {cat.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Input para límite de palabras */}
//       <div className="mb-6 w-full max-w-sm">
//         <label className="block text-blue-800 font-semibold mb-1" htmlFor="wordLimit">
//           Cantidad de palabras a practicar:
//         </label>
//         <input
//           id="wordLimit"
//           type="number"
//           min={1}
//           placeholder="Ej: 10"
//           value={wordLimit ?? ""}
//           onChange={(e) => {
//             const value = parseInt(e.target.value);
//             if (!isNaN(value) && value > 0) {
//               setWordLimit(value);
//             } else {
//               setWordLimit(null);
//             }
//           }}
//           className="w-full border border-gray-300 rounded-xl p-2"
//           disabled={!selectedStatus} // ✅ Desactivado hasta que se seleccione un status
//         />
//       </div>

//       {/* Botón de iniciar práctica */}
//       <button
//         className={`bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition mb-8 ${
//           !selectedStatus ? "opacity-50 cursor-not-allowed" : ""
//         }`}
//         disabled={!selectedStatus}
//         onClick={() => {
//           if (!selectedStatus) return;

//           const query: Record<string, string> = { status: selectedStatus };
//           if (selectedCategory !== null) {
//             query.category_id = String(selectedCategory);
//           }
//           if (wordLimit !== null) {
//             query.limit = String(wordLimit);
//           }

//           const params = new URLSearchParams(query);
//           navigate(`/practice?${params.toString()}`);
//         }}
//       >
//         Comenzar práctica
//       </button>

//       {/* Lista de palabras */}
//       {selectedStatus && (
//         <div className="w-full max-w-xl">
//           <h2 className="text-xl font-bold mb-2 text-blue-800">
//             Palabras con estado: <span className="capitalize">{selectedStatus.replace("_", " ")}</span>
//           </h2>
//           {loading ? (
//             <p className="text-gray-600">Cargando palabras...</p>
//           ) : words.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {words.map((word) => (
//                 <div
//                   key={word.id}
//                   className="bg-white border rounded-xl p-4 shadow hover:shadow-md transition"
//                 >
//                   <p className="text-blue-800 font-bold text-lg">{word.english}</p>
//                   <p className="text-gray-600">{word.spanish}</p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-600">No hay palabras con este estado aún.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;
