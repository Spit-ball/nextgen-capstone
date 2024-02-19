// pages/api/userProfile/create.js

import connectDB from '../../../backend/config/db.js'
import User from '../../../backend/models/users.js';
import { createUserProfileInDatabase } from '../../../backend/controllers/userController.js';

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
        const newUserProfile = await createUserProfileInDatabase({ name, username, password });

        const createdUser = await User.findById(newUserProfile._id);

        // send the details of the newly created user profile as the API response for testing
        res.status(201).json(createdUser);

    } catch (error) {
        console.error("Error creating user profile:", error);
        res.status(500).json({ error: "An error occurred while creating user profile" });
    }
}
