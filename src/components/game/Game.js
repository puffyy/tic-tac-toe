import { useContext } from "react";
import { GameContext } from "../../store/GameContext";
import Board from "../board/Board";
import "./game.css";

const winnerPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const calculateWinner = (squares) => {
  let isDraw = true;
  for (let i = 0; i < winnerPattern.length; i++) {
    const [a, b, c] = winnerPattern[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
    if (!squares[a] || !squares[b] || !squares[c]) {
      isDraw = false;
    }
  }
  if (isDraw) {
    return "D";
  }
  return null;
};

const Game = () => {
  const { gameState, gameDispatch } = useContext(GameContext);

  const handleClick = (i) => {
    gameDispatch({
      type: "MOVE",
      payload: gameState.xPlayerTurn ? "X" : "O",
      index: i,
    });
  };

  let winner = calculateWinner(gameState.squares);

  const status = winner
    ? winner === "D"
      ? "D"
      : "Winner is" + winner
    : `${gameState.xPlayerTurn ? "X" : "O"} player turn`;

  return (
    <div id="game">
      <div>{status}</div>
      <Board
        squares={gameState.squares}
        onClick={(i) => handleClick(i)}
        disabled={winner}
      />
    </div>
  );
};

export default Game;
