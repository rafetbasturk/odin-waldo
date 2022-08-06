import { useEffect } from "react";
import { useGlobalContext } from "../context";

const Popup = () => {
  const { popup, dispatch } = useGlobalContext()
  const { isOpen, message } = popup

  useEffect(() => {
    const popupTimer = () => setTimeout(() => {
      dispatch({
        type: "POPUP",
        payload: { isOpen: false }
      })
    }, 1500);
    isOpen && popupTimer()
    return () => clearTimeout(popupTimer)
  }, [isOpen, dispatch])

  return (
    isOpen &&
    <div className="popup">
      <p className="description">{message}</p>
    </div>
  );

}

export default Popup;