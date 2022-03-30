import "./squares.css";
import icon_x from "../../assets/images/xPlayer.svg";
import icon_o from "../../assets/images/oPlayer.svg";

const Squares = (props) => {
  return (
    <button
      className="btn"
      onClick={props.onClick}
      disabled={typeof props.value === "string" || props.disabled}
    >
      {props.value !== null ? (
        <img src={props.value === "X" ? icon_x : icon_o} alt="game variables" />
      ) : null}
    </button>
  );
};

export default Squares;
