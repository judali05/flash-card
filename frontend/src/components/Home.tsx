import { useNavigate } from "react-router-dom";
import WordList from "./WordList";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 px-4">
      <h1 className="text-4xl font-bold mb-4 text-blue-800">Bienvenido a FlashCart</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Practica vocabulario en inglés con tarjetas interactivas. ¡Mejora tu memoria y diviértete!
      </p>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition"
        onClick={() => navigate("/practice")}
      >
        Comenzar práctica
      </button>

      <WordList />
    </div>
  );
};

export default Home;
