
export const escapeSpecialCharsForFirebase = (str) => {
  const keyMap = {
    ".": "·",
    "$": "﹩",
  }

  Object.keys(keyMap).map(key => {
    str = str.replace(key, keyMap[key]);
  })
  return str;
}
