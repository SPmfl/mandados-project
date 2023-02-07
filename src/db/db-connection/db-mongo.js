import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();


const URI = process.env.MONGO_URI;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log("mongo database is connect"))
    .catch(error => console.error("mongo database connection failed:", error));

export default mongoose;