import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../Hooks'

const PrivateOutletRestriction = ({children})=>{
    // return children
    const { userInfo , UserInfoHandler } = useAuth();
    console.log("USER INFO : Pr: ", userInfo)
    const { pathname } = useLocation();
    console.log("PrivateOutletRestriction", userInfo, pathname);
    if (pathname === "/signin" && userInfo.role === "USER") {
        return children;
    }
    return userInfo.role === "ADMIN" ? children : <Navigate to="/"/>
}

export default PrivateOutletRestriction;