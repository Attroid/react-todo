const { catchErrors } = require('./asyncCatch');
const customErrors = require('./customErrors');

module.exports = {
  ...customErrors,
  catchErrors,
};
