import nodemailer from 'nodemailer';

export default async function handler(req, res) {
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
            subject: `Collaboration Request from ${name}`,
            text: message,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to send email' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
} 