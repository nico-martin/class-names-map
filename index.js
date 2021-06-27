const cache = {};

module.exports = (key = null, characters, separator) => {
  if (key !== null && key in cache) {
    return cache[key];
  }

  const cacheValues = Object.values(cache);
  const lastUniqueClassNameElements = (
    cacheValues[cacheValues.length - 1] || ''
  )
    .split(separator)
    .reverse();

  const nextUniqueClassNameElements = [...lastUniqueClassNameElements];

  let uniqueClassNameFound = false;
  let indexToUpdate = 0;

  while (!uniqueClassNameFound) {
    if (typeof nextUniqueClassNameElements[indexToUpdate] === 'undefined') {
      // if the indexToUpdate does not yet exist, we will just set it and we're good
      nextUniqueClassNameElements[indexToUpdate] = characters[0];
      uniqueClassNameFound = true;
    } else if (
      // if the lastUniqueClassNameElements if already the last character we set it back to th first and update the indexToUpdate
      lastUniqueClassNameElements[indexToUpdate] ===
      characters[characters.length - 1]
    ) {
      nextUniqueClassNameElements[indexToUpdate] = characters[0];
      indexToUpdate = indexToUpdate + 1;
    } else {
      // else, just update the indexToUpdate by one position and we're good
      nextUniqueClassNameElements[indexToUpdate] =
        characters[
          characters.indexOf(lastUniqueClassNameElements[indexToUpdate]) + 1
        ];
      uniqueClassNameFound = true;
    }
  }

  cache[key] = nextUniqueClassNameElements.join(separator);
  return cache[key];
};
