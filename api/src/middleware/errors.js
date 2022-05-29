const {
  CustomError,
  InvalidCsrfTokenError,
  JsonSyntaxError,
  SequelizeValidationError,
} = require('errors');
const Sequelize = require('sequelize');

const handleError = (error, _req, res, _next) => {
  console.error(error);

  console.log('error.name', error.name);
  console.log('error.message', error.message);
  console.log('error.code', error.code);

  if (error.code === 'EBADCSRFTOKEN') {
    error = new InvalidCsrfTokenError();
  }

  if (error.name === 'SyntaxError') {
    error = new JsonSyntaxError(error.message);
  }

  if (error instanceof Sequelize.ValidationError) {
    error = new SequelizeValidationError(error.message, error.errors);
  }

  const isErrorSafeForClient = error instanceof CustomError;

  const clientError = isErrorSafeForClient
    ? (({ message, code, status, data }) => ({ message, code, status, data }))(
        error
      )
    : {
        message: 'Something went wrong, please contact our support.',
        code: 'INTERNAL_ERROR',
        status: 500,
        data: {},
      };

  res.status(clientError.status).send({ error: clientError });
};

module.exports = {
  handleError,
};
