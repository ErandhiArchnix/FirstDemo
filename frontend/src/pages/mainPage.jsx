import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Main() {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState("");
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:8000/api/auth/").then((res) => {
      if (res.data.Status === "Success") {
        setAuth(true);
        setRole(res.data.user_type);
        console.log(res.data.Status);
      } else {
        setAuth(false);
        console.log(res.data.Error);
      }
    });
  });

  const handleLogout = () => {
    axios
      .get("http://localhost:8000/api/auth/logout")
      .then((res) => {
        dispatch({ type: "LOGOUT" });
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
        </div>
      ) : (
        toast.error("Access Denied. Please Login") && navigate("/login")
      )}
    </div>
  );
}

export default Main; // Updated component name to start with an uppercase letter
