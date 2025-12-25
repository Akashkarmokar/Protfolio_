import {
    TagModel
} from '../models.js'
import { create_a_single_tag } from './tags.repository.js'



export const create_tag = async (data) => {
    try {
        const tag = await create_a_single_tag(data);
        return tag;
    } catch (error) {
        throw new Error(error.message);
    }
}