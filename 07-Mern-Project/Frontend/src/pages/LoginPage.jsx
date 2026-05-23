import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../Config/axiosInstance";
import { getUser } from "../Context/UserContext";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [logindata, setLogindata] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  let { setUser } = getUser();

  const handlechanges = (e) => {
    let { name, value } = e.target;
    setLogindata({ ...logindata, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    try {
      const resp = await api.post("/login", logindata);
      // console.log(resp.data);
      let userData = {
        ...resp.data.user,
        accessToken: resp.data.accessToken,
        refereshToken: resp.data.refereshToken,
      };
      setUser(userData);
      localStorage.setItem("userData", JSON.stringify(userData));

      if (resp.data.success) {
        navigate("/");
        toast.success(resp.data.message);
      }
      sessionStorage.setItem("username", resp.data.user.name);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <>
      <div className="h-screen bg-gradient-to from-slate-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border-t-6 border-t-blue-500">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Login 🔥</h1>

              <Link
                to="/forgot-password"
                className="text-blue-500 hover:underline text-sm"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Form */}
            <div className="flex flex-col space-y-4">
              <div>
                <label htmlFor="email" className="font-medium block mb-2">
                  Email
                </label>

                <input
                  className="inputfield"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="abc..@gmail.com"
                  value={logindata.email}
                  onChange={handlechanges}
                />
              </div>

              <div>
                <label htmlFor="password" className="font-medium block mb-2">
                  Password
                </label>

                <input
                  className="inputfield"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={logindata.password}
                  onChange={handlechanges}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <span className="flex gap-2 items-center text-sm">
                <p className="text-gray-600">Don't have an account?</p>

                <Link to="/signup" className="text-blue-500 hover:underline">
                  Signup
                </Link>
              </span>

              <button className="btn cursor-pointer" onClick={handleLogin}>
                Log In 🚀
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
