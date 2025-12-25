import gql from "graphql-tag";

export const TagSchema = gql`

    input TagListingInput {
        page: Int
        limit: Int
    }

    input CreateTagInput {
        title: String!
    }
    
    type Tag {
        _id: String
        title: String
    }

    type Query {
        TagListing(inputData: TagListingInput): [Tag] @auth(role: ["USER", "ADMIN"])
    }
    
    type Mutation {
        CreateTag(inputData: CreateTagInput): Tag @auth(role: ["ADMIN", "USER"])
    }
`