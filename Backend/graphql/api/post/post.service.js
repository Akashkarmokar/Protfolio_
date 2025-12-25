import {PostModel} from '../models.js'
import { update_single_post } from './post.repository.js'
export const CreatePost = async (params) => {
    try {
        const { title, content, status, short_preview_content, tags } = params
        console.log("PARAMS y", params)
        const data = {
            title: title,
            content: content,
            status: status,
            short_preview_content: short_preview_content,
            tags: tags
        }
        return (await PostModel.create(data)).toObject()
    } catch(error) {
        console.log("ERROR: ", error)
        throw new Error(error.message)
    }
}

export const Update_A_Single_Post = async (params) => {
    try {
        const { id, title, content, status, tags,short_preview_content } = params
        const query = {
            _id: id,
        }
        const update_data = {};

        if(status) {
            update_data.status = status;
        }
        if(title) {
            update_data.title = title;
        }
        if(content) {
            update_data.content = content;
        }
        if(tags) {
            update_data.tags = tags;
        }
        if(short_preview_content) {
            update_data.short_preview_content =  short_preview_content;
        }
        const updated_post = await update_single_post( { query, update_data:  update_data } );

        return updated_post;
    }catch(error) {
        throw new Error(error.message)
    }
}