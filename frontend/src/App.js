import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext"; // Import AuthContextProvider
import Signup from "./pages/signup";

axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <Router>
        <ToastContainer />
        <AuthContextProvider> {/* Wrap your entire application with AuthContextProvider */}
          <Routes>
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
