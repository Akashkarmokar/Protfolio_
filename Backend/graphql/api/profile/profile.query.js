import {  validate_get_profile_input } from "./profile.helper.js";
import { get_single_profile } from './profile.repository.js'

export const ProfileQuery = {

    GetProfile: async (parent, args, context ) => {
        const inputData = { ...args.inputData };
        const validate_data = await validate_get_profile_input(inputData);
        return await get_single_profile({})
    }
}