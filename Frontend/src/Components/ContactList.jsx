import {useEffect, useState} from "react";
import { gql, useLazyQuery } from "@apollo/client"


const ContactListingQuery = gql`
    query ContactListing {
        ContactListing {
            _id
            contact
            email
            message
        }
    }
`


const ContactsList = ()=> {
    const [contacts, setContacts] = useState([])
    const [ getContacts, {error, data, loading} ] = useLazyQuery(ContactListingQuery);

    useEffect(() => {
        const fetchContacts = async () => {
            const response = await getContacts({  fetchPolicy: 'network-only' });
            if(response?.data){
                const { ContactListing = [] } = response?.data ?? {} ;
                console.log("ContactListing", ContactListing)
                // setContacts(prev => {
                //         return [...prev, ContactListing]
                //     }
                // )
                setContacts(ContactListing)
            }
        }
        fetchContacts()
    }, []);

    return (
        <div className="main-container">
            <div className=" flex  flex-col justify-center items-center space-y-2">
                {
                    contacts.map(contact => (
                        <div key={contact._id} className="w-full border rounded-md">
                            <p className=" ">{contact.email}</p>
                            <p className="">{contact.contact}</p>
                            <p className="">{contact.message}</p>
                            <br/>
                        </div>
                    ))
                }
            </div>

        </div>
    )

};
export default ContactsList;