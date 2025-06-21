import './App.css';
import Wordle from "./components/Wordle";
import {TimerBox} from "./playground";
function App() {
  return (
    <div className="App">
      <Wordle />
        <TimerBox startSeconds={10} />
    </div>
  );
}

export default App;
