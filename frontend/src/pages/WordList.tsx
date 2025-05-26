import { useWords } from "../hooks/useWords";

const WordList = () => {
  const { loading, words } = useWords(null, null, null);

  return (
    <div className="flex-1 bg-blue-50 min-h-screen px-4 sm:px-6 md:px-25 py-10">
      <h1 className="text-4xl font-extrabold text-blue-800 text-center mb-8">
        Lista de Palabras
      </h1>

      {loading ? (
        <p className="text-gray-600 text-center">Cargando...</p>
      ) : words.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 max-w-7xl mx-auto">
          {words.map((word) => (
            <div
              key={word.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-2 text-center border border-blue-100"
            >
              <p className="text-blue-800 font-bold text-lg border-b border-blue-200 pb-1 mb-1">
                {word.english}
              </p>
              <p className="text-gray-600">{word.spanish}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No hay palabras disponibles.</p>
      )}
    </div>
  );
};

export default WordList;

