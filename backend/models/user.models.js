import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    verifyOtp: {
        type: String,
        default: ''
    },
    expireVerifyOtp: {
        type: Number,
        default: 0
    },

    isAccountverified: {
        type: Boolean,
        default: false
    },
    resetOtp: {
        type: String,
        default: '',
    },
    expireResetOtp: {
        type: Number,
        default: 0
    }
})

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;