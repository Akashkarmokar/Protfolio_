import { useContext } from "react";
import { AuthContext } from "../Context";

const useAuth = ()=>{
    const AuthDetails = useContext(AuthContext)
    return AuthDetails
}

export default useAuth;