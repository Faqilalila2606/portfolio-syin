import { NextApiRequest, NextApiResponse } from 'next';

export default function confirmCollaboration(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    // Logika untuk mengonfirmasi kolaborasi berdasarkan ID
    // Misalnya, update status kolaborasi di database

    res.status(200).json({ message: 'Collaboration confirmed', id });
} 