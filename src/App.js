import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Timer from "./Components/Timer";
import Exercise from "./Components/Exercise";

function App() {

  //Initialized timer settings state
  const [clockTimer, setClockTimer] = useState({
    pomodoro: 25,
    short: 5,
    long: 15,
    active: "pomodoro",
    session: 0,
    longBreakInterval: 4,
    isPaused: true,
    sound: true,
  });

    //Initialized exercise settings state
  const [exerciseTimer, setExerciseTimer] = useState({
    exerciseInterval: clockTimer.longBreakInterval,
    exerciseType: "back workout",
    allow: false,
    open: false,
    channelId: "UCvGEK5_U-kLgO6-AMDPeTUQ",
  });

  //Initialized list state for yt video ids
  const[videosList, setVideosList] = useState([]);
  //index state will be used as an index to shuffle the video ids in the player
  const[index, setIndex] = useState(0);

  let videoIds = [];

    //Request params for fetch request
  const API_KEY = process.env.REACT_APP_API_KEY;
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  //To update the exerciseInterval everytime the longBreakInterval changes.
  useEffect(() => {
    setExerciseTimer({
      ...exerciseTimer,
      exerciseInterval: clockTimer.longBreakInterval,
    });
  }, [clockTimer.longBreakInterval]);

  //Fetch request for the first time the app loads as well as whenever the exercise type or channel changes
  useEffect(() => {
    videoIds = [];
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&videoDuration=medium&type=video&q=${exerciseTimer.exerciseType}&channelId=${exerciseTimer.channelId}&key=${API_KEY}`;

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const items = result.items
        items.forEach(item => {
          videoIds.push(item.id.videoId)
        });
        setVideosList(videoIds)
        setIndex(0)
      })
      .catch((error) => console.log("error", error));
  }, [exerciseTimer.exerciseType, exerciseTimer.channelId])

  return (
    <div className="App">
      <Navbar
        clockTimer={clockTimer}
        setClockTimer={setClockTimer}
        exerciseTimer={exerciseTimer}
        setExerciseTimer={setExerciseTimer}
      />

      {!exerciseTimer.open && (
        <Timer clockTimer={clockTimer} setClockTimer={setClockTimer} />
      )}

      {exerciseTimer.allow &&
        clockTimer.session % exerciseTimer.exerciseInterval === 0 &&
        clockTimer.session !== 0 &&
        clockTimer.active === "long" && (
          <button
            className="btn btn-circle btn-outline absolute lg:right-2 lg:top-1/2 z-50 top-3/4 right-3"
            onClick={() =>
              setExerciseTimer({
                ...exerciseTimer,
                open: !exerciseTimer.open,
              })
            }
          >
            {!exerciseTimer.open && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z"
                />
              </svg>
            )}
            {exerciseTimer.open && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        )}

      {exerciseTimer.open && (
        <Exercise
          videosList={videosList}
          index={index}
          setIndex={setIndex}
        />
      )}
    </div>
  );
}

export default App;
