import { useState, useContext } from "react";
import { GameContext } from "../../store/GameContext";
import Board from "../board/Board";
import "./game.css";

var winnerArr;

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
      winnerArr = winnerPattern[i];
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
  const [xPlayerName, setxPlayerName] = useState("");
  const [oPlayerName, setoPlayerName] = useState("");

  const onChange = (e, setState) => {
    e.preventDefault();
    setState(e.target.value);
  };

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
      : "Winner is" + winner === "X"
      ? gameState.xPlayerName
      : gameState.oPlayerName
    : `${
        gameState.xPlayerTurn ? gameState.xPlayerName : gameState.oPlayerName
      } player turn`;

  const handleSubmit = (e) => {
    e.preventDefault();
    gameDispatch({
      type: "PLAYERS",
      payload: { xPlayerName: xPlayerName, oPlayerName: oPlayerName },
    });

    document.getElementById("welcome").style.display = "none";
    document.getElementById("game-board").style.display = "flex";
  };

  return (
    <div id="game">
      <div id="welcome">
        <h1>Tic Tac Toe</h1>
        <form id="player-form" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="xPlayerName">X Player Name:</label>
            <input
              id="xPlayerName"
              placeholder="X"
              onChange={(e) => onChange(e, setxPlayerName)}
              required
            />
          </div>
          <div>
            <label htmlFor="oPlayerName">O Player Name:</label>
            <input
              id="xPlayerName"
              placeholder="O"
              onChange={(e) => onChange(e, setoPlayerName)}
              required
            />
          </div>
          <button id="form-button" type="submit" form="player-form">
            Let's Play
          </button>
        </form>
      </div>
      <div id="game-board">
        <div id="player-board">
          <div
            id="xPlayer"
            className={
              ((typeof winner !== "string" && gameState.xPlayerTurn) ||
              winner === "X"
                ? "active-player "
                : "passive-player ") + "player"
            }
          >
            {gameState.xPlayerName}
          </div>
          <div
            id="oPlayer"
            className={
              ((typeof winner !== "string" && !gameState.xPlayerTurn) ||
              winner === "O"
                ? "active-player "
                : "passive-player ") + "player"
            }
          >
            {gameState.oPlayerName}
          </div>
        </div>
        <Board
          squares={gameState.squares}
          onClick={(i) => handleClick(i)}
          disabled={winner}
          winnerArr={winnerArr}
        />
      </div>
    </div>
  );
};

export default Game;
