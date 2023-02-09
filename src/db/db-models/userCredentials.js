import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const Schema = mongoose.Schema;

const model = {
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
}

const userSchema = new Schema(model);

userSchema.pre('save', async (next)=>{
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})

userSchema.methods.isValidPassword = async (password)=>{
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

export default mongoose.model('UserCredentials', userSchema);