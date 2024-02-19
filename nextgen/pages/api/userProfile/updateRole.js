// allows the user to update their role in the system (admin, coach, player, user)

import connectDB from '../../../backend/config/db.js';
import User from '../../../backend/models/users.js';

export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        await connectDB();

        const { username, newRole } = req.body;

        if (!username || !newRole) {
            return res.status(400).json({ error: "Incomplete Data" });
        }

        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.role = newRole;
        await user.save();

        res.status(200).json({ message: "User role updated successfully", user: user });

    } catch (error) {
        console.error("Error updating user role:", error);
        res.status(500).json({ error: "An error occurred while updating user role" });
    }
}
