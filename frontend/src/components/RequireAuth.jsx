import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
// import useData from '../hooks/useData';
// import { useSnackbar } from 'notistack';
// import { useParams } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import PageNotFound from '../views/PageNotFound.jsx';
import VerifyEmail from './VerifyEmail';
// import useTourspots from '../hooks/useTourspots';
// import Loading from './Loading.jsx';

function RequireAuth() {
    const { auth } = useAuth();
    console.log(auth);
    const location = useLocation();
    const unverified = import.meta.env.VITE_ROLE_UNVERIFIED;
    const verified = import.meta.env.VITE_ROLE_VERIFIED;

    if (auth?.identity) {
        if (auth?.roles?.includes(unverified)) {
            return <VerifyEmail />;
        } else if (auth?.roles?.includes(verified)) {
            return <Outlet />;
        } else {
            return <p>No valid role found</p>;
        }
    } else {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
}

export default RequireAuth;
