import Settings from "./Settings";

const Navbar = ({ clockTimer, setClockTimer, exerciseTimer, setExerciseTimer }) => {
    return (
        <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-2xl">PomoTimer</a>
  </div>
  <div className="flex-none">
    <Settings clockTimer={clockTimer} setClockTimer={setClockTimer} exerciseTimer={exerciseTimer} setExerciseTimer={setExerciseTimer} />
  </div>
</div>
    );
}
 
export default Navbar;