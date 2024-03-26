import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Signup from "./pages/signup";
import SiteHome from "./pages/siteHome";
import SiteMap from "./pages/siteMap";
import SiteAbout from "./pages/siteAbout";
import Login from "./pages/login";
import Dashboard from "./pages/mainPage";
import EmailVerification from "./pages/emailVerification";
import OtpConfirm from "./pages/otpConfirmation";
import Find from "./pages/findPage";
import Timeline from "./pages/timelinePage";

axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <Router>
        <ToastContainer />
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<SiteHome />} />
            <Route path="/map" element={<SiteMap />} />
            <Route path="/about" element={<SiteAbout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/confirmation/:token" element={<EmailVerification />} />
            <Route path="/signup/confirmation/otp/:token" element={<OtpConfirm />} />
            <Route path="/find" element={<Find />} />
            <Route path="/timeline" element={<Timeline />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
