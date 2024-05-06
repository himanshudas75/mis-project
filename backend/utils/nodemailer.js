const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

transporter
    .verify()
    .then(console.log('Connected to SMTP!'))
    .catch(console.error);

const registerBody = `
<div class="container">
    <b>Dear Candidate <br>
    Thank you for registration in IIT (ISM) MBA Admission Portal 2023-24 <br>
    Your Registration Number: REGNO_PLACEHOLDER <br>
    Your Password: PASS_PLACEHOLDER <br></b>
    <br><br>
    Please <a href="VERIFY_URL_PLACEHOLDER">Click Here</a> to verify your registered email <br>
    Until you verify the registered email address, you will not be able to login to the MBA Admission Portal <br>
    <br>
    Thanks <br>
    Admission Committee <br>
    IIT (ISM) Dhanbad
</div>`;

module.exports = { transporter, registerBody };
