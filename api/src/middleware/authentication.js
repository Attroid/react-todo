const { verifyToken } = require('util/token');
const { catchErrors, InvalidTokenError } = require('errors');
const { User, Customization } = require('models');
const { TokenType } = require('constants/tokens');

const authenticateUser = catchErrors(async (req, _res, next) => {
  const token = req.cookies?.authToken;
  if (!token) {
    throw new InvalidTokenError('Authentication token not found.');
  }

  const { type, userId } = verifyToken(token);
  if (type !== TokenType.AUTH_TOKEN || !userId) {
    throw new InvalidTokenError('Authentication token is invalid.');
  }

  const user = await User.findByPk(userId, { include: Customization });
  if (!user) {
    throw new InvalidTokenError(
      'Authentication token is invalid: User not found.'
    );
  }

  req.currentUser = user;
  next();
});

module.exports = {
  authenticateUser,
};
