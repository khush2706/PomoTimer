import Settings from "./Settings";

const Navbar = ({ clockTimer, setClockTimer }) => {
    return (
        <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-2xl">PomoTimer</a>
  </div>
  <div className="flex-none">
    <Settings clockTimer={clockTimer} setClockTimer={setClockTimer} />
  </div>
</div>
    );
}
 
export default Navbar;