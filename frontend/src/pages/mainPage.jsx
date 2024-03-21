import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import GuideDashboard from "../components/GuideDashboard";
import TravelerDashboard from "../components/TravelerDashboard";

function Main() {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState("");
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get("http://localhost:8000/api/auth/", { headers: { Authorization: token } }).then((res) => {
      if (res.data.Status === "Success") {
        setAuth(true);
        setRole(res.data.user_type);
        console.log(res.data.Status);
        console.log(role);
        return;
      } else {
        setAuth(false);
        console.log(res.data.Error);
        toast.error("Access Denied. Please Login")
        navigate("/login")
      }
    });
  });

  const handleLogout = () => {
    axios
      .get("http://localhost:8000/api/auth/logout")
      .then((res) => {
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem('token');
        navigate("/");
        toast.success(res.data.message);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {auth ? (
        <div>
          <h1>Dashboard</h1>
          <button onClick={handleLogout}>Logout</button>
          {role === "traveler" && <TravelerDashboard/>}
          {role === "guide" && <GuideDashboard/>}
        </div>
      ) : (
        <div>
        
        </div>
      )}
    </div>
  );
}

export default Main; // Updated component name to start with an uppercase letter
