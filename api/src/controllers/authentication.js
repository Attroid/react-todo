const { User, Customization } = require('models');
const { catchErrors } = require('errors');
const { TokenType } = require('constants/tokens');
const {
  InvalidCredentialsError,
  EmailAlreadyExistsError,
  EntityNotFoundError,
  InvalidTokenError,
} = require('errors');
const {
  signAuthToken,
  signPasswordResetToken,
  signUserDeleteToken,
  verifyToken,
} = require('util/token');
const {
  sendResetPasswordRequestMail,
  sendUserDeleteRequestMail,
} = require('util/mailer');

const getCsrfToken = catchErrors(async (req, res) => {
  res.respond({ csrfToken: req.csrfToken() });
});

const login = catchErrors(async (req, res) => {
  const { email = '', password = '' } = req.body;

  const user = await User.findOne({
    where: { email },
    include: {
      model: Customization,
    },
  });

  const isPasswordCorrect =
    user === null ? false : await user.checkPassword(password);

  if (isPasswordCorrect === false) {
    throw new InvalidCredentialsError();
  }

  const authToken = signAuthToken(user.id);
  res.setAuthCookie(authToken);
  res.respond(user);
});

const signup = catchErrors(async (req, res) => {
  const { email = '' } = req.body;
  const emailExists = (await User.findOne({ where: { email } })) !== null;

  if (emailExists) {
    throw new EmailAlreadyExistsError();
  }

  const user = await User.create(
    {
      ...req.body,
      customization: {
        theme: '',
      },
    },
    {
      fields: ['username', 'email', 'password', 'passwordHash'],
      include: Customization,
    }
  );

  const authToken = signAuthToken(user.id);
  res.setAuthCookie(authToken);
  res.respond(user);
});

const refresh = catchErrors(async (req, res) => {
  const authToken = signAuthToken(req.currentUser.id);
  res.setAuthCookie(authToken);
  res.respond(req.currentUser);
});

const requestPasswordReset = catchErrors(async (req, res) => {
  const { email = '' } = req.body;
  const user = await User.findOne({ where: { email } });

  if (user === null) {
    throw new EntityNotFoundError('User');
  }

  const passwordResetToken = signPasswordResetToken(user.id);
  await sendResetPasswordRequestMail(user.email, passwordResetToken);

  res.respond({
    message: 'Sent password reset email.',
    code: 'Ok',
    status: 200,
    data: {},
  });
});

const passwordReset = catchErrors(async (req, res) => {
  const { passwordResetToken = '', password = '' } = req.body;

  if (!passwordResetToken) {
    throw new InvalidTokenError('Password reset token not found.');
  }

  const { type, userId } = verifyToken(passwordResetToken);
  if (type !== TokenType.PASSWORD_RESET_TOKEN || !userId) {
    throw new InvalidTokenError('Password reset token is invalid.');
  }

  const user = await User.findByPk(userId);
  if (user === null) {
    throw new InvalidTokenError(
      'Password reset token is invalid: User not found.'
    );
  }

  user.password = password;
  await user.save();

  res.respond({
    message: 'Password reset successful.',
    code: 'Ok',
    status: 200,
    data: {},
  });
});

const requestUserDelete = catchErrors(async (req, res) => {
  const userDeleteToken = signUserDeleteToken(req.currentUser.id);
  await sendUserDeleteRequestMail(req.currentUser.email, userDeleteToken);

  res.respond({
    message: 'Sent user delete email.',
    code: 'Ok',
    status: 200,
    data: {},
  });
});

const userDelete = catchErrors(async (req, res) => {
  const { userDeleteToken = null, password = '' } = req.body;

  if (userDeleteToken === null) {
    throw new InvalidTokenError('User delete token not found.');
  }

  const { type, userId } = verifyToken(userDeleteToken);
  if (type !== TokenType.USER_DELETE_TOKEN || !userId) {
    throw new InvalidTokenError('User delete token is invalid.');
  }

  const user = await User.findByPk(userId);
  if (user === null) {
    throw new InvalidTokenError(
      'User delete token is invalid: User not found.'
    );
  }

  const isPasswordCorrect = await user.checkPassword(password);
  if (isPasswordCorrect === false) {
    throw new InvalidCredentialsError();
  }

  await User.destroy({ where: { id: user.id } });

  res.respond({
    message: 'User delete successful.',
    code: 'No Content',
    status: 204,
    data: {},
  });
});

const logout = catchErrors(async (_req, res) => {
  res.clearCookie(TokenType.AUTH_TOKEN);
  res.respond({
    message: 'Logged out.',
    code: 'Ok',
    status: 200,
    data: {},
  });
});

module.exports = {
  getCsrfToken,
  login,
  signup,
  refresh,
  requestPasswordReset,
  passwordReset,
  requestUserDelete,
  userDelete,
  logout,
};
