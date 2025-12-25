import axios from "axios";
import { makeToast } from '../Helpers'

const callApi = async (method, url, data)=>{
    const BaseURI = import.meta.env.VITE_REACT_APP_BaseURI
    try {
        const Response = await axios({
            method: method,
            url: BaseURI+url,
            data: data
        })
        console.log("Response:",Response)
        const { message, status_code } = Response.data
        if(message === 'OK' && status_code === 200) {
            return Response.data.data
        }else {
            // makeToast("Something went wrong !!")
            return null
        }
    } catch(err) {
        // makeToast("Something went wrong !!")
    }
    
    
}

export default callApi