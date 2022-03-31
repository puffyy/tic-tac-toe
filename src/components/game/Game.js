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

const closeHowToPlay = () => {
  return (document.getElementById("article-container").style.display = "none");
};

const openHowToPlay = () => {
  return (document.getElementById("article-container").style.display = "flex");
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
      : "Congratulations " +
        (winner === "X" ? gameState.xPlayerName : gameState.oPlayerName) +
        " !"
    : null;

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
          <div id="main-buttons">
            <button
              id="details-button"
              className="options"
              type="button"
              onClick={() => openHowToPlay()}
            >
              How to Play
            </button>
            <button
              id="form-button"
              className="options"
              type="submit"
              form="player-form"
            >
              Let's Play
            </button>
          </div>
        </form>
      </div>
      <div id="article-container">
        <span>
          <button
            id="close-button"
            type="button"
            onClick={() => closeHowToPlay()}
          >
            X
          </button>
          <article>
            Tic-tac-toe (also known as Noughts and crosses or Xs and Os) is a
            paper-and-pencil game for two players, X and O, who take turns
            marking the spaces in a 3×3 grid. The player who succeeds in placing
            three of their marks in a horizontal, vertical, or diagonal row wins
            the game.
          </article>
        </span>
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
      <div
        id="congratulations"
        className={
          status === null ? "hide-congrats" : "show-congrats highlight"
        }
      >
        {status}
        <button id="new-game-btn" onClick={() => window.location.reload()}>
          New Game
        </button>
      </div>
    </div>
  );
};

export default Game;
