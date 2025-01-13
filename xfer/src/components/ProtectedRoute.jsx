import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import frappe from "frappe-js-sdk";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await frappe.auth.getLoggedUser(); // Fetch the logged-in user
        if (user) {
          setIsAuthenticated(true); // User is authenticated
        } else {
          setIsAuthenticated(false); // No active session
        }
      } catch (error) {
        console.error("Authentication error:", error);
        setIsAuthenticated(false); // Handle session check failure
      } finally {
        setLoading(false); // Stop the loader once the check is complete
      }
    };

    checkSession();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // A loading spinner or placeholder
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
