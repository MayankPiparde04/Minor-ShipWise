import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ActivateAccount = ({ setToken }) => {
  const navigate = useNavigate();
  const { token } = useParams(); // Get token from URL params
  const [activationStatus, setActivationStatus] = useState(null);

  useEffect(() => {
    if (token) {
      // Send activation request to the server
      axios
        .post(`http://localhost:5000/api/activation`, { token })
        .then((response) => {
          console.log(response.data.message);
          setActivationStatus("success");
          setToken(token); // Store token for authenticated actions
          navigate("/dashboard/home"); // Redirect to dashboard after activation
        })
        .catch((error) => {
          console.error(error.response.data.errors);
          setActivationStatus("error");
        });
    }
  }, [token, navigate, setToken]);

  return (
    <div className="text-center">
      <h1>Activating Your Account...</h1>
    </div>
  );
};

export default ActivateAccount;

