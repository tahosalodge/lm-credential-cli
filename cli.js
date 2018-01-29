const meow = require('meow');
const sendEmail = require('./index');

const cli = meow();
const email = cli.input[0];

sendEmail(email, cli.flags);
