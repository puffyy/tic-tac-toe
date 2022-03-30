import "./squares.css";
import icon_x from "../../assets/images/xPlayer.svg";
import icon_o from "../../assets/images/oPlayer.svg";

const Squares = (props) => {
  return (
    <button
      className="btn"
      onClick={props.onClick}
  return <button className="btn">{props.value}</button>;
      {props.value !== null ? (
        <img src={props.value === "X" ? icon_x : icon_o} />
      ) : null}
    </button>
  );
};

export default Squares;
