import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./pages";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Error from "./pages/Error";
import Scores from "./pages/Scores";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="game" element={<Game />} />
          <Route path="scores" element={<Scores />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;