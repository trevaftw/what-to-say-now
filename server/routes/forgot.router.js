const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const encryptLib = require("../modules/encryption");
const { rejectUnauthenticated } = require("../modules/authentication-middleware");
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

const moment = require('moment');
const crypto = require('crypto')

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

require('dotenv').config();

router.get('/username/:email', (req, res) => {
    // console.log('forgot username router hit, payload:', req.params.email)
    pool.query(
        `SELECT * FROM "user" WHERE "email" ILIKE $1;
        `, [req.params.email]
    ).then(res => {
        // console.log('pool query response:', res.rows)
        res.rows.forEach(user => {
            forgotUsername(user);
        })
    }).catch(error => {
        console.log('error with forgot username pool query:', error)
    })
});

function forgotUsername(user) {
    // console.log('user:', user)
    // let transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: process.env.EMAIL,
    //         pass: process.env.PASSWORD
    //     }
    // });
    // let mailOptions = {
    //     from: "WhatToSayNowChallenge@gmail.com ",
    //     to: user.email,
    //     subject: "Forgot Username Request",
    //     text: `Hi ${user.first_name}! 
    //         Your username to login with is: ${user.username}
    //         To login, visit:  ${process.env.API_URL}
    //         `
    // };
    // transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //     }
    // })

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: user.email,
        from: 'WhatToSayNowChallenge@gmail.com',
        subject: 'Forgot Username Request',
        text: `Hi ${user.first_name}! 
        Your username to login with is: ${user.username}
        To login, visit:  ${process.env.API_URL}
        `
    };
    sgMail.send(msg);
};

router.put('/password/:email', (req, res) => {
    let resetToken = crypto.randomBytes(20).toString('hex');
    let resetTime = moment().format();
    // console.log('password router hit, email:', req.params.email, resetToken, resetTime);
    let query = `UPDATE "user" SET "reset_token_code"=$1, "reset_token_time"=$2 WHERE "email" ILIKE $3 RETURNING *;`;
    pool.query(query, [resetToken, resetTime, req.params.email]
    ).then(response => {
        // console.log('reset password pool query response:', response.rows[0])
        forgotPassword(response.rows[0])
    }).catch(error => {
        console.log('error with forgot password pool query:', error)
    })
});

function forgotPassword(user) {
    // console.log('forgot password router function; user:', user)
    // let transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: process.env.EMAIL,
    //         pass: process.env.PASSWORD
    //     }
    // });
    // let mailOptions = {
    //     from: "WhatToSayNowChallenge@gmail.com ",
    //     to: user.email,
    //     subject: "Forgot Password Request",
    //     text: `Hi ${user.first_name}! 
    //         You are receiving this email because you requested it via the forgot email form.
    //         Your username is ${user.username}
    //         To login, visit:  ${process.env.API_URL}reset/${user.reset_token_code}
    //         `
    // };
    // transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //     }
    // })

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: user.email,
        from: 'WhatToSayNowChallenge@gmail.com',
        subject: 'Forgot Password Request',
        text: `Hi ${user.first_name}! 
        You are receiving this email because you requested it via the forgot email form.
        Your username is ${user.username}
        To login, visit:  ${process.env.API_URL}reset/${user.reset_token_code}
        `
    };
    sgMail.send(msg);
};


router.get('/email/:username', (req, res) => {
    // console.log('forgot username router hit, payload:', req.params.username);
    pool.query(
        `SELECT * FROM "user" WHERE "username" ILIKE $1;
        `, [req.params.username]
    ).then(res => {
        // console.log('pool query response:', res.rows)
        res.rows.forEach(user => {
            forgotEmail(user);
        })
    }).catch(error => {
        console.log('error with forgot username pool query:', error)
    })
});

function forgotEmail(user) {
    // console.log('user:', user)
    // let transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: process.env.EMAIL,
    //         pass: process.env.PASSWORD
    //     }
    // });
    // let mailOptions = {
    //     from: "WhatToSayNowChallenge@gmail.com ",
    //     to: user.email,
    //     subject: "Forgot Email Request",
    //     text: `Hi ${user.first_name}! 
    //         You are receiving this email because you requested it via the forgot email form.
    //         Your username is ${user.username}
    //         To login, visit:  ${process.env.API_URL}
    //         `
    // };
    // transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //     }
    // })

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: user.email,
        from: 'WhatToSayNowChallenge@gmail.com',
        subject: 'Forgot Email Request',
        text: `Hi ${user.first_name}! 
      You are receiving this email because you requested it via the forgot email form.
      Your username is ${user.username}
      To login, visit:  ${process.env.API_URL}
      `
    };
    sgMail.send(msg);

};



router.get('/reset/:token', (req, res) => {
    // console.log('password reset token router hit:', req.params.token)
    pool.query(`
    SELECT * FROM "user" WHERE "reset_token_code"=$1;`, [req.params.token]
    ).then(response => {
        // console.log('response from password token reset db query', response)
        if (response.rowCount === 0) {
            res.send('ERROR - Token does not exist')
        } else {
            let currentDate = moment();
            let tokenDate = response.rows[0].reset_token_time
            let answer = moment(currentDate).diff(tokenDate, 'minutes')
            // console.log('answer:', answer)
            if (answer <= 15) {
                res.send(response.rows[0])
            } else {
                res.send('Token Expired')
            }
        }
    }).catch(error => {
        console.log('error with reset token pool query:', error)
    })
});

router.put('/update/', (req, res) => {
    // console.log('update pw router hit,:', req.body)
    const password = encryptLib.encryptPassword(req.body.password);
    pool.query(`
    UPDATE "user" SET "password"=$1 WHERE "reset_token_code"=$2;`, [password, req.body.resetToken]
    ).then(response => {
        res.sendStatus(200)
    }).catch(error => {
        console.log('error with updating password:', error)
    })
});

module.exports = router;