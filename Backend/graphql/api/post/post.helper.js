import { 
    count_post, 
    get_all_post, 
    get_single_post 
} from './post.repository.js'

export const validate_create_post_input = async (params)=> {
    try {
        const { status, title , content, short_preview_content, tags } = params;
        console.log("PARAMS: ", params)
        if (!status) {
            throw new Error("status is required");

        }

        if(status) {
            const valid_status = ['ACTIVE', 'INACTIVE', 'DRAFT']
            if (!valid_status.includes(params.status)) {
                throw new Error('Invalid status')
            }
        }
        if(!title){
            throw new Error("title is required");

        }
        if (!content){
            throw new Error("content is required");
        }

        if (!short_preview_content) {
            throw new Error("short preview content required")
        }
        const validated_data = { };
        if(status) { validated_data.status = status }
        if(title) { validated_data.title = title }
        if(content) { validated_data.content = content }
        if(short_preview_content) { validated_data.short_preview_content = short_preview_content }
        if(tags) { validated_data.tags = tags }
        return validated_data;
    }catch(error) {
        console.log("ERR MES-> ", error.message)
        throw new Error(error.message);
    }
}

export const validate_update_post_input = async (params) => {
    try {
        const { id, status, title = "", content = "", tags, short_preview_content } = params;
        if (!id) {
            throw new Error("id is required");
        }
        if(id) {
            const existingPost = await get_single_post({ _id: id })
            if(!existingPost) {
                throw new Error("post not found");
            }
        }
        if (status) {
            const valid_status = ['ACTIVE', 'INACTIVE', 'DRAFT']
            if (!valid_status.includes(params.status)) {
                throw new Error('Invalid status')
            }
        }
        if(!title){
            throw new Error("title is required");
        }
        if (!content){
            throw new Error("content is required");
        }
        const validated_data = { id };
        if(status) { validated_data.status = status }
        if(title) { validated_data.title = title }
        if(content) { validated_data.content = content }
        if(tags) { validated_data.tags = tags }
        if(short_preview_content) { validated_data.short_preview_content =  short_preview_content }
        return validated_data;

    }catch(error) {
        throw new Error(error.message);
    }
}

export const  validate_post_listing_input = async (params) => {
    try {
        const { status, page = 1, limit = 10 } = params;
        const valid_status = ['ACTIVE', 'INACTIVE', 'DRAFT']
        if (!valid_status.includes(status)) {
            throw new Error('Invalid status')
        }
        return {...params, page, limit }
    }catch(error) {
        throw new Error(error.message);
    }
}

export const post_count = async (params) => {
    try {
        const { status, tags } = params;
        const query = {
            status: status
        }
        if(tags && Array.isArray(tags) && tags.length > 0) {
            query.tags = {
                $in: tags
            }
        }
        return await count_post({ query: query });
    }catch(error) {
        throw new Error(error.message);
    }
}
export const validate_single_post_input = async (params) => {
    try {
        const { id } = params;
        if(!id) {
            throw new Error("id is required");
        }
        const existing_post = await get_single_post({ _id: id });
        if(!existing_post) {
            throw new Error("post not found");
        }
        return params

    }catch(error) {
        throw new Error(error.message);
    }
}


export const post_listing = async (params)=> {
    try {
        const { status, tags } = params;
        const query = {
            status: status
        }
        if(tags && Array.isArray(tags) && tags.length > 0 ) {
            query.tags = {
                $in: tags
            }
        }
        // const selected_fields = {
        //     title: 1,
        //     content: 1,
        //     status: 1,
        //     id: 1,
        //     short_preview_content: 1
        // }
        return await get_all_post({match_query: query, selected_fields: {}, sorted_fields: { createdAt: -1 }, page: params.page, limit: params.limit });
    }catch(error) {
        throw new Error(error.message);
    }
}

export const single_post = async (params) => {
    try {
        const { id } = params;
        const query = { _id: id };
        // const selected_fields = { id: 1, title: 1, content: 1, status: 1 };
        return await get_single_post(query);

    }catch(error) {
        throw new Error(error.message);
    }
}