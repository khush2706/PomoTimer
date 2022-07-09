import { useEffect, useRef } from "react";
import { themeChange } from "theme-change";
import ReactPlayer from "react-player";

const Exercise = ({exerciseTimer, setExerciseTimer}) => {
    const changeTheme = useRef();

    useEffect(() => {
        themeChange(false);
        changeTheme.current.click();
    }, []);

    return (
        <div className="player lg:mt-28 mt-32 mx-4 lg:h-screen lg:mx-2/3">
            <button
                className="btn invisible"
                data-set-theme="retro"
                data-act-class="ACTIVECLASS"
                ref={changeTheme}
            >
                Button
            </button>
            <ReactPlayer
                url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
                controls={true}
                className="react_player"
            />
        </div>
    );
};

export default Exercise;
