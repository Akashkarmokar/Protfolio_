import {ProfileModel} from '../models.js'

export const create_a_single_profile = async (data)=> {
    try {
        const data2 = await ProfileModel.create({...data})
        console.log('Profile created successfully', data2);
        
        return data2
    } catch(error) {
        throw new Error(error.message)
    }
}

export const get_single_profile = async (query, selected_fields = {}) => {
    try {
        return await ProfileModel.findOne({...query}).select(selected_fields).lean();

    }catch(error) {
        throw new Error(error.message)
    }
}

export const update_profile = async (params) => {
    try {
        const { query, update_data, options = {} } = params;
        console.log({ query, update_data, options })
        const updatedProfile = await ProfileModel.findOneAndUpdate(query, { ...update_data }, {
            new: true,
            ...options
        }).lean();
        return updatedProfile
    }catch(error) {
        console.log("Error From Repo: ",  error);
        throw new Error(error.message);
    }
}
