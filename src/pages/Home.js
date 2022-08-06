import { Link } from "react-router-dom";
import Characters from "../components/Characters"
import { useGlobalContext } from "../context";

function Home() {
  const { dispatch } = useGlobalContext()

  return (
    <main className="home">

      <div className="card">
        <div className="characters">
          <Characters />
        </div>
        <p>Find the characters in the picture!</p>
        <Link to="game" className="link" onClick={() => dispatch({ type: "SHOW_LINK" })}>Go to Game</Link>
      </div>
      <Link to="scores" className="link" onClick={() => dispatch({ type: "SHOW_LINK" })}>View Score Board</Link>
    </main>
  );
}

export default Home;