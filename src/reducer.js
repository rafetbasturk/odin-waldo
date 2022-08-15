const reducer = (state, action) => {
  switch (action.type) {
    case ("LOAD_CHARACTERS"):
      return { ...state, characters: action.payload }
    case ("SET_NAME"):
      return { ...state, name: action.payload }
    case ("SHOW_LINK"):
      return { ...state, scoresLink: true}
    case ("HIDE_LINK"):
      return { ...state, scoresLink: false}
    case ("SHOW_SELECT"):
      return { ...state, showSelect: !state.showSelect }
    case ("SET_COORDS"):
      return { ...state, coords: action.payload }
    case ("POPUP"):
      return { ...state, popup: action.payload }
    case ("GAME_START"):
      return {
        ...state,
        scoresLink: false,
        isGameActive: true,
        startTime: new Date()
      }
    case ("GAME_OVER"):
      return {
        ...state,
        isGameActive: false,
        finishTime: new Date(),
      }
    case ("CALCULATE_DURATION"):
      const start = state.startTime.getTime()
      const finish = state.finishTime.getTime()
      let minutes = Math.floor((finish - start) / 60000);
      let seconds = (((finish - start) % 60000) / 1000).toFixed(0);
      let ms = (finish - start) % 1000
      minutes = minutes < 10 ? `0${minutes}` : minutes
      seconds = seconds < 10 ? `0${seconds}` : seconds
      ms = ms < 100 ? `0${ms}` : ms < 10 ? `00${ms}` : ms
      const time = `${minutes} : ${seconds} : ${ms}`

      return {
        ...state,
        duration: { time, ms: finish - start }
      }
    case ("INITIAL_STATE"):
      return {
        ...state,
        coords: {},
        name: "",
        showSelect: false,
        popup: {
          isOpen: false
        },
        isGameActive: false,
        startTime: null,
        finishTime: null,
        duration: ""
      }
    default:
      throw new Error(`no matching action type "${action.type}"`)
  }
}

export default reducer