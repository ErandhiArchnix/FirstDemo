import React from "react";

const SignUp02 = ({ dispatch }) => {
  const handlePrevious = () => {
    dispatch({ type: "PREVIOUS_STEP" });
  };

  return (
    <div>
      {/* Your SignUp02 component JSX */}
      <button onClick={handlePrevious}>Previous</button>
    </div>
  );
};

export default SignUp02;