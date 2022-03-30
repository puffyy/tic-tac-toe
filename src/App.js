import Game from "./components/game/Game";
import GameContextProvider from "./store/GameContextProvider";
import "./App.css";

function App() {
  return (
    <GameContextProvider>
      <Game />
    </GameContextProvider>
  );
}

export default App;
