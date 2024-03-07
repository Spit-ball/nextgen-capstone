// player comparisons route handler for retrieving an array of players to compare stats between. Still needs to be tested.

// requires auth to be implemented before it can be tested.

import connectDB from '../../../backend/config/db.js';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        await connectDB();

        const { playerIds } = req.query;

        if (!playerIds) {
            return res.status(400).json({ error: "Incomplete Data" });
        }

        const players = await Player.find({ _id: { $in: playerIds } });

        if (!players) {
            return res.status(404).json({ error: "Players not found" });
        }

        res.status(200).json(players);

    } catch (error) {
        console.error("Error fetching player comparisons:", error);
        res.status(500).json({ error: "An error occurred while fetching player comparisons" });
    }
}