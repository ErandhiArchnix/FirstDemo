import React, {useEffect} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function EmailVerification() {
    const navigate = useNavigate();
    const token = window.location.pathname.split("/").pop();

    useEffect(() => {
        axios.put(`http://localhost:8000/api/auth/confirmation/${token}`).then((res) => {
          if (res.data.Status === "User Confirmed. Please Login") {
            console.log(res.data.Status);
            toast.success(res.data.Status);
            navigate("/login")
            return;
          } else {
            console.log(res.data.error);
            toast.error(res.data.error);
            
          }
        });
      });
  
  return <div></div>;
}

export default EmailVerification;
