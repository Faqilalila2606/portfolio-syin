import nodemailer from 'nodemailer';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        // Konfigurasi transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'syintyamustika@gmail.com',
                pass: process.env.EMAIL_PASSWORD, // Pastikan Anda menyimpan password di .env.local
            },
        });

        const mailOptions = {
            from: email,
            to: 'syintyamustika@gmail.com',
            subject: `Contact Form Submission from ${name}`,
            text: message,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error); // Tambahkan log untuk debugging
            res.status(500).json({ error: 'Failed to send email' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
} 