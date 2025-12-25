import gql from "graphql-tag";

export const AppSettingsSchema = gql`

    directive @auth(role: [String]) on FIELD_DEFINITION

    input FileSettingsInput {
        count: Int
    }

    type FileSettings {
        maximum_file_transfer_by_unauthorized_user: Int
    }

    type Query {
        GetAppSettings: FileSettings @auth(role: ["ADMIN"] )
    }
    
    type Mutation {
        UpdateFileSettings(inputData: FileSettingsInput): FileSettings @auth(role: ["ADMIN"] )
    }

`