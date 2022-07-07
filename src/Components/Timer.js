import { useState, useEffect, useRef } from "react";
import { themeChange } from "theme-change";

const Timer = ({ clockTimer, setClockTimer }) => {

    //Update the timer settings
    useEffect(() => {
        setMinutes(clockTimer.pomodoro);
        setSeconds(0);
        setIsPaused(true);
        pomodoroButton.current.click();
    }, [clockTimer.pomodoro, clockTimer.short, clockTimer.long, clockTimer.longBreakInterval])

    const [minutes, setMinutes] = useState(clockTimer.pomodoro);
    const [isPaused, setIsPaused] = useState(true);
    const [seconds, setSeconds] = useState(0);
    const pomodoroButton = useRef();
    const shortButton = useRef();
    const longButton = useRef();

    //change the mode
    const changeMode = () => {

        if(clockTimer.active==="short" || clockTimer.active==="long"){
            pomodoroButton.current.click();
        }
        else if (clockTimer.session % clockTimer.longBreakInterval === 0) {
            longButton.current.click();
        }
        else {
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
                        //Increase the session once timer hits 00:00
                        if(clockTimer.active === "pomodoro"){
                            setClockTimer({ 
                                ...clockTimer,
                                session: clockTimer.session++,
                            })
                        };
                        //change the mode
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

            // To increase the session if the user changes the mode mid-session
            if(1){
                //
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
                    onClick={() => setIsPaused(!isPaused)}
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
                            className="feather feather-play cursor-pointer"
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
            </div>
        </div>
    );
};

export default Timer;
