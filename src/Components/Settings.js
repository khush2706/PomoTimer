import { useState } from "react";

const Settings = ({
    clockTimer,
    setClockTimer,
    exerciseTimer,
    setExerciseTimer,
}) => {
    const [pomoTime, setPomoTime] = useState(25);
    const [shortTime, setShortTime] = useState(5);
    const [longTime, setLongTime] = useState(15);
    const [longInterval, setLongInterval] = useState(4);
    const [allowExercise, setAllowExercise] = useState(false);
    const [exerciseType, setExerciseType] = useState(exerciseTimer.exerciseType);
    const [channelId, setChannelId] = useState(exerciseTimer.channelId)
    

    const handleSubmit = (e) => {
        e.preventDefault();
        setClockTimer({
            ...clockTimer,
            pomodoro: parseInt(pomoTime),
            short: parseInt(shortTime),
            long: parseInt(longTime),
            longBreakInterval: parseInt(longInterval),
        });

        setExerciseTimer({
            ...exerciseTimer,
            allow: allowExercise,
            exerciseType: exerciseType,
            channelId: channelId,
        });

        console.log(clockTimer);
        console.log(exerciseTimer);
    };

    const handleChange = (e) => {
        const [option] = e.target.selectedOptions;
        setChannelId(option.dataset.id);
        console.log(option.dataset.id);
    };

    const updateType = (e) => {
        const [option] = e.target.selectedOptions;
        setExerciseType(option.dataset.name);
        console.log(option.dataset.name);
    };

    return (
        <div className="settings">
            <label
                htmlFor="my-modal-3"
                className="btn btn-square btn-ghost modal-button"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-settings"
                >
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
            </label>

            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label
                        htmlFor="my-modal-3"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <h3 className="text-xl">Timer Settings</h3>
                    <div className="divider"></div>
                    <h4 className="text-lg mb-4">Time (minutes)</h4>
                    <div className="form-control w-full">
                        <form onSubmit={handleSubmit}>
                            <div className="flex justify-between">
                                <div>
                                    <label className="label">
                                        <span className="label-text">Pomodoro</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="input input-bordered w-4/5 lg:w-3/4"
                                        value={pomoTime}
                                        onChange={(e) => setPomoTime(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="label-text">Short Break</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="input input-bordered w-4/5 lg:w-3/4"
                                        value={shortTime}
                                        onChange={(e) => setShortTime(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="label-text">Long Break</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="input input-bordered w-4/5 lg:w-3/4"
                                        value={longTime}
                                        onChange={(e) => setLongTime(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between mt-8">
                                <label className="label">
                                    <span className="label-text">Long Break Interval</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="input input-bordered w-2/5"
                                    value={longInterval}
                                    onChange={(e) => setLongInterval(e.target.value)}
                                />
                            </div>

                            <div className="flex justify-between mt-8">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Exercise Break</span>
                                </label>
                                <input
                                    type="checkbox"
                                    className="toggle"
                                    checked={allowExercise}
                                    onChange={() => setAllowExercise(!allowExercise)}
                                />
                            </div>

                            <div className="flex justify-between mt-8">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Exercise Type</span>
                                </label>
                                <select class="select select-bordered w-2/5" onChange={updateType}>
                                    <option selected data-name="back workout">Back</option>
                                    <option data-name="arms workout">Arms</option>
                                    <option data-name="thighs workout">Thighs</option>
                                    <option data-name="abs workout">Abs</option>
                                    <option data-name="kickboxing workout">KickBoxing</option>
                                    <option data-name="full body workout">Full Body</option>
                                </select>
                            </div>

                            <div className="flex justify-between mt-8">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Channel</span>
                                </label>
                                <select
                                    class="select select-bordered w-2/5"
                                    onChange={handleChange}
                                >
                                    <option selected data-id="UCvGEK5_U-kLgO6-AMDPeTUQ">
                                        Emi Wong
                                    </option>
                                    <option data-id="UCCgLoMYIyP0U56dEhEL1wXQ">
                                        Chloe Ting
                                    </option>
                                    <option data-id="UCIJwWYOfsCfz6PjxbONYXSg">Blogilates</option>
                                    <option data-id="UCZqvK1ix-YFuCk7w8UEHRbQ">Kpop Fitness</option>
                                    <option data-id="UCBINFWq52ShSgUFEoynfSwg">POPSUGAR Fitness</option>
                                    <option data-id="UCiP6wD_tYlYLYh3agzbByWQ">FitnessBlender</option>
                                </select>
                            </div>

                            <button className="btn w-1/4 lg:w-1/5 btn-active relative left-3/4 bottom-2 mt-12">
                                OK
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
