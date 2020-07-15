const nodemailer = require('nodemailer');
const e = require('express');

let transporter = nodemailer.createTransport({
    service: 'qq',
    port: 465,
    auth: {
        user: '418761605@qq.com',
        pass: 'qskowfuikluybhdi'
    }
});

let mailOptions = {
    from: '"littleheap" <418761605@qq.com>',
    to: '15211136990@163.com',
    subject: 'test',
    html: 'email content'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log('send successfully')
    }
});