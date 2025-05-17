const nodemailer = require('nodemailer');

const x = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'sameer.softsuave@gmail.com',
        pass: 'softsuave@123'
    }
});

const y = {
    from: 'sameer.softsuave@gmail.com',
    to: 'sameersameeha48@gmail.com',
    subject: 'Testing',
    text: 'Hello, Please provide the feedback.!'
};

x.sendMail(y, (error, info) => {
    if (error) {
        console.log('Error:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});