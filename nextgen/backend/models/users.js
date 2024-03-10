import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 20,
    },
    dateRegistered: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin', 'coach', 'player'] // accepts only these values for role -- default is user.
    },
});

UserSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

UserSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
}
);

const User = mongoose.models.User || mongoose.model('User', UserSchema); // had a "cannot overwrite model once compiled" error, so I added this line to fix it. this line checks if the model is already compiled, and if it is, it uses that model, otherwise it compiles a new model.


export default User;
