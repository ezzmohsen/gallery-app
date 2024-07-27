import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const RequireAuth = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorizedUser, setIsAuthorizedUser] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setIsLoading(false);
        setError("No auth token found");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/verify",
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { role } = response.data.decoded;

        if (role === "user") {
          setIsAuthorizedUser(true);
        } else {
          setError("Access Denied");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setError("Error verifying token");
      }

      setIsLoading(false);
    };

    verifyToken();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Navigate to="/login" />;
  }

  return isAuthorizedUser ? (
    <Navigate to="store/register" />
  ) : (
    <Navigate to="store/login" />
  );
};

export default RequireAuth;
