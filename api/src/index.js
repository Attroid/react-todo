require('module-alias/register');

const express = require('express');

const { connectToDatabase } = require('database');
const {
  addRespondToResponse,
  addSetAuthCookieToResponse,
} = require('middleware/response');
const { attachPublicRoutes, attachPrivateRoutes } = require('routes');
const { RouteNotFoundError } = require('errors');
const { handleError } = require('middleware/errors');
const { authenticateUser } = require('middleware/authentication');

const config = require('util/config');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const csrf = require('csurf');

const initializeExpress = () => {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: config.clientUrl,
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(cookieParser());
  app.use(csrf({ cookie: { httpOnly: true, sameSite: 'lax' } }));

  app.use(addRespondToResponse);
  app.use(addSetAuthCookieToResponse);

  attachPublicRoutes(app);

  app.use(authenticateUser);

  attachPrivateRoutes(app);

  app.use((req, _res, next) => next(new RouteNotFoundError(req.originalUrl)));
  app.use(handleError);

  app.listen(3001);
};

const initializeApp = async () => {
  await connectToDatabase();
  initializeExpress();
};

initializeApp();
