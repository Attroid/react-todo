# Project structure 🏗

The API codebase is fairly simple and should be easy enough to understand.

<br>

| File or folder    | Description                                                                                                                                                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/index.js`    | The entry file. This is where we setup middleware, attach routes, initialize database and express.                                                                                                                          |
| `src/routes.js`   | This is where we define all routes, both public and private.                                                                                                                                                                |
| `src/constants`   | Constants are values that never change and are used in multiple places across the codebase.                                                                                                                                 |
| `src/controllers` | Controllers listen to client's requests and work with models and the database to fetch, add, update, or delete data.                                                                                                        |
| `src/database`    | Database related code and seeds go here.                                                                                                                                                                                    |
| `src/models`      | This is where we put Sequelize models. We define columns, relations, validations for each database entity.                                                                                                                  |
| `src/errors`      | This is where we define custom errors. The `catchErrors` function helps us avoid repetitive `try/catch` blocks within controllers.                                                                                          |
| `src/middleware`  | Middleware functions can modify request and response objects, end the request-response cycle, etc. For example `authenticateUser` method verifies the authorization token and attaches `currentUser` to the request object. |
| `src/util`        | Utility(helper) functions that are used in multiple places across the codebase. For example `util/javascript.js` functions help us to avoid writing repetitive code.                                                        |
| `requests/`       | VS code rest client requests to help testing of endpoints.                                                                                                                                                                  |