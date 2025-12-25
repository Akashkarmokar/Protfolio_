import { useEffect } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { makeToast } from "../Helpers"
import { gql, useMutation } from "@apollo/client"
import Cookies from "js-cookie"

const AuthCallback = ()=> {
    const [QueryParams] = useSearchParams()
    const code = QueryParams.get("code")
    console.log("CODE: ", code)

    const AuthorizationGQL = gql`
        mutation SignIn($inputData: AuthorizationInput) {
            Authorization(inputData: $inputData) {
                token
            }
        }
    `;
    const [AuthorizeUser, { data, loading, error }] = useMutation(AuthorizationGQL);
    useEffect(()=> {
        try {
            if(code) {
                const authorizer = async() =>{
                    const response = await AuthorizeUser({
                        variables: {
                            inputData: {
                                code: code
                            }
                        }
                    });
                    console.log("RESPONSE: ", response);
                    console.log("Auth: ", response.data.Authorization);
                    if(response.data.Authorization.token) {
                        const token = response.data.Authorization.token;
                        console.log("TOKEN: ", token);
                        // Cookies.set('token', token, { expires: 7 });
                        // window.location.href = "/";
                        if(token) {
                            Cookies.set('_token', token, { expires: 7 });
                            makeToast("Authorization successful. Redirecting...");
                            window.location.href = "/dashboard";
                        }
                        
                    } else {
                        makeToast("Authorization failed. Please try again.");
                    }
                }
                authorizer()
            }
        }catch (error) {
            console.log("ERROR: ", error)
            makeToast("Something went wrong during authorization. Please try again later.");
        }
        
    }, [])

    const handleBackToHome = () => {
        window.location.href = "/";
    }

    if(!code) {
        (
            <div className='main-container pb-10'>
                <h1>Invalid Sign In</h1>
                <button onClick={handleBackToHome}> Back To Home </button>
            </div>
        )
    }

    return (
        <div className='main-container pb-10'>
            <h1>Welcome to the App</h1>
        </div>
    )
}

export default AuthCallback
