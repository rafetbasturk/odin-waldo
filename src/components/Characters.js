import { useGlobalContext } from "../context";
import { useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import useFirestore from "../firebase/useFirestore";

const Characters = () => {
  const { dispatch, characters, isGameActive } = useGlobalContext()
  const { data } = useFirestore("characters")

  useEffect(() => {
    dispatch({ type: "LOAD_CHARACTERS", payload: data })
  }, [data, dispatch])

  useEffect(() => {
    characters.forEach(character => {
      const docRef = doc(db, "characters", character.id)
      updateDoc(docRef, {
        isFound: false
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameActive])

  const handleClick = e => {
    if (e.currentTarget.parentElement.classList.contains("select")) {
      dispatch({ type: "SET_NAME", payload: e.currentTarget.dataset.name });
      dispatch({ type: "SHOW_SELECT" });
    }
  }

  return (
    characters &&
    characters.map(character => (
      <div
        className={`item ${character.isFound ? "found" : ""}`}
        key={character.id}
        data-id={character.id}
        data-name={character.name}
        onClick={!character.isFound ? handleClick : null}
      >
        <img src={character.url} alt={character.name} width="100" height="100" />
        <span>{character.name}</span>
      </div>
    ))
  );
}

export default Characters;