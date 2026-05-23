import { use, useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { api } from "../Config/axiosInstance";
import { data, Navigate, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState({
    newpassword: "",
    confirmpassword: "",
  });
  const { email } = useParams();
  const naviget = useNavigate();

  const handleChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    let resp = await api.post(`/confirm-password/${email}`, password);
    if (resp.data.success) {
      naviget("/login");
    }
    toast(resp.data.message);
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Decorative top bar */}
          <div className="h-2 bg-linear-to-r from-blue-500 to-indigo-500"></div>

          <div className="p-8">
            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                Change password
              </h2>
            </div>

            {/* Form fields */}
            <div className="space-y-5">
              {/* new password */}
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  New password
                </label>
                <input
                  type="txt"
                  id="newPassword"
                  name="newpassword"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Enter new password "
                  value={password.newpassword}
                  onChange={handleChange}
                />
              </div>
              {/* conform password */}
              <div>
                <label
                  htmlFor="conformPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm password
                </label>
                <div className="flex  items-center  border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 overflow-hidden   ">
                  <input
                    type={show ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmpassword"
                    className="w-full px-4 py-2 outline-none"
                    placeholder="Enter confirm password"
                    value={password.confirmpassword}
                    onChange={handleChange}
                  />
                  <button>
                    {show ? (
                      <LuEye
                        className=" mx-3 text-xl cursor-pointer"
                        onClick={(e) => setShow(!show)}
                      />
                    ) : (
                      <LuEyeClosed
                        className=" mx-3 text-xl cursor-pointer"
                        onClick={(e) => setShow(!show)}
                      />
                    )}
                  </button>
                </div>
              </div>

              {/* Login button (no functionality) */}
              <button
                type="button"
                className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white font-medium py-2.5 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200 transition cursor-pointer"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ChangePassword;
