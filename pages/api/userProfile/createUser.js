import connectDB from '../../../backend/config/db.js'
import User from '../../../backend/models/users.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {

        await connectDB();

        const { name, username, password } = req.body;

        if (!name || !username || !password) {
            return res.status(400).json({ error: "Incomplete user profile data" });
        }

        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.status(409).json({ error: "Username is already taken" });
        }

        // had to adjust the api to accept the new user data

        const newUser = new User({
            name,
            username,
            password
        });

        await newUser.save();

        res.status(201).json({ message: "User profile created" });

    } catch (error) {
        console.error("Error creating user profile:", error);
        res.status(500).json({ error: "An error occurred while creating user profile" });
    }
}
