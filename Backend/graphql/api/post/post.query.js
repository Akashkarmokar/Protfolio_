import {validate_post_listing_input, post_listing, validate_single_post_input, single_post, post_count } from "./post.helper.js";


export const PostQuery = {
    PostListing: async (parent, args, context ) => {
        const inputData = { ...args.inputData };
        const validate_data =  await validate_post_listing_input(inputData);
        const PostListing = await post_listing(validate_data);
        const PostListingCount = await post_count(validate_data);
        
        return {
            posts: PostListing,
            metadata: {
                total_count: PostListingCount,
                page: validate_data.page,
                limit: validate_data.limit
            }
        }
    },

    Post: async (parent, args, context ) => {
        const inputData = { ...args.inputData };
        const validate_data = await validate_single_post_input(inputData);
        const post  =  await single_post(validate_data)
        console.log("POST: ", post)
        return post
    }
}