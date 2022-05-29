class CustomError extends Error {
  constructor(message, code = 'INTERNAL_ERROR', status = 500, data = {}) {
    super();
    this.message = message;
    this.code = code;
    this.status = status;
    this.data = data;
  }
}

class RouteNotFoundError extends CustomError {
  constructor(originalUrl) {
    super(`Route '${originalUrl}' does not exist.`, 'ROUTE_NOT_FOUND', 404);
  }
}

class EntityNotFoundError extends CustomError {
  constructor(entityName) {
    super(`${entityName} not found.`, 'ENTITY_NOT_FOUND', 404);
  }
}

class BadUserInputError extends CustomError {
  constructor(errorData) {
    super('There were validation errors.', 'BAD_USER_INPUT', 400, errorData);
  }
}

class InvalidTokenError extends CustomError {
  constructor(message = 'Jsonwebtoken is invalid.') {
    super(message, 'INVALID_TOKEN', 401);
  }
}

class InvalidCredentialsError extends CustomError {
  constructor(message = 'Credentials were invalid.') {
    super(message, 'INVALID_CREDENTIALS', 401);
  }
}

class InvalidCsrfTokenError extends CustomError {
  constructor(message = 'Csrf token was invalid.') {
    super(message, 'EBADCSRFTOKEN', 401);
  }
}

class EmailAlreadyExistsError extends CustomError {
  constructor(message = 'Email address is already in use.') {
    super(message, 'EMAIL_ALREADY_EXISTS', 400);
  }
}

class JsonSyntaxError extends CustomError {
  constructor(message = 'There was json syntax error in request body') {
    super(message, 'JSON_SYNTAX_ERROR', 400);
  }
}

class InsufficientPermissionsError extends CustomError {
  constructor(message = 'Insufficient permissions.') {
    super(message, 'INSUFFICIENT_PERMISSIONS', 401);
  }
}

class SequelizeValidationError extends CustomError {
  constructor(message = 'Sequelize balidation error.', errors = []) {
    super(message, 'SEQUELIZE_VALIDATION_ERROR', 400, { errors });
  }
}

module.exports = {
  CustomError,
  RouteNotFoundError,
  EntityNotFoundError,
  BadUserInputError,
  InvalidTokenError,
  InvalidCredentialsError,
  InvalidCsrfTokenError,
  EmailAlreadyExistsError,
  JsonSyntaxError,
  InsufficientPermissionsError,
  SequelizeValidationError,
};
