import { useEffect } from "react";
import { db } from "../firebase";
import { collection, getDoc, onSnapshot, query, where, doc, updateDoc, getDocs } from "firebase/firestore";
import { checkCoordinates } from "../utils";
import { useGlobalContext } from "../context";
import Image from "../components/Image";
import Popup from "../components/Popup";
import ModalStart from "../components/ModalStart";
import ModalResult from "../components/ModalResult";

const Game = () => {
  const { name, coords, duration, dispatch } = useGlobalContext()

  const isGameCompleted = async () => {
    const data = await getDocs(collection(db, "characters"))
    return data.docs.every(el => el.data().isFound)
  }

  useEffect(() => {
    if (name) {
      getDocs(collection(db, "characters"))
        .then(snap => {
          return snap.docs.filter(doc => doc.data().name === name)[0]
        })
        .then(char => ({ ...char.data(), id: char.id }))
        .then(char => {
          const { id, x, y } = char
          if (checkCoordinates(coords, { x, y })) {
            const selectedDocRef = doc(db, "characters", id)
            getDoc(selectedDocRef).then(char => {
              updateDoc(selectedDocRef, {
                isFound: true
              })
            })
            dispatch({
              type: "POPUP",
              payload: {
                isOpen: true,
                message: `You found ${name.toUpperCase()}`,
              }
            })
            return true
          }
          else {
            dispatch({
              type: "POPUP",
              payload: {
                isOpen: true,
                message: `Try again. It is not ${name.toUpperCase()}!`,
              }
            })
            return false
          }
        })
        .then(res => {
          if (res) {
            const q = query(collection(db, "characters"), where("name", "==", name))
            onSnapshot(q, () => {
              isGameCompleted()
                .then(res => {
                  if (res) {
                    dispatch({ type: "GAME_OVER" })
                    dispatch({ type: "CALCULATE_DURATION" })
                  }
                })
            })
          }
        })
      dispatch({ type: "SET_NAME", payload: "" })
    }
  }, [coords, name, dispatch])

  return (
    <>
      <Image />
      <Popup />
      <ModalStart />
      {duration && <ModalResult />}
    </>
  );
}

export default Game;