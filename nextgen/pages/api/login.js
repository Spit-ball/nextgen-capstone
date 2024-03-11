import connectDB from "../../backend/config/db";
import User from "../../backend/models/users";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
    const { username, password } = req.body;
    await connectDB();

    switch (req.method) {
        case "POST":
            try {
                const user = await User.findOne({ username });

                if (!user) {
                    return res.status(401).json({ message: "Your username is invalid" });
                }

                const isPasswordMatch = await bcrypt.compare(password, user.password);
                if (!isPasswordMatch) {
                    return res.status(401).json({ message: "Your password is invalid" });
                }

                res.status(200).json({ message: "Login successful", user });
            } catch (error) {
                res.status(500).json({ message: "Internal server error" });
            }
            break;
        default:
            res.status(405).json({ message: "Method not allowed" });
            break;
    }
}
