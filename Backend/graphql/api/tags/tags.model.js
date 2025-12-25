import mongoose, { Schema } from "mongoose";
import { SchemaMaker } from "../../common/SchemaMaker.js";

const SchemaDefination = {
    title: {
        type: String,
        required: true,
        lowercase: true,
    },

}
export const TagSchema = new Schema( SchemaMaker(SchemaDefination), {
    versionKey: false,
    timestamps: true
} )
export const TagModel =  mongoose.model('Tag', TagSchema)