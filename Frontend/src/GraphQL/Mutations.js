import { gql } from '@apollo/client'

export const SIGN_IN = gql`
    mutation SIGN_IN($inputData: sing_in_dto) {
        signin(inputData: $inputData) {
            status
        }
    }
`