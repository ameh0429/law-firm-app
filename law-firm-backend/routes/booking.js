import express from 'express';
import nodemailer from'nodemailer'
import dotenv from 'dotenv'

const router = express.Router();
dotenv.config()

router.post('/', async (req, res) => {
  const { name, date, time, email } = req.body;

  if (!name || !date || !time || !email) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }
  
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_TO,
      subject: 'New Appointment Booking',
      html: `
             <h3>New Booking Received</h3>       
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Date:</strong> ${date}</p>
             <p><strong>Time:</strong> ${time}</p>`
    });

    res.json({ success: true, message: 'Booking received' });
  } catch (err) {
    console.error('Booking email error:', err);
    res.status(500).json({ success: false, message: 'Failed to send booking' });
  }
});

export default router;