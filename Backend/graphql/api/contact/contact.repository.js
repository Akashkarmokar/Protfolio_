import {ContactModel} from '../models.js'

export const CreateContact = async (params)=> {
    try {
        const data = await ContactModel.create({...params});
        return data
    } catch(error) {
        throw new Error(error.message)
    }
}

export const contact_list = async ()=> {
    try{
        // return (await ContactModel.find({}).lean())
        return await ContactModel.aggregate([
            {
                $match: {}
            },
            {
                $sort: {
                    createdAt: -1
                }
            }
        ])
    }catch(error) {
        throw new Error(error.message)
    }
}