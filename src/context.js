import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";

const AppContext = createContext()

const initialState = {
  coords: {},
  name: "",
  scoresLink: false,
  characters: [],
  showSelect: false,
  popup: {
    isOpen: false
  },
  isGameActive: false,
  startTime: null,
  finishTime: null,
  duration: ""
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }