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

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<RegistrationFrom />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route
                        path="/register_complaint"
                        element={<RegisterComplaint />}
                    />
                    <Route
                        path="/track_complaint"
                        element={<TrackComplaint />}
                    />
                    <Route path="/apply" element={<Apply />} />

                    <Route path="/details" element={<MultiStepForm />} />
                    <Route path="*" element={<NotFound />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
