import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        console.log('Received data:', { name, email, message }); // Logging data yang diterima

        // Konfigurasi transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', // pastikan ini sesuai dengan layanan email yang digunakan
            auth: {
                user: process.env.EMAIL_USER, // pastikan variabel ini diatur di .env.local
                pass: process.env.EMAIL_PASS, // pastikan variabel ini diatur di .env.local
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER, // alamat email pengirim
            to: req.body.email, // alamat email penerima
            subject: 'Contact Form Submission',
            text: req.body.message, // isi pesan
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully'); // Logging saat email berhasil dikirim
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error); // Logging kesalahan
            res.status(500).json({ error: 'Failed to send email' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
} 