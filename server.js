require('dotenv').config();
const express = require('express');
const twilio = require('twilio');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: 'https://hack-her-heart-backend.vercel.app/' // Your exact Vercel URL
  }));
app.use(express.json());

// Twilio SMS Setup (if using SMS)
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = twilio(accountSid, authToken);

// Nodemailer Setup (if using Email)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send SMS (Twilio)
app.get('/send-sms', (req, res) => {
  client.messages.create({
    body: `🚨 ALERT: Your heart has been compromised by LOVE_VIRUS! Click to scan: ${process.env.FRONTEND_URL}`,
    from: process.env.TWILIO_NUMBER,
    to: req.query.toPhone, // Her phone number
  })
  .then(() => res.send('SMS sent! 💘'))
  .catch(err => res.status(500).send(err));
});

// Send Email (Nodemailer)
app.get('/send-email', (req, res) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: req.query.toEmail, // Her email
    subject: '🚨 CRITICAL ALERT: LOVE_VIRUS DETECTED!',
    html: `<p>Your heart is under attack! <a href="${process.env.FRONTEND_URL}">Click to scan for threats.</a></p>`,
  };

  transporter.sendMail(mailOptions)
    .then(() => res.send('Email sent! 💘'))
    .catch(err => res.status(500).send(err));
});

app.listen(3001, () => console.log('Backend running on http://localhost:3001'));
