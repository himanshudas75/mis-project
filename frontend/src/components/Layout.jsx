// import './stylesheets/Layout.css';

import { Outlet } from 'react-router-dom';

// import Header from './Header';
// import Footer from './Footer';

function Layout() {
    return (
        <div className="layout">
            {/* <Header /> */}
            <main className="main m-4">
                <Outlet />
            </main>
            {/* <Footer /> */}
        </div>
    );
}

export default Layout;
