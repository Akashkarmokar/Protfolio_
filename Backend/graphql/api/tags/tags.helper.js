import { 
    create_a_single_tag,
    find_single_tag,
    get_tag_list
} from './tags.repository.js'



export const validate_create_tag_input_data = async (inputData)=> {
    try {
        let { title } = inputData;
        title = title.trim().toLowerCase();
        const validatedData = {}
        const doesExist = await find_single_tag({ title});
        if (doesExist) {
            throw new Error('Tag already exists');
        }else{
            validatedData.title = title;
        }

        return validatedData

    }catch(err) {
        throw new Error(err.message);
    }
}

export const tag_listing = async (params) => {
    try {
        const tags = await get_tag_list()
        return tags;
    } catch (error) {
        throw new Error(error.message);
    }
}