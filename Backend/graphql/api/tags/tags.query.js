import {
    tag_listing
} from "./tags.helper.js";


export const TagQuery = {
    TagListing: async (parent, args, context ) => {
        const inputData = { ...args.inputData };
        return await tag_listing(inputData);
    },
}