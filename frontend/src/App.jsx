import './App.css';
import RegistrationFrom from './components/RegistrationFrom';
import Home from './components/Home';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import NotFound from './components/NotFound';
import RegisterComplaint from './components/RegisterComplaint';
import TrackComplaint from './components/TrackComplaint';
import Apply from './components/ApplicationForm';
import MultiStepForm from './components/MultiStepForm';
import QualificationDetails from './components/QualificationDetails';
import WorkExperience from './components/WorkExperience';
import DocumentUpload from './DocumentUpload';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin.jsx';
import RequireNoAuth from './components/RequireNoAuth.jsx';
import NavBar from './components/NavBar.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ChangePassword from './components/ChangePassword.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PersistLogin />}>
                    <Route path="/" element={<Layout />}>
                        <Route element={<RequireAuth />}>
                            <Route path="/" element={<Home />} />
                        </Route>
                        <Route element={<RequireNoAuth />}>
                            <Route
                                path="/register"
                                element={<RegistrationFrom />}
                            />
                            <Route path="/login" element={<LoginForm />} />
                        </Route>

                        <Route element={<RequireAuth />}>
                            <Route
                                path="/change_password"
                                element={<ChangePassword />}
                            />
                            <Route
                                path="/register_complaint"
                                element={<RegisterComplaint />}
                            />
                            <Route
                                path="/track_complaint"
                                element={<TrackComplaint />}
                            />
                            <Route path="/apply" element={<Apply />} />

                            <Route
                                path="/details"
                                element={<MultiStepForm />}
                            />
                        </Route>
                        <Route path="*" element={<NotFound />}></Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
