import './App.css';
import { useState } from 'react';
import Navbar from './Components/Navbar';
import Timer from './Components/Timer';

function App() {

  const [clockTimer, setClockTimer] = useState({
    pomodoro: 25,
    short: 5,
    long: 15,
    active: "pomodoro",
    session: 0,
    longBreakInterval: 4,
});
  return (
    <div className="App">
      <Navbar clockTimer={clockTimer} setClockTimer={setClockTimer}/>
      <Timer clockTimer={clockTimer} setClockTimer={setClockTimer} />
    </div>
  );
}

export default App;
