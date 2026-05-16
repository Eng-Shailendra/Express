import React from "react";
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import VerifiyEmail from "./pages/VerifiyEmail";
import VerifiyOTP from "./pages/VerifiyOTP";
import ProtectedRoute from "./Component/ProtectedRoute";
function App() {
  const [count, setCount] = useState(0);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/verify/:token",
      element: <Home />,
    },
    {
      path: "/verify-email",
      element: <VerifiyEmail />,
    },
    {
      path: "/verify-otp",
      element: <VerifiyOTP />,
    },
  ]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
