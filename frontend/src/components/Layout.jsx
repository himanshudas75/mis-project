// import './stylesheets/Layout.css';

import { Outlet } from "react-router-dom";
// import useAuth from '../hooks/useAuth';
import Header from "./Header";
import Footer from "./Footer";
// import VerifyEmail from './VerifyEmail';
import Logout from "./Logout";
import useAuth from "../hooks/useAuth";
import NavBar from "./NavBar";
function Layout() {
  const { auth } = useAuth();
  // const unverified = import.meta.env.VITE_ROLE_UNVERIFIED;
  // const verified = import.meta.env.VITE_ROLE_VERIFIED;

  return (
    <div className="layout">
      <Header />
      <NavBar />
      <main className="main m-4">
        {auth && auth.identity && <Logout className="m-5" />}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
