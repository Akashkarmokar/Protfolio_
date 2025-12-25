import gql from "graphql-tag";

export const GlobalSchema = gql`
    directive @auth(role: [String]) on FIELD_DEFINITION 

`
