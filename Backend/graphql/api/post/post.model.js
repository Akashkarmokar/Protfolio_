import mongoose, { Schema } from "mongoose";
import { SchemaMaker } from "../../common/SchemaMaker.js";

const SchemaDefination = {
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    short_preview_content: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['ACTIVE', 'INACTIVE', 'DRAFT'],
        default: 'DRAFT'
    },
    tags: {
        type: [String],
        required: true,
        default: []
    }

}
export const PostSchema = new Schema( SchemaMaker(SchemaDefination), {
    versionKey: false,
    timestamps: true
} )
export const PostModel =  mongoose.model('Post', PostSchema)