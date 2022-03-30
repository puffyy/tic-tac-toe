import { useReducer } from "react";
const reducer = (state, action) => {
  switch (action.type) {
    case "MOVE": {
      state.squares[action.index] = action.payload;
      return {
        squares: state.squares,
        xPlayerTurn: !state.xPlayerTurn,
      };
    }
    default:
      return state;
  }
};

const useGameState = () => {
  const [gameState, gameDispatch] = useReducer(reducer, {
    xPlayerTurn: true,
    squares: Array(9).fill(null),
  });
  return { gameState, gameDispatch };
};

export default useGameState;
