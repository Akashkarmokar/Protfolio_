import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../Hooks'

const PrivateOutlet = ()=>{
    const authDetails = useAuth();
    return <Outlet />
    return authDetails.isUserLoggedIn ? <Outlet/> : <Navigate to="/signin"/>
}

export default PrivateOutlet;