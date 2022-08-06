import { useEffect, useRef } from "react";
import { useGlobalContext } from "../context";
import Cursor from "./Cursor";
import Select from "./Select";

const Image = () => {
  const { dispatch } = useGlobalContext()
  const imageRef = useRef(null)
  const cursorRef = useRef(Cursor)
  const selectRef = useRef(Select)

  const setPointer = e => {
    const { clientX, clientY } = e
    const x = clientX - cursorRef.current.clientWidth / 2
    const y = clientY - cursorRef.current.clientHeight / 2
    cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }

  useEffect(() => {
    imageRef.current.addEventListener("mouseenter", e => {
      cursorRef.current.style.display = "block"
      setPointer(e)
    })
    imageRef.current.addEventListener("mousemove", setPointer)
    imageRef.current.addEventListener("mouseleave", () => {
      cursorRef.current.style.display = "none"
    })
  })

  useEffect(() => {
    const rect = selectRef.current.getBoundingClientRect()

    if (rect.left + rect.width > window.innerWidth) {
      selectRef.current.style.left = `${rect.left - rect.width}px`
    }
    if (rect.top + rect.height > window.innerHeight) {
      selectRef.current.style.top = `${rect.top - rect.height}px`
    }
  })

  const handleClick = e => {
    const imageRect = imageRef.current.getBoundingClientRect()
    const cursorRect = cursorRef.current.getBoundingClientRect()

    const xPer = Math.round((cursorRect.x + ((cursorRect.width - 10) / 2) - imageRect.x) / imageRect.width * 100)
    const yPer = Math.round((cursorRect.y + ((cursorRect.height - 10) / 2) - imageRect.y) / imageRect.height * 100)

    selectRef.current.style.top = `${cursorRect.top + cursorRect.height}px`
    selectRef.current.style.left = `${cursorRect.left + cursorRect.width}px`

    dispatch({ type: "SHOW_SELECT" })
    dispatch({ type: "SET_COORDS", payload: { x: xPer, y: yPer } });
  }

  return (
    <main>
      <Cursor ref={cursorRef} />
      <Select
        ref={selectRef}
      />
      <img
        src="https://firebasestorage.googleapis.com/v0/b/wally-rb.appspot.com/o/levels%2Fwaldo_space.jpg?alt=media&token=1cac9196-5f43-45d4-8175-e7ebca843e4d"
        alt="waldo space"
        width="2560"
        height="1600"
        ref={imageRef}
        onClick={handleClick}
      />
    </main>
  );
}

export default Image;