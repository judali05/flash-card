import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Practice from "./pages/Practice";
import WordList from "./pages/WordList";

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<WordList />} />
          <Route path="/practice" element={<Practice />} />
        </Routes>
      </div>    
    </BrowserRouter>
  );
}

export default App;
