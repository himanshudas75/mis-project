import "./App.css";
import RegistrationFrom from "./components/RegistrationFrom";
import Home from "./components/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import NotFound from "./components/NotFound";
import RegisterComplaint from "./components/RegisterComplaint";
import TrackComplaint from "./components/TrackComplaint";
import Apply from "./components/ApplicationForm";
import MultiStepForm from "./components/MultiStepForm";
import QualificationDetails from "./components/QualificationDetails";
import WorkExperience from "./components/WorkExperience";
import DocumentUpload from "./DocumentUpload";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/mba_admission/home" element={<Home />} />
        <Route path="/mba_admission/register" element={<RegistrationFrom />} />
        <Route path="/mba_admission/login" element={<LoginForm />} />
        <Route
          path="/mba_admission/register_complaint"
          element={<RegisterComplaint />}
        />
        <Route
          path="/mba_admission/track_complaint"
          element={<TrackComplaint />}
        />
        <Route path="/mba_admission/apply" element={<Apply />} />

        <Route path="/mba_admission/details" element={<MultiStepForm />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
