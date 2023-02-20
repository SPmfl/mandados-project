import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
});

UserSchema.pre('save', async function(next){
    console.log("HOlas!! soy un middleware antes de salvar un usuario");
    const hash = await bcrypt.hash(`${this.password}`, 10)
    this.password = hash;
    next();
})

UserSchema.methods.isValidPassword = async function(password){
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

export default mongoose.model('UserCredentials', UserSchema);