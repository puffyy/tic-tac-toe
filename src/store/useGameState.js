import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "MOVE": {
      state.squares[action.index] = action.payload;
      return {
        ...state,
        squares: state.squares,
        xPlayerTurn: !state.xPlayerTurn,
      };
    }
    case "PLAYERS": {
      return {
        ...state,
        xPlayerName: action.payload.xPlayerName,
        oPlayerName: action.payload.oPlayerName,
      };
    }
    case "RESET": {
      return defaultStates;
    }
    default:
      return state;
  }
};

export const defaultStates = {
  xPlayerTurn: true,
  squares: Array(9).fill(null),
  xPlayerName: "",
  yPlayerName: "",
};

const useGameState = () => {
  const [gameState, gameDispatch] = useReducer(reducer, defaultStates);
  return { gameState, gameDispatch };
};

export default useGameState;
