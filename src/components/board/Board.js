import Square from "../squares/Squares";
import "./board.css";

const isWinnerCells = (i, winnerArr) => {
  const squares = new Set(winnerArr);
  return squares.has(i);
};

const Board = (props) => {
  return (
    <div className="board">
      {props.squares.map((square, i) => (
        <Square
          key={i}
          value={square}
          onClick={() => props.onClick(i)}
          disabled={props.disabled}
          highlight={isWinnerCells(i, props.winnerArr)}
        />
      ))}
    </div>
  );
};

export default Board;
