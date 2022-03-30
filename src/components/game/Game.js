import Board from "../board/Board";
import "./game.css";

const Game = () => {
  const squares = Array(9).fill(null);
  return (
    <div id="game">
      <Board squares={squares} />
    </div>
  );
};

export default Game;
