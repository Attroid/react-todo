const jwt = require('jsonwebtoken');
const { isObject } = require('util/javascript');
const { InvalidTokenError } = require('errors');
const { secret } = require('util/config');
const { TokenType } = require('constants/tokens');

const signToken = (payload, options) => {
  return jwt.sign(payload, secret, {
    expiresIn: '180 days',
    ...options,
  });
};

const signAuthToken = (userId) => {
  return signToken({
    type: TokenType.AUTH_TOKEN,
    userId,
  });
};

const signPasswordResetToken = (userId) => {
  return signToken({
    type: TokenType.PASSWORD_RESET_TOKEN,
    userId,
  });
};

const signUserDeleteToken = (userId) => {
  return signToken({
    type: TokenType.USER_DELETE_TOKEN,
    userId,
  });
};

const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, secret);

    if (isObject(payload)) {
      return payload;
    }
    throw new Error();
  } catch (error) {
    throw new InvalidTokenError();
  }
};

module.exports = {
  signToken,
  signAuthToken,
  signPasswordResetToken,
  signUserDeleteToken,
  verifyToken,
};
