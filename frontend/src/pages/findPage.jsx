import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import GuideDashboard from "../components/GuideDashboard";
import TravelerFindComponent from "../components/TravelerFindComponent";
import Navbar from "../components/NavBar";
import Sidebar from "../components/SideBar";
import LocationUpdateButton from "../components/LocationUpdateButton";
import { Container } from "../styles/pageStyles/MainPageStyles";

function Main() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState("");
  axios.defaults.withCredentials = true;
  const [query, setQuery] = useState("Find");
  const [id, setId] = useState("");

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
          setId(res.data.user_id);
          console.log(res.data.Status);
          console.log(res.data.user_id);
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

  return (
    <div>
      {auth ? (
        <div>
          <Sidebar setQuery={setQuery} />
          {console.log(query)}
          <Navbar query={query} role={role} id={id} />
          <Container>
            {/* <h1>Find Page</h1> */}
            {/* <button onClick={handleLogout}>Logout</button> */}
            {role === "traveler" && <TravelerFindComponent />}
            {role === "guide" && <GuideDashboard />}
          </Container>
          <LocationUpdateButton id={id}/>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Main; // Updated component name to start with an uppercase letter
