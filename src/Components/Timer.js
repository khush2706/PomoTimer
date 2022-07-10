import { useState, useEffect, useRef } from "react";
import { themeChange } from "theme-change";
import useSound from "use-sound";
import bellSound from "../Sounds/bellSound.mp3";
import popSound from "../Sounds/popSound.mp3";

const Timer = ({ clockTimer, setClockTimer }) => {
    //Update the timer settings
    useEffect(() => {
        setMinutes(clockTimer.pomodoro);
        setSeconds(0);
        setIsPaused(true);
        pomodoroButton.current.click();
    }, [
        clockTimer.pomodoro,
        clockTimer.short,
        clockTimer.long,
        clockTimer.longBreakInterval,
    ]);

    const [minutes, setMinutes] = useState(clockTimer.pomodoro);
    const [isPaused, setIsPaused] = useState(true);
    const [seconds, setSeconds] = useState(0);
    const pomodoroButton = useRef();
    const shortButton = useRef();
    const longButton = useRef();
    const [bell] = useSound(bellSound);
    const [pop] = useSound(popSound);
    const playBellSound = useRef();
    const playPopSound = useRef();
    const [showAlert, setShowAlert] = useState(false);

    //change the mode
    const changeMode = () => {
        if (clockTimer.active === "short" || clockTimer.active === "long") {
            pomodoroButton.current.click();
        } else if (clockTimer.session % clockTimer.longBreakInterval === 0) {
            longButton.current.click();
        } else {
            shortButton.current.click();
        }
    };

    useEffect(() => {
        themeChange(false);
        pomodoroButton.current.click();
    }, []);

    //To handle the timer start and stop functionality.
    useEffect(() => {
        let interval = setInterval(() => {
            clearInterval(interval);
            if (!isPaused) {
                if (seconds === 0) {
                    if (minutes !== 0) {
                        setSeconds(59);
                        setMinutes(minutes - 1);
                    } else {
                        //change the mode
                        if (clockTimer.sound) {
                            playBellSound.current.click();
                        }
                        setIsPaused(true);
                        changeMode();
                    }
                } else {
                    setSeconds(seconds - 1);
                }
            }
        }, 1000);
    }, [seconds, isPaused]);

    const handleClick = (e) => {
        //To change the mode when the button is clicked.
        const { name } = e.target;
        //Condition to prevent refereshing the clock if the current mode is clicked again.
        if (clockTimer.active !== name) {
            if(minutes === 0 && seconds === 0){
                //
            }
            else if (
                clockTimer.active === "pomodoro" &&
                minutes !== clockTimer.pomodoro
            ) {
                if (clockTimer.sound) {
                    playPopSound.current.click();
                }
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 2000);
            }

            setClockTimer({
                ...clockTimer,
                active: name,
            });
            switch (name) {
                case "pomodoro":
                    setMinutes(clockTimer.pomodoro);
                    setIsPaused(true);
                    setSeconds(0);
                    break;
                case "short":
                    setMinutes(clockTimer.short);
                    setIsPaused(true);
                    setSeconds(0);
                    break;
                case "long":
                    setMinutes(clockTimer.long);
                    setIsPaused(true);
                    setSeconds(0);
                    break;
            }
        }
    };

    return (
        <div className="timer flex flex-col items-center w-full h-screen lg:mt-40 mt-32">
            {showAlert && (
                <div className="alert alert-warning shadow-lg w-3/4 absolute left-2 top-20 lg:w-1/3 lg:left-1/3 lg:top-5 ">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current flex-shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                        <span>Session Skipped</span>
                    </div>
                </div>
            )}
            <div className="tabs p-0 lg:p-3.5 flex items-center justify-center w-full">
                <button
                    className={`btn btn-sm lg:w-40 mx lg:mx-11 lg:w-32 mx-2.5 text-xs lg:text-sm ${!isPaused ? "btn-disabled" : ""
                        }`}
                    data-set-theme="luxury"
                    data-act-class="ACTIVECLASS"
                    name="pomodoro"
                    onClick={handleClick}
                    ref={pomodoroButton}
                >
                    Pomodoro
                </button>
                <button
                    className={`btn btn-sm lg:w-40 mx lg:mx-11 lg:w-32 mx-2.5 text-xs lg:text-sm ${!isPaused ? "btn-disabled" : ""
                        }`}
                    data-set-theme="valentine"
                    data-act-class="ACTIVECLASS"
                    name="short"
                    onClick={handleClick}
                    ref={shortButton}
                >
                    Short Break
                </button>
                <button
                    className={`btn btn-sm lg:w-40 mx lg:mx-11 lg:w-32 mx-2.5 text-xs lg:text-sm ${!isPaused ? "btn-disabled" : ""
                        }`}
                    data-set-theme="cupcake"
                    data-act-class="ACTIVECLASS"
                    name="long"
                    onClick={handleClick}
                    ref={longButton}
                >
                    Long Break
                </button>
            </div>

            <div className="clock lg:mt-5 tracking-wider text-6xl mt-14">
                <span id="js-minutes">{minutes < 10 ? `0${minutes}` : minutes}</span>
                <span className="separator">:</span>
                <span id="js-seconds">{seconds < 10 ? `0${seconds}` : seconds}</span>
                <div
                    className="control_button flex items-center justify-center lg:mt-20 mt-12"
                    onClick={() => {
                        setIsPaused(!isPaused);
                        // To increase the session when a pomodoro session starts
                        if (
                            clockTimer.active === "pomodoro" &&
                            minutes === clockTimer.pomodoro
                        ) {
                            setClockTimer({
                                ...clockTimer,
                                session: clockTimer.session + 1,
                            });
                        }
                        console.log(clockTimer);
                    }}
                >
                    {isPaused && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="75"
                            height="75"
                            viewBox="0 0 24 24"
                            fill="white"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-play cursor-pointer play-button"
                        >
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                    )}
                    {!isPaused && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="75"
                            height="75"
                            viewBox="0 0 24 24"
                            fill="white"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-pause cursor-pointer"
                        >
                            <rect x="6" y="4" width="1" height="15"></rect>
                            <rect x="14" y="4" width="1" height="15"></rect>
                        </svg>
                    )}
                </div>
                <button className="btn invisible" ref={playBellSound} onClick={bell}>
                    Button
                </button>
                <button className="btn invisible" ref={playPopSound} onClick={pop}>
                    Button
                </button>
            </div>
        </div>
    );
};

export default Timer;
