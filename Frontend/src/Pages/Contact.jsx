import {useState} from "react";
import { makeToast } from "../Helpers";
import { gql, useMutation } from "@apollo/client"
import error from "eslint-plugin-react/lib/util/error.js";



const CreateContactMutation = gql`
    mutation CreateContact($inputData: ContactInput) {
        CreateContact(inputData: $inputData) {
            _id
            contact
            email
            message
        }
    }
`


const Contact = () => {

    const [ contactInfo, setContactInfo ] = useState({
        email: '',
        contact: '',
        message: '',
    });
    const [ ContactCreator ] = useMutation(CreateContactMutation);


    const handleContact = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setContactInfo(prev => (
            {
                ...prev,
                [name]: value
            }
        ))
    };

    const handleSubmit = async (e)=> {
        e.preventDefault();
        if(contactInfo.email == "" || contactInfo.message == "" || contactInfo.contact == "" ) {
            makeToast("You have to fill all the field to make a contact")
            return
        }
        try {

            const createContact = async ()=> {
                const response = await ContactCreator({
                    variables: {
                        inputData: {
                            email: contactInfo.email,
                            contact: contactInfo.contact,
                            message: contactInfo.message
                        }
                    }
                })
                if(response?.data?.CreateContact){
                    makeToast("Your message submitted")
                }else {
                    makeToast("Something went wrong! You should try direct email to me for now .")
                }
            }
            await createContact();
        }catch(err) {
            makeToast(err.message);
        }
    }

    return (
        <div className="main-container">
            <div className="flex flex-col justify-center items-center space-y-2">
                <div className="w-90 space-y-2">
                    <input onChange={handleContact} name="email" className="p-2 border rounded-md w-full" placeholder="Email"/>
                    <input onChange={handleContact} name ="contact" className="p-2 border rounded-md w-full" placeholder="Contact"/>
                    {/*<input className="p-2 border rounded-md" placeholder="Note"/>*/}
                    <textarea onChange={handleContact} name="message" className="w-full h-[100px] p-2 border rounded-md bg-[#3B3B3B] text-white" placeholder="Your Messages"/>
                </div>
                <button onClick={handleSubmit} className="border rounded-md p-2">Submit</button>
            </div>
        </div>
    );
};

export default Contact;