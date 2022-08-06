export const checkCoordinates = (el1, el2) => {
  for (let ix = -2; ix < 3; ix++) {
    for (let iy = -2; iy < 3; iy++) {
      if (el1.x === el2.x + ix && el1.y === el2.y + iy) {
        return true
      }
    }
  }
  return false
}