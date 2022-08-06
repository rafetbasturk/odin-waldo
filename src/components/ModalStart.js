import { useRef } from "react";
import { useGlobalContext } from "../context";

const ModalStart = () => {
  const modalRef = useRef(null)
  const { dispatch } = useGlobalContext()

  const handleClick = e => {
    e.preventDefault()
    modalRef.current.style.display = "none"
    dispatch({ type: "GAME_START" })
  }

  return (
    <div className="modal-container" ref={modalRef}>
      <div className="modal">
        <button onClick={handleClick} >Start Game</button>
      </div>
    </div>
  );
}

export default ModalStart;