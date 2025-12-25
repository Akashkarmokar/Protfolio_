import gql from "graphql-tag";

export const ProfileSchema = gql`

    enum WorkPlace {
        REMOTE
        ONSITE
        HYBRID
        FREELANCE
        
    }

    type Experiences {
        _id: String
        id: String
        company_name: String
        linkedin_link: String
        website_link: String
        designation: String
        start_date: String
        end_date: String
        description: String
        tech_skills: String
        work_place: WorkPlace
    }



    type Profile {
        _id: String
        id: String
        name: String
        email: String
        phone: String
        designation: String
        company: String
        experiences: [Experiences]
    }

    input CreateExperienceInput {
        company_name: String
        website_link: String
        designation: String
        start_date: String
        end_date: String
        description: String
        tech_skills: String
        work_place: WorkPlace
    }

    input CreateProfileInput {
        name: String
        email: String
        phone: String
        designation: String
        company: String
        experiences: [CreateExperienceInput]
    }
    
    
    input UpdateExperienceInput {
        id: String
        company_name: String
        website_link: String
        linkedin_link: String
        designation: String
        start_date: String
        end_date: String
        description: String
        tech_skills: String
        work_place: WorkPlace
    }
    input UpdateProfileInput {
        id: String
        name: String
        email: String
        phone: String
        designation: String
        company: String
        experiences: [UpdateExperienceInput]
    }
    type Query {
        GetProfile: Profile @auth(role: ["USER", "ADMIN"])
    }
    
    type Mutation {
        CreateProfile(inputData: CreateProfileInput): Profile @auth(role: [ "ADMIN"])
        UpdateProfile(inputData: UpdateProfileInput): Profile @auth(role: [ "ADMIN"])
    }
`