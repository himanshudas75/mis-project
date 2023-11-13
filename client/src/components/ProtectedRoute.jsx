import { Navigate } from "react-router-dom";
import { getCookie } from "../utils/helper";
const ProtectedRoutes = ({ access,children }) => {
    const auth=getCookie('auth');
    if((auth==='admin' )|| (auth==='user' && access==='view')) return children;
    return <Navigate to='/profile/error'/>
}

export default ProtectedRoutes;