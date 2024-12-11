const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: 'ahmedhaiballa33@gmail.com',
            subject: `New Contact Form Message from ${name}`,
            text: `
                Name: ${name}
                Email: ${email}
                Message: ${message}
            `
        });

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
