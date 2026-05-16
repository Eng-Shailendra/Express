import React, { useState } from "react";
import { api } from "../Config/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [formdata, setFormdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handelChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await api.post("/register", formdata);
      console.log(resp);
      if (resp.data.success) {
        navigate("/verify-email");
        toast.success(resp.data.message);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <>
      <div className="container shadow-2x1 flex items-center justify-center h-screen">
        <div className="card flex flex-col gap-10 p-10   ">
          <div className="flex flex-row justify-between items-center ">
            <span className="font-bold text-2xl">Sign Up 🔥</span>
            <p className="font-light">Create your account</p>
          </div>
          <div className="gap-5 p-10 ">
            <label htmlFor="username">Username</label>
            <input
              className="inputfield"
              type="text"
              name="username"
              placeholder="Enter your user name"
              id="username"
              value={formdata.username}
              onChange={handelChange}
            />
            <label htmlFor="email">Email</label>
            <input
              className="inputfield"
              type="email"
              name="email"
              id="email"
              placeholder="xyz@gmail.com"
              value={formdata.email}
              onChange={handelChange}
            />
            <label htmlFor="password">Password</label>
            <input
              className="inputfield"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={formdata.password}
              onChange={handelChange}
            />
            <div className=" flex flex-row mt-10 justify-between items-center ">
              <span className="flex flex-row gap-2 items-center">
                <p className="text-amber-300">Already have an account? </p>
                <button>Log in</button>
              </span>
              <button type="button" className="btn" onClick={handleSubmit}>
                Sign Up 🚀
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignupPage;
