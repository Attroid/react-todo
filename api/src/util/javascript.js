const isObject = (variable) =>
  typeof variable === 'object' && !Array.isArray(variable) && variable !== null;

module.exports = {
  isObject,
};
