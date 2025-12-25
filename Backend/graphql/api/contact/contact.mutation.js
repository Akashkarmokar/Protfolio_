import {
    validate_create_contact_input
} from "./contact.helper.js";
import {
    Create_Single_Contact
} from "./contact.service.js";

export const ContactMutaion = {
    CreateContact: async (parent, args, context)=> {
        const inputData = { ...args.inputData }
        const validatedData = await validate_create_contact_input(inputData);
        console.log("Validated Data: ", validatedData)
        return await Create_Single_Contact(validatedData)
    }
}