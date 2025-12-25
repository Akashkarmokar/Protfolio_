import { CreateContact } from './contact.repository.js'

export const Create_Single_Contact = async (params) => {
    try {
        const { email, contact, message } = params
        const data = {
            email,
            contact,
            message
        }
        return (await CreateContact(data)).toObject()
    } catch(error) {
        console.log("ERROR: ", error)
        throw new Error(error.message)
    }
}
