const generateUniqueClassName = require('./index.js');
const shuffleArray = require('./helpers/shuffle.js');

module.exports = (options = {}) => {
  const separator = options.separator || '_';
  const shuffleCharsacters = options.shuffleCharsacters !== false;
  let characters =
    options.characters ||
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  characters = characters.filter((x, i, a) => Boolean(a) && a.indexOf(x) === i);
  if (shuffleCharsacters) {
    characters = shuffleArray(characters);
  }

  return (context, _, localName) => {
    const key = context.resourcePath + localName;

    return generateUniqueClassName(key, characters, separator);
  };
};
