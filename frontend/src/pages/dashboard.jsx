import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {useNavigate } from "react-router-dom";

function Dashboard() { // Renamed to start with an uppercase letter
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <div>
            <h1>Dashboard</h1> {/* Updated component name to start with an uppercase letter */}
            <button
                onClick={() => {
                    dispatch({ type: "LOGOUT" });
                    navigate("/")
                }}
            >
                Logout
            </button>
        </div>
    );
}

export default Dashboard; // Updated component name to start with an uppercase letter
