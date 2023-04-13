import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    image : {
        url: String,
        public_id: String
    },
    cover : {
        url: String,
        public_id: String
    },
    description: {
        type: String,
    },
    followers: [],
    following: [],
    retweets: [],
    likes: []

})

userSchema.methods.encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password , salt);
}

userSchema.methods.confirmPassword = function(password) {
    return bcrypt.compareSync(password , this.password);
}

export default model('User' , userSchema);