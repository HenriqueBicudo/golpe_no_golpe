import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import GameLayout from "./components/layout/GameLayout";
import Home from "./routes/Home";
import Tutorial from "./routes/Tutorial";
import LearnMore from "./routes/LearnMore";
import About from "./routes/About";
import ScenarioSelect from "./routes/ScenarioSelect";
import Game from "./routes/Game";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tutorial" element={<Tutorial />} />
        <Route path="aprenda-mais" element={<LearnMore />} />
        <Route path="quem-somos" element={<About />} />
      </Route>
      <Route element={<GameLayout />}>
        <Route path="jogo" element={<ScenarioSelect />} />
        <Route path="jogo/:scenarioId" element={<Game />} />
      </Route>
    </Routes>
  );
}
