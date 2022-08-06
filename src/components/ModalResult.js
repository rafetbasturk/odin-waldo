import { useRef, useState } from "react";
import { useGlobalContext } from "../context";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const ModalResult = () => {
  const modalRef = useRef(null)
  const [input, setInput] = useState("")
  const { duration: {ms, time}, dispatch } = useGlobalContext()
  const navigate = useNavigate()

  const handleChange = e => {
    setInput(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch({ type: "INITIAL_STATE" })
    addDoc(collection(db, "scores"), {
      name: input.trim(),
      ms,
      time,
      createdAt: serverTimestamp()
    }).then(() => {
      navigate("/scores", { replace: true })
    }).then(() => dispatch({type: "SHOW_LINK"}))
  }

  const handleClick = e => {
    e.preventDefault()
    dispatch({ type: "INITIAL_STATE" })
    navigate("/", { replace: true })
  }

  return (
    <div className="modal-container" ref={modalRef}>
      <div className="modal">
        <p className="result">You finished in <span>{time}</span>.</p>

        <form onSubmit={handleSubmit}>
          <input type="text" value={input} onChange={handleChange} required />
          <button type="submit">Submit</button>
        </form>

        <div className="btn-container">
          <button type="reset" onClick={handleClick}>Restart</button>
          <Link 
            to="/scores" 
            className="btn" 
            onClick={() => dispatch({type: "SHOW_LINK"})}
          >High Scores
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ModalResult;