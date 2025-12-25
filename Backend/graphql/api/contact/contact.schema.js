import gql from "graphql-tag";

export const ContactSchema = gql`
    input ContactInput {
        email: String
        contact: String
        message: String
    }
    
    type Contact {
        _id: String
        email: String
        contact: String
        message: String
    }
    
    type Query {
        ContactListing: [Contact] @auth(role: ["ADMIN"])
    }
    
    type Mutation {
        CreateContact(inputData: ContactInput): Contact @auth(role: ["ADMIN", "USER"])
    }
`