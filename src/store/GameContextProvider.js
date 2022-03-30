import useGameState from "./useGameState";
import { GameContext } from "./GameContext";

const GameContextProvider = ({ children }) => {
  return (
    <GameContext.Provider value={useGameState()}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
