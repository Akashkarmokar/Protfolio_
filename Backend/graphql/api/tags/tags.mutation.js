import {
    create_tag
} from "./tags.service.js";
import {
    validate_create_tag_input_data
} from "./tags.helper.js";

export const TagMutation = {
    CreateTag: async (parent, args, context)=> {
        const inputData = { ...args.inputData }
        const validatedData = await validate_create_tag_input_data(inputData);
        return await create_tag(validatedData);
    }
}