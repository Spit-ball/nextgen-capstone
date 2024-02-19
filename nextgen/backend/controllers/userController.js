import User from '../models/users.js';

export const createUserProfileInDatabase = async (userData) => {
    try {
        const newUser = new User(userData);

        await newUser.save();

        return newUser;
    } catch (error) {
        throw new Error(`Error creating user profile: ${error.message}`);
    }
};
