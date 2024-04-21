import User from '../../backend/models/users'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { userId, battleTag } = req.body;
        console.log(userId)

        try {
            const user = await User.findById(userId);
            if (!user.savedBattleTags.includes(battleTag)) {
                user.savedBattleTags.push(battleTag);
                await user.save();
                console.log(user);
                res.status(200).json({ message: 'BattleTag saved successfully', user });
            }
        } catch (error) {
            console.error('There was an error saving the BattleTag:', error);
            res.status(500).json({ message: 'There was an error saving the BattleTag', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'That method is not allowed by the server' });
    }
}
