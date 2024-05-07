import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function RequireNoAuth() {
    const { auth } = useAuth();
    const location = useLocation();

    return !auth?.identity ? (
        <Outlet />
    ) : (
        <>
            <Navigate to="/" state={{ from: location }} replace />
        </>
    );
}

export default RequireNoAuth;
