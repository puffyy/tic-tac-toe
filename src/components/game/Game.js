import { useContext } from "react";
import { GameContext } from "../../store/GameContext";
import Board from "../board/Board";
import "./game.css";

const Game = () => {
  const { gameState, gameDispatch } = useContext(GameContext);

  const handleClick = (i) => {
    gameDispatch({
      type: "MOVE",
      payload: gameState.xPlayerTurn ? "X" : "O",
      index: i,
    });
  };

  return (
    <div id="game">
      <Board squares={gameState.squares} onClick={(i) => handleClick(i)} />
    </div>
  );
};

export default Game;
