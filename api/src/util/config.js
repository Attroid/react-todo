require('dotenv').config();

module.exports = {
  // Client
  clientUrl: process.env.CLIENT_URL,
  clientPasswordResetUrl: process.env.CLIENT_PASSWORD_RESET_URL,
  clientUserDeleteUrl: process.env.CLIENT_USER_DELETE_URL,

  // Database
  databaseUrl: process.env.DATABASE_URL,
  databaseName: process.env.DATABASE_NAME,
  connectionString: `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`,

  // Server
  port: process.env.PORT || 3001,
  secret: process.env.SECRET,

  // Email
  nodemailerTransporterSettings: JSON.parse(
    process.env.NODEMAILER_TRANSPORTER_SETTINGS.split('\n').join('')
  ),
};
