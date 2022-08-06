import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
import "../styles/styles.css"
import Characters from "./Characters";

function Header() {
  const { isGameActive, scoresLink, dispatch } = useGlobalContext()
  

  return (
    <header>
      <div className="logo">
        Where's Waldo?
      </div>

      {
        scoresLink &&
        <Link to="/" className="link" onClick={() => dispatch({ type: "HIDE_LINK" })}>Back to Home</Link>
      }

      {
        isGameActive &&
        <div className="characters">
          <Characters />
        </div>
      }
    </header>
  );
}

export default Header;