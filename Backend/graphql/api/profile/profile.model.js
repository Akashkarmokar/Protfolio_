import mongoose, { Schema } from "mongoose";
import { SchemaMaker, Id } from "../../common/SchemaMaker.js";


const experiencesSchemaDefinition = {
    company_name: {
        type: String,
        required: false,
        trim: true
    },
    website_link: {
        type: String,
        required: false,
        trim: true
    },
    linkedin_link: {
        type: String,
        required: false,
        trim: true
    },
    designation: {
        type: String,
        required: false,
        trim: true
    },
    start_date: {
        type: String,
        required: false,
        trim: true
    },
    end_date: {
        type: String,
        required: false,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    tech_skills: {
        type: String,
        required: false,
        trim: true
    },
    work_place: {
        type: String,
        required: false,
        trim: true
    }
}
const experiencesSchema = SchemaMaker(experiencesSchemaDefinition, { versionKey: false , timestamps: true })  ;

// experiencesSchema.virtual('id').get(function () {
//     return this._id;
// })

const SchemaDefination = {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: false,
        trim: true
    },
    company: {
        type: String,
        required: false,
        trim: true
    },
    
    designation: {
        type: String,
        required: false,
        trim: true
    },
    experiences: [experiencesSchema]

}
export const ProfileSchema = SchemaMaker(SchemaDefination, {
    versionKey: false,
    timestamps: true
} )
export const ProfileModel =  mongoose.model('Profile', ProfileSchema)