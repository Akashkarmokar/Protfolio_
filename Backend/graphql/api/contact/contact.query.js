import {
    get_contact_list
}
from "./contact.helper.js";


export const ContactQuery = {
    ContactListing: async (parent, args, context ) => {
        const inputData = { ...args.inputData };
        return await get_contact_list();

    }

}