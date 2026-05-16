import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../Config/axiosInstance";

export const Verify = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying...");
  const [type, setType] = useState("loading"); //loading | success | error
  const navigate = useNavigate();

  const verifyEmail = async () => {
    try {
      const resp = await api.post(
        "/verify",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (resp.data.success) {
        setStatus("Email verified successfully");
        setType("success");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setStatus("Invalid or Expired Token");
        setType("error");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
      setStatus(err.response?.data?.message || "Something went wrong");
      setType("error");
    }
  };
  useEffect(() => {
    verifyEmail();
  }, []);
  return (
    <div className="container flex items-center justify-center h-screen">
      <div className="card flex flex-col gap-10 p-10   ">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {type === "loading" && "Verifying..."}
          {type === "success" && "Success"}
          {type === "error" && "Error"}
        </h2>

        <p className="text-gray-600 mb-6"></p>

        {type === "loading" && (
          <div className="flex justify-center">
            <div className="h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {type === "error" && (
          <button
            onClick={verifyEmail}
            className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-700"
          >
            Try again
          </button>
        )}

        <p className="text-sm text-gray-400 mt-6">
          Redirecting automatically after verification
        </p>
      </div>
    </div>
  );
};
export default Verify;
