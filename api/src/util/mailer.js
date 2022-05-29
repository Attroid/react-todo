const nodemailer = require('nodemailer');
const config = require('./config');

const transporter = nodemailer.createTransport(
  config.nodemailerTransporterSettings
);

const sendUserDeleteRequestMail = async (email, userDeleteToken) => {
  const mailOptions = {
    to: 'attroid.dev@gmail.com',
    subject: `Delete your React Todo account`,
    html: `
      (${email}) You can delete your account via this link 
      ${config.clientUserDeleteUrl}?userDeleteToken=${userDeleteToken}
    `,
  };

  return transporter.sendMail(mailOptions);
};

const sendResetPasswordRequestMail = async (email, passwordResetToken) => {
  const mailOptions = {
    to: 'attroid.dev@gmail.com',
    subject: `Reset your React Todo password`,
    html: `
      (${email}) You can reset your password via this link 
      ${config.clientPasswordResetUrl}?passwordResetToken=${passwordResetToken}
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendUserDeleteRequestMail,
  sendResetPasswordRequestMail,
};
