import express from 'express';
import nodemailer from 'nodemailer';
import Message from '../models/Message.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Helper to create Nodemailer transporter
const createTransporter = () => {
  const user = process.env.GMAIL_USER || 'awoyeleemma1@gmail.com';
  const pass = (process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, '');

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user,
      pass: pass
    }
  });
};

// Send message & email notification
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide all fields.' });
  }

  try {
    // 1. Save message to MongoDB
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // 2. Send email notification via Gmail
    const recipient = process.env.GMAIL_USER || 'awoyeleemma1@gmail.com';
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Portfolio Contact Form" <${recipient}>`,
      to: recipient,
      replyTo: email,
      subject: `🚀 New Portfolio Message from ${name}`,
      text: `You have received a new contact message from your portfolio website.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nDate: ${new Date().toLocaleString()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0f0f13; color: #e4e4e7; border-radius: 12px; border: 1px solid #27272a;">
          <h2 style="color: #818cf8; margin-bottom: 20px;">New Portfolio Contact Message</h2>
          <div style="background-color: #18181b; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
            <p style="margin: 0 0 8px 0;"><strong>Sender Name:</strong> <span style="color: #ffffff;">${name}</span></p>
            <p style="margin: 0 0 8px 0;"><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #818cf8; text-decoration: none;">${email}</a></p>
            <p style="margin: 0;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <div style="background-color: #18181b; padding: 16px; border-radius: 8px;">
            <p style="margin: 0 0 8px 0; color: #a1a1aa;"><strong>Message:</strong></p>
            <p style="margin: 0; line-height: 1.6; color: #ffffff; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #71717a; text-align: center;">
            Sent automatically from your portfolio at victor.dev
          </p>
        </div>
      `
    };

    transporter.sendMail(mailOptions).catch(err => {
      console.error('Nodemailer background delivery note:', err.message);
    });

    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact Form Error:', error);
    res.status(500).json({ success: false, error: 'Failed to process message.' });
  }
});

// GET all contact messages (Admin)
router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// MARK message as read
router.put('/messages/:id/read', async (req, res) => {
  try {
    const updated = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    res.json(updated);
  } catch (error) {
    console.error('Error marking message read:', error);
    res.status(500).json({ error: 'Failed to update message' });
  }
});

// DELETE message
router.delete('/messages/:id', async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

export default router;
