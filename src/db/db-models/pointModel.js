import { Schema, model } from 'mongoose';

const geometry = new Schema(
    { 
        type: String, 
        coordinates: [Number]
    }
);
const properties = new Schema(
    { 
        title: String, 
        description: String 
    }
);

const pointSchema = new Schema(
    {   
        iduser: Number,
        type: String,
        geometry: geometry,
        properties: properties ,
        images: [String],
        comments: [String],
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model("Point", pointSchema); 

