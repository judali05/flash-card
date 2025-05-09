// src/components/Practice.tsx
import React, { useState, useEffect} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";
import { Word } from "../types";

const shuffleArray = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Practice = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [shuffledOrder, setShuffledOrder] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get("status");


  // 🔁 Cargar palabras del backend
  useEffect(() => {
    const fetchWords = async () => {
      try {
        const res = await api.get<Word[]>(statusParam ? `/words?status=${statusParam}` : "/words");
        setWords(res.data);

        const savedOrder = localStorage.getItem("shuffledOrder");
        const savedIndex = localStorage.getItem("currentCardIndex");

        if (savedOrder) {
          setShuffledOrder(JSON.parse(savedOrder));
        } else {
          const order = shuffleArray([...Array(res.data.length).keys()]);
          setShuffledOrder(order);
          localStorage.setItem("shuffledOrder", JSON.stringify(order));
        }

        if (savedIndex) {
          setCurrentIndex(parseInt(savedIndex));
        }
      } catch (error) {
        console.error("Error cargando palabras", error);
      }
    };

    fetchWords();
  }, []);

  if (shuffledOrder.length === 0 || words.length === 0 || shuffledOrder[currentIndex] === undefined) {
    return <div className="text-center mt-10">Cargando...</div>;
  }

  const currentCard = words[shuffledOrder[currentIndex]];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedUserInput = userInput.trim().toLowerCase();
    const normalizedAnswer = currentCard.spanish.toLowerCase();
    const correct = normalizedUserInput === normalizedAnswer;

    setIsCorrect(correct);
    setShowFeedback(true);

    try {
      await api.put(`/words/${currentCard.id}/progress`, { correct });
    } catch (err) {
      console.error("Error actualizando progreso", err);
    }
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;

    if (nextIndex >= words.length) {
      const newOrder = shuffleArray([...Array(words.length).keys()]);
      setShuffledOrder(newOrder);
      setCurrentIndex(0);
      setUserInput("");
      setShowFeedback(false);
      localStorage.setItem("shuffledOrder", JSON.stringify(newOrder));
      localStorage.setItem("currentCardIndex", "0");
      return;
    }

    setShowFeedback(false);
    setUserInput("");
    setCurrentIndex(nextIndex);
    localStorage.setItem("currentCardIndex", nextIndex.toString());
  };

  const totalCards = words.length;
  const progressPercent = Math.round(((currentIndex + (showFeedback ? 1 : 0)) / totalCards) * 100);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Traduce esta palabra:</h2>

      <div className="w-full max-w-md mb-6">
        <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 text-center mt-1">
          Progreso: {currentIndex + (showFeedback ? 1 : 0)} / {totalCards}
        </p>
      </div>

      <div className="bg-blue-100 rounded-2xl px-10 py-6 shadow mb-4 text-2xl text-blue-800">
        {currentCard.english}
      </div>

      <form onSubmit={handleSubmit} className="mb-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Escribe la traducción..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl shadow text-lg"
        />
      </form>

      {showFeedback && (
        <div className={`text-xl font-semibold mb-4 ${isCorrect ? "text-green-600" : "text-red-600"}`}>
          {isCorrect ? "¡Correcto!" : `Incorrecto. Respuesta: ${currentCard.spanish}`}
        </div>
      )}

      {showFeedback && (
        <button
          onClick={handleNext}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Siguiente
        </button>
      )}

      {currentIndex >= words.length - 1 && showFeedback && (
        <button
          onClick={() => {
            const newOrder = shuffleArray([...Array(words.length).keys()]);
            setShuffledOrder(newOrder);
            setCurrentIndex(0);
            setUserInput("");
            setShowFeedback(false);
            localStorage.setItem("shuffledOrder", JSON.stringify(newOrder));
            localStorage.setItem("currentCardIndex", "0");
          }}
          className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition mt-4"
        >
          Reiniciar práctica
        </button>
      )}

      <button
        onClick={() => {
          localStorage.removeItem("currentCardIndex");
          localStorage.removeItem("shuffledOrder");
          navigate("/");
        }}
        className="mt-10 text-sm text-gray-500 underline"
      >
        Volver al inicio
      </button>
    </div>
  );
};

export default Practice;
