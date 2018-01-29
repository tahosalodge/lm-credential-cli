require('dotenv').config({ path: '.env' });
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

const {
  MAILGUN_KEY, MAILGUN_DOMAIN, FROM_EMAIL, ADMIN_EMAIL, ADMIN_NAME,
} = process.env;
const mgAuth = {
  auth: {
    api_key: MAILGUN_KEY,
    domain: MAILGUN_DOMAIN,
  },
};
const mailer = nodemailer.createTransport(mg(mgAuth));

function sendEmail(email, data) {
  try {
    const { username, password, name } = data;
    const message = `
      Hello ${name},<br />
      Here are your Lodgemaster credentials:<br /><br />
      Council: 61 - Denver Area<br />
      Username: ${username}<br />
      Password: ${password}<br />
      <br />

      Please note that you will need to access LM in either IE11, Safari or Firefox ESR (available here, not the same as regular Firefox: https://www.mozilla.org/en-US/firefox/organizations/). This is a technical limitation due to how Lodgemaster is built.<br /><br />

      <a href="https://lodgemaster.oa-bsa.org/lodge/client">Click here to log in.</a><br /><br />

      If you have any questions, please contact <a href="mailto:${ADMIN_EMAIL}">${ADMIN_NAME}</a>

    `;
    const options = {
      from: FROM_EMAIL,
      to: email,
      subject: 'Lodgemaster Access Instructions',
      html: message,
    };
    console.log(options);
    mailer
      .sendMail(options)
      .then(info => console.log(info))
      .catch(error => console.log(error));
  } catch (error) {
    console.log(error);
  }
}

module.exports = sendEmail;
