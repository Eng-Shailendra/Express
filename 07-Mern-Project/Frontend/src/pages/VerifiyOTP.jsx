import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { api } from "../Config/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const VerifiyOTP = () => {
  const [otp, setOtp] = useState(null);
  const { email } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      let res = await api.post(`/verify-otp/${email}`, { otp });
      toast(res.data.message);
      setTimeout(() => {
        navigate(`/change-password/${email}`);
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const handleResendOtp = async () => {
    try {
      const resp = await api.post("/forgot-password", { email });
      toast.success("OTP send successfully ");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Decorative top bar */}
          <div className="h-2 bg-linear-to-r from-blue-500 to-indigo-500"></div>

          <div className="p-8 ">
            {/* Title */}
            <div className="text-center mb-8 flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-800">Verify otp</h2>
              <p
                onClick={handleResendOtp}
                className="cursor-pointer in-hover:active:-bg-linear-270 hover:text-blue-500 hover:underline text-gray-500"
              >
                Resend otp
              </p>
            </div>

            {/* Form fields */}
            <div className="space-y-5 ">
              <div className="flex justify-center">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => (
                    <input
                      {...props}
                      className="w-8! h-10 border border-gray-500 rounded text-center mx-2"
                    />
                  )}
                />
              </div>

              {/* Login button (no functionality) */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white font-medium py-2.5 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200 transition cursor-pointer"
              >
                Verify & Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifiyOTP;
