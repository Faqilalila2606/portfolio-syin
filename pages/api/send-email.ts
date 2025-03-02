import nodemailer from 'nodemailer';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, email, message, collaborationId } = req.body;

        // Cek apakah semua data yang diperlukan ada
        if (!collaborationId || !name || !email || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Validasi format email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Konfigurasi transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'syintyamustika@gmail.com',
                pass: process.env.EMAIL_PASSWORD, // Pastikan Anda menyimpan password di .env.local
            },
        });

        const confirmUrl = `https://yourdomain.com/api/confirm-collaboration?id=${collaborationId}`;
        const rejectUrl = `https://yourdomain.com/api/reject-collaboration?id=${collaborationId}`;

        const mailOptions = {
            from: email,
            to: 'syintyamustika@gmail.com',
            subject: `Contact Form Submission from ${name}`,
            text: message,
            html: `
                <p>You have a new collaboration request.</p>
                <a href="${confirmUrl}">Confirm</a>
                <a href="${rejectUrl}">Reject</a>
            `,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error: any) {
            console.error('Error sending email:', error); // Tambahkan log untuk debugging
            res.status(500).json({ error: 'Failed to send email', details: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
} 