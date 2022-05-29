export const toCamelCase = (str) => {
  if (typeof str !== 'string') {
    return undefined;
  }

  return str.substring(0, 1).toUpperCase() + str.substring(1);
};

export const refreshPage = () => (window ? window.location.reload() : null);

const js = {
  toCamelCase,
  refreshPage,
};

export default js;
