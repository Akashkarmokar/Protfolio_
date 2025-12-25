import {TagModel} from '../models.js'
import error from "mocha/lib/pending.js";

export const create_a_single_tag = async (data)=> {
    try {
        return (await TagModel.create({...data})).toObject();
    } catch(error) {
        throw new Error(error.message)
    }
}

export const get_tag_list = async (params) => {
    try {
        return await TagModel.find().lean();
    } catch (error) {
        throw new Error(error.message);
    }
}

export const find_single_tag = async (params) => {
    try {
        const { title } = params;
        return await TagModel.findOne({title: title}).lean();
    }catch (err) {
        throw new Error(error.message)
    }
}

