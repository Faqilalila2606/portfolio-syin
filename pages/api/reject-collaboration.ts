import { NextApiRequest, NextApiResponse } from 'next';

export default function rejectCollaboration(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    // Logika untuk menolak kolaborasi berdasarkan ID
    // Misalnya, update status kolaborasi di database

    res.status(200).json({ message: 'Collaboration rejected', id });
} 