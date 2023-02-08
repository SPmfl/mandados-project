import { Schema, model } from 'mongoose';

const pointSchema = new Schema(
    {
        iduser: Number,
        name: String,
        coordinates: { latitud: Number, longitud: Number },
        comments: [String],
        images: [String]
    },
    {
        timestamps: true,
        versionKey: false
    }
);
const point2Schema = new Schema(
    {   
        iduser: Number,
        type: String,
        geometry: { 
            type: String, 
            coordinates: [Number] 
        },
        properties: { 
            title: String, 
            description: String 
        },
        images: [String]
    },
    {
        timestamps: true,
        versionKey: false
    }
);

//export default model("Point2", point2Schema);
export default model("Point", pointSchema); 