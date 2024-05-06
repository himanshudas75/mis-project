// import './stylesheets/Layout.css';

import { Outlet } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';
// import Header from './Header';
// import Footer from './Footer';
// import VerifyEmail from './VerifyEmail';
import Logout from './Logout';

function Layout() {
    // const { auth } = useAuth();
    // const unverified = import.meta.env.VITE_ROLE_UNVERIFIED;
    // const verified = import.meta.env.VITE_ROLE_VERIFIED;

    return (
        <div className="layout">
            {/* <Header /> */}
            <main className="main m-4">
                <Logout />
                <Outlet />
            </main>
            {/* <Footer /> */}
        </div>
    );
}

export default Layout;
