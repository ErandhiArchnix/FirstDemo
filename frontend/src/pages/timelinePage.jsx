import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import GuideDashboard from "../components/GuideDashboard";
import TravelerDashboard from "../components/TravelerDashboard";
import Navbar from "../components/NavBar";
import Sidebar from "../components/SideBar";
import { Container } from "../styles/pageStyles/MainPageStyles";

function Timeline() {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState("");
  axios.defaults.withCredentials = true;
  const [query, setQuery] = useState("Timeline");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/api/auth/", {
        headers: { Authorization: token },
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setRole(res.data.user_type);
          console.log(res.data.Status);
          console.log(role);
          return;
        } else {
          setAuth(false);
          console.log(res.data.Error);
          toast.error("Access Denied. Please Login");
          navigate("/login");
        }
      });
  });

  const handleLogout = () => {
    axios
      .get("http://localhost:8000/api/auth/logout")
      .then((res) => {
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("token");
        navigate("/");
        toast.success(res.data.message);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {auth ? (
        <div>
          <Sidebar setQuery={setQuery} />
          {console.log(query)}
          <Navbar query={query} />
          <Container>
            <h1>Timeline</h1>
            {/* <button onClick={handleLogout}>Logout</button> */}
            {role === "traveler" && <TravelerDashboard />}
            {role === "guide" && <GuideDashboard />}
          </Container>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Timeline; // Updated component name to start with an uppercase letter
