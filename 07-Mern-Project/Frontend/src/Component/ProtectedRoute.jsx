import React from "react";
import { getUser } from "../Context/UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = getUser();

  return user ? children : <Navigate to={"/login"}></Navigate>;
};

export default ProtectedRoute;
