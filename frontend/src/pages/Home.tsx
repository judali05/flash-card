import { useEffect, useState } from "react";
import StatusSelector from "../components/StatusSelect";
import CategorySelector from "../components/CategorySelect";
import WordLimitInput from "../components/WordLimitInput";
import PracticeButton from "../components/PracticeButton";
import { useCategories } from "../hooks/useCategories";
import { useWords } from "../hooks/useWordsCount";

const Home = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [category, setCategory] = useState<number | null>(null);
  const [limit, setLimit] = useState<number | null>(null);

  const categories = useCategories();
  const { words } = useWords(status, category);

  useEffect(() => {
    setLimit(null);
  }, [status]);

  return (
    <div className="flex-1 flex flex-col items-center justify-start bg-blue-50 px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-blue-800">Bienvenido a FlashCard</h1>
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