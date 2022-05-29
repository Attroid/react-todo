const { TokenType } = require('constants/tokens');

const addRespondToResponse = (_req, res, next) => {
  res.respond = (data, statusCode = 200) => {
    res.status(statusCode).json(data);
  };

  next();
};

const addSetAuthCookieToResponse = (_req, res, next) => {
  res.setAuthCookie = (authToken) => {
    res.cookie(TokenType.AUTH_TOKEN, authToken, {
      secure: false,
      httpOnly: true,
      sameSite: 'Lax',
    });
  };

  next();
};

module.exports = {
  addRespondToResponse,
  addSetAuthCookieToResponse,
};
