import { CreateProfile, Update_A_Single_Profile } from "./profile.service.js";
import { validate_create_profile_input, validate_update_profile_input } from "./profile.helper.js";

export const ProfileMutation = {
    CreateProfile: async (parent, args, context)=> {
        const inputData = { ...args.inputData }
        const validatedData = await validate_create_profile_input(inputData);
        return await CreateProfile(validatedData)
    },
    UpdateProfile: async (parent, args, context)=> {
        const inputData = { ...args.inputData }
        const validatedData = await validate_update_profile_input(inputData);
        console.log({ validatedData})
        const data = await Update_A_Single_Profile(validatedData);
        console.log("UPDATED DATA", data)
        return data
    }
}