import {contact_list} from './contact.repository.js'

export const validate_create_contact_input = async (params)=> {
    try {
        const { email, contact, message} = params;
        const validated_data = { };
        
        if(email == "") {
            throw new Error("Email Is Requried")
        }
        if(email){
            const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email_regex.test(email)) {
                throw new Error('Invalid email format')
            }
            else { validated_data.email = email }
        }



        if(contact == "") {
            throw new Error("Contact Is Requried")
        }else { validated_data.contact = contact }

        if(message == "") {
            throw new Error("Message Is Requried")
        }else { validated_data.message = message }
        
        return validated_data;
    }catch(error) {
        console.log("ERR MES-> ", error.message)
        throw new Error(error.message);
    }
}

export const get_contact_list = async ()=> {
    try {
        return await contact_list();
    }catch(error) {
        throw new Error(error.message);
    }
}