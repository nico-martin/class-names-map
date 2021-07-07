const generateUniqueClassName = require('./index.js');

module.exports = (options = {}) => {
  const separator =
    typeof options.separator === 'undefined' ? '_' : options.separator;
  let characters =
    options.characters ||
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  characters = characters.filter((x, i, a) => Boolean(a) && a.indexOf(x) === i);

  return (context, _, localName) => {
    const key = context.resourcePath + localName;

    return generateUniqueClassName(key, characters, separator);
  };
};
