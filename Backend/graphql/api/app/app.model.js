import mongoose, { Schema } from "mongoose";
import { SchemaMaker } from "../../common/SchemaMaker.js";

const SchemaDefination = {
    maximum_file_transfer_by_unauthorized_user: {
        type: Number,
        default: 0
    }
}
export const AppSettingsSchema = new Schema( SchemaMaker(SchemaDefination), {
    versionKey: false
} )
export const AppSettingsModel =  mongoose.model('AppSetting', AppSettingsSchema)