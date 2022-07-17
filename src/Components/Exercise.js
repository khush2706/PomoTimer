import { useEffect, useRef, useState } from "react";
import { themeChange } from "theme-change";
import ReactPlayer from "react-player";

const Exercise = ({ videosList, index, setIndex }) => {
    const changeTheme = useRef();
    const k = index < 5 ? index : 0;
    const [url, setUrl] = useState("");

    useEffect(() => {
        themeChange(false);
        changeTheme.current.click();
        if (index >= 4) {
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
        setUrl(`https://www.youtube.com/watch?v=${videosList[k]}`);
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
            <ReactPlayer url={url} controls={true} className="react_player" />
        </div>
    );
};

export default Exercise;
