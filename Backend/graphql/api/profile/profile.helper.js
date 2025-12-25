import {get_single_profile} from './profile.repository.js'

export const validate_create_profile_input = async (params)=> {
    try {
        const { name, email, phone, designation, company, experiences = [] } = params;
        
        if (!name) {
            throw new Error("name is required");

        }

        if(email) {
            const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email_regex.test(email)) {
                throw new Error('Invalid email format')
            }
        }
        if(!phone){
            throw new Error("phone is required");

        }
        if (!designation){
            throw new Error("designation is required");
        }

        if (!company) {
            throw new Error("company is required")
        }
        // if (!experiences  || !Array.isArray(experiences) || experiences.length === 0) {
        //     throw new Error("experiences is required")
        // }
        const validated_data = { };
        if(name) { validated_data.name = name }
        if(email) { validated_data.email = email }
        if(phone) { validated_data.phone = phone }
        if(designation) { validated_data.designation = designation }
        if(company) { validated_data.company = company }
        if(experiences) { validated_data.experiences = experiences }

        return validated_data;
    }catch(error) {
        console.log("ERR MES-> ", error.message)
        throw new Error(error.message);
    }
}

export const validate_update_profile_input = async (params) => {
    try {
        let { id, name, email, phone, designation, company, experiences = [] } = params;
        const validated_data = {};
        // if (!id) {
        //     throw new Error("id is required");
        // }
        if(id) {
            const existingProfile = await get_single_profile({ _id: id })
            if(!existingProfile) {
                throw new Error("Profile not found");
            }
            validated_data.id = id;
        }else{
            validated_data.id = ""
        }


        if(name){
            validated_data.name = name.trim();
        }
        if(email) {
            const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email_regex.test(email)) {
                throw new Error('Invalid email format')
            }
            validated_data.email = email;
        }
        if(phone) { validated_data.phone = phone.trim(); }
        if(designation) { validated_data.designation = designation.trim(); }
        if (company) { validated_data.company = company.trim(); }

        if (experiences.length > 0) {
            // let notExistId = experiences.some(value=> !value.id);
            // if(notExistId) {
            //     throw new Error('id not exist inside experiences array')
            // }
            validated_data.experiences = experiences;
        }

        return validated_data;

    }catch(error) {
        throw new Error(error.message);
    }
}

export const validate_get_profile_input = async (params) => {
    try {
        return {};
    }catch(error) {
        throw new Error(error.message);
    }
}
