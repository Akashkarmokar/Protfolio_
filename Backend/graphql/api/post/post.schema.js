import gql from "graphql-tag";

export const PostSchema = gql`

    input CreatePostInput {
        title: String
        content: String
        status: String
        short_preview_content: String
        tags: [String]
    }
    
    input PostInput {
        id: String
    }
    
    input PostListingInput {
        status: String
        page: Int
        limit: Int
        tags: [String]
    }
    input UpdatePostInput {
        id: String
        title: String
        content: String
        short_preview_content: String
        status: String,
        tags: [String],
    }

    type Post {
        content: String
        id: String
        short_preview_content: String
        status: String
        title: String,
        tags:  [Tag],
    }
    type PostListingMetadata {
        total_count: Int
        page: Int
        limit: Int
    }

    type PostListing {
        metadata: PostListingMetadata
        posts: [Post]
    }
    
    type Query {
        PostListing(inputData: PostListingInput): PostListing @auth(role: ["USER", "ADMIN"])
        Post(inputData: PostInput): Post @auth(role: ["USER", "ADMIN"])
    }
    
    type Mutation {
        CreatePost(inputData: CreatePostInput): Post @auth(role: ["ADMIN"])
        UpdatePost(inputData: UpdatePostInput): Post @auth(role: ["ADMIN"])
    }
`