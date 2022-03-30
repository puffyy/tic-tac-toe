import Square from "../squares/Squares";
import "./board.css";

const Board = (props) => {
  return (
    <div className="board">
      {props.squares.map((square, i) => (
        <Square
          key={i}
          value={square}
          onClick={() => props.onClick(i)}
          disabled={props.disabled}
        />
      ))}
    </div>
  );
};

export default Board;
