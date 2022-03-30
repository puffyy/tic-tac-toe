import { useContext } from "react";
import { GameContext } from "../../store/GameContext";
import Board from "../board/Board";
import "./game.css";

const Game = () => {
  const { gameState, gameDispatch } = useContext(GameContext);

  console.log("9", gameState);
  return (
    <div id="game">
      <Board squares={gameState.squares} />
    </div>
  );
};

export default Game;
