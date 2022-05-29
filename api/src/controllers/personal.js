const { catchErrors } = require('errors');

const updateData = catchErrors(async (req, res) => {
  const { username, customization } = req.body;
  const user = req.currentUser;

  if (username) {
    user.username = username;
  }

  if (customization && customization.theme) {
    user.customization.theme = customization.theme;
  }

  await user.save();
  await user.customization.save();

  res.respond(user);
});

module.exports = {
  updateData,
};
