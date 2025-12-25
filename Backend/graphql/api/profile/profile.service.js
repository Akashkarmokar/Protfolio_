import {create_a_single_profile, get_single_profile, update_profile} from './profile.repository.js'


export const CreateProfile = async (params) => {
    try {
        const { name, email, phone, designation, company, experiences } = params
        
        const data = {
            name: name,
            email: email,
            phone: phone,
            designation: designation,
            company: company,
            experiences: experiences
        }
        return (await create_a_single_profile(data)).toObject()
    } catch(error) {
        console.log("ERROR: ", error)
        throw new Error(error.message)
    }
}

export const Update_A_Single_Profile = async (params) => {
    try {
        const { id, name, email, phone, designation, company, experiences } = params

        const query = { _id: id }
        const  updateData = {
            $set: {},
            $push: {}
        }
        if ( name ) { updateData.$set.name = name }
        if ( email ) { updateData.$set.email = email }
        if ( phone ) { updateData.$set.phone = phone }
        if ( designation ) { updateData.$set.designation = designation }
        if ( company  ) { updateData.$set.company = company }

        const options = {
            arrayFilters: []
        }
        const pushable_data = [];

        if(params.experiences) {
            experiences.forEach((experience, index) => {
                const { id, ...rest } = experience
                if(id) {
                    const keyName = `experiences.$[elem${index}]`;

                    Object.keys(rest).forEach((key) => {
                        updateData.$set = {
                            ...updateData.$set,
                            [`${keyName}.${key}`]: rest[key]
                        }
                    })

                    options.arrayFilters.push(
                        {
                            [`elem${index}._id`]: { $eq: id }
                        }
                    )
                }else {
                    pushable_data.push({ ...rest })
                }

            })
        }

        const profileUpdateData = await update_profile({
            query: query,
            update_data: updateData,
            options: options.arrayFilters.length ? { upsert: true, ...options} : { upsert: true }
        })
        if(pushable_data.length) {
            await update_profile({
                query: query,
                update_data: {
                    $push: {
                        experiences: { $each: pushable_data}
                    }
                },
            })
        }
        return await get_single_profile({_id: id})
    }catch(error) {
        console.log("Error: ", error)
        throw new Error(error.message)
    }
}

