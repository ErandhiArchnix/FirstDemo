import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

function RoleSelection() {
  const { dispatch } = useContext(AuthContext);
  const [selectedRole, setSelectedRole] = useState(null);

  // Function to handle button click for selecting a role
  const handleRoleSelection = (role) => {
    // Check if the selected role is already the same as the clicked button
    if (selectedRole === role) {
      // If the clicked button is already selected, deselect it
      localStorage.removeItem("selectedRole");
      setSelectedRole(null);
      dispatch({ type: "UPDATE_SELECTED_ROLE", payload: null });
    } else {
      // Generate value based on the selected role and save it to local storage
      localStorage.setItem("selectedRole", role);
      setSelectedRole(role);
      dispatch({ type: "UPDATE_SELECTED_ROLE", payload: role });
      // dispatch({ type: "NEXT_STEP" });
    }
  };

  useEffect(() => {
    // Check local storage for previously selected role
    const storedRole = localStorage.getItem("selectedRole");
    if (storedRole) {
      // If a role is stored, update the state with the selected role
      setSelectedRole(storedRole);
      dispatch({ type: "UPDATE_SELECTED_ROLE", payload: storedRole });
      // dispatch({ type: "NEXT_STEP" });
    }
  }, [dispatch]);

  const handleNext = () => {
    dispatch({ type: "NEXT_STEP" });
  }

  return (
    <div>
      <h2>Choose Your Role</h2>
      <button
        onClick={() => handleRoleSelection("traveler")}
        disabled={selectedRole === "traveler"}
        style={{
          backgroundColor: selectedRole === "traveler" ? "gray" : "white",
        }}
      >
        Traveler
      </button>
      <button
        onClick={() => handleRoleSelection("guide")}
        disabled={selectedRole === "guide"}
        style={{
          backgroundColor: selectedRole === "guide" ? "gray" : "white",
        }}
      >
        Guide
      </button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default RoleSelection;
