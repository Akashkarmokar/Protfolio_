import mongoose, { Schema } from "mongoose";
import { SchemaMaker } from "../../common/SchemaMaker.js";

const SchemaDefinition = {
    email: {type: String, required: true},
    contact: {type: String, required: true},
    message: {type: String, required: true}
}
export const ContactSchema = new Schema( SchemaMaker(SchemaDefinition), {
    versionKey: false,
    timestamps: true
} )
export const ContactModel =  mongoose.model('Contact', ContactSchema)