const keyMap = {
  ".": "·",
  "$": "﹩",
}

export const normalizeName = (str) => {
  Object.keys(keyMap).map(key => {
    str = str.replace(key, keyMap[key]);
  })
  return str;
}

export const denormalizeName = (str) => {
  Object.keys(keyMap).map(key => {
    str = str.replace(keyMap[key], key);
  });
  return str;
}
