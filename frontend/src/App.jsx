import GameGrid from './GameGrid';
import './App.css';

function App() {
  return (
    <div id="root">
      <GameGrid rows={20} cols={20} />
    </div>
  );
}

export default App;