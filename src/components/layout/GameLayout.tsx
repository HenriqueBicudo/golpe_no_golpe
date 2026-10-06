import { Outlet } from "react-router-dom";
import Header from "./Header";
import "./GameLayout.css";

export default function GameLayout() {
  return (
    <>
      <Header />
      <main className="game-main">
        <Outlet />
      </main>
    </>
  );
}
