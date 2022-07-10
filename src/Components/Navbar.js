import Settings from "./Settings";

const Navbar = ({
  clockTimer,
  setClockTimer,
  exerciseTimer,
  setExerciseTimer,
}) => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-2xl">PomoTimer</a>
      </div>
      <button
        className="btn btn-ghost btn-square"
        onClick={() =>
          setClockTimer({
            ...clockTimer,
            sound: !clockTimer.sound,
          })
        }
      >
        {clockTimer.sound && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width="24"
            height="24"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 16 16"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M1.75 5.75v4.5h2.5l4 3V2.75l-4 3zm9 .5s1 .5 1 1.75s-1 1.75-1 1.75m1-6.5c2 1 3 2.5 3 4.75s-1 3.75-3 4.75"
            />
          </svg>
        )}

        {!clockTimer.sound && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width="24"
            height="24"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 16 16"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M1.75 5.75v4.5h2.5l4 3V2.75l-4 3zm12.5 0l-3.5 4.5m0-4.5l3.5 4.5"
            />
          </svg>
        )}
      </button>

      <div className="flex-none">
        <Settings
          clockTimer={clockTimer}
          setClockTimer={setClockTimer}
          exerciseTimer={exerciseTimer}
          setExerciseTimer={setExerciseTimer}
        />
      </div>
    </div>
  );
};

export default Navbar;
