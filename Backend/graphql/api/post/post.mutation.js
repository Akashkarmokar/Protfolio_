import {CreatePost, Update_A_Single_Post} from "./post.service.js";
import {validate_create_post_input, validate_update_post_input } from "./post.helper.js";

export const PostMutaion = {
    CreatePost: async (parent, args, context)=> {
        const inputData = { ...args.inputData }
        const validatedData = await validate_create_post_input(inputData);
        return await CreatePost(validatedData)
    },
    UpdatePost: async (parent, args, context)=> {
        const inputData = { ...args.inputData }
        const validatedData = await validate_update_post_input(inputData);
        const data = await Update_A_Single_Post(validatedData);
        return data
    }
}