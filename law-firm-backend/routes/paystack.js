import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.get('/verify/:reference', async (req, res) => {
  const { reference } = req.params;

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
      }
    );
   
    const data = response.data;
    if (data.status && data.data.status === 'success') {
      res.status(200).json({
        success: true,
        message: 'Payment verified',
        data: data.data
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment not successful',
        data: data.data
      });
    }
  } catch (error) {
    console.error('Verification error:', error.message);
    res.status(500).json({ success: false, message: 'Server error during verification' });
  }
});

export default router;