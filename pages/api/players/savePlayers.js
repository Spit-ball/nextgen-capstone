// saving players to the database -- This still need to be tested!

import SavedPlayer from '../../../backend/models/savedPlayers.js';
import connectDB from '../../../backend/config/db.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {

        await connectDB();

        const { userId, username, battletag, playerStats } = req.body;

        const savedPlayer = new SavedPlayer({
            userId,
            username,
            battletag,
            playerStats
        });

        await savedPlayer.save();

        return res.status(201).json({ message: 'Player statistics saved successfully.' });
    } catch (error) {

        console.error('Error saving player statistics:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}