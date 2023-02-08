import {Schema, model} from 'mongoose';

const pointSchema = new Schema(
    {
        iduser: Number,
        name: String,
        coordinates: { latitud: Number, longitud: Number },
        comments: [String],
        images: [String]
    },
    {
        timestamps:true,
        versionKey:false
    }
);


export default model("Point", pointSchema);