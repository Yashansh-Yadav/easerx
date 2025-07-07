const express = require('express');
const router = express.Router();
const { User } = require('../models');
const jwt = require('jsonwebtoken');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString(); 

const OTP_EXPIRY_MINUTES = 5;

router.post('/send-otp', async (req, res) => {
  const { phone , roll } = req.body;

  if (!phone) return res.status(400).json({ message: 'Phone number is required' });

  let user = await User.findOne({ where: { phone } });

  if (!user) {
    user = await User.create({ phone, role: roll }); 
  }

  const otp = generateOTP();
  const now = new Date();

  user.otp = otp;
  user.otp_created_at = now;
  user.otp_attempts = 0;
  await user.save();

  console.log(`🔐 OTP for ${phone}: ${otp}`); // Replace with SMS API

  res.json({ message: 'OTP sent successfully' });
});

router.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;

  const user = await User.findOne({ where: { phone } });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const now = new Date();
  const otpAge = (now - user.otp_created_at) / 1000 / 60; 

  if (otpAge > OTP_EXPIRY_MINUTES) {
    return res.status(400).json({ message: 'OTP expired' });
  }

  if (user.otp !== otp) {
    user.otp_attempts += 1;
    await user.save();
    return res.status(401).json({ message: 'Invalid OTP' });
  }

  const token = jwt.sign(
    { id: user.id, phone: user.phone, role: user.role },
    process.env.JWT_SECRET || 'secret-key',
    { expiresIn: '2h' }
  );

  user.otp = null;
  user.otp_attempts = 0;
  await user.save();

  res.json({ token });
});


let blacklistedTokens = [];

router.post('/logout', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (token) {
    blacklistedTokens.push(token);
    return res.json({ message: 'Logged out successfully' });
  }

  res.status(400).json({ message: 'No token provided' });
});


module.exports = router;
