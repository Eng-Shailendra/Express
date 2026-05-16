import React from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container flex items-center justify-center  h-screen">
        <div className=" shadow-2xl flex flex-col justify-between gap-10 p-10 rounded-md">
          {/* Header */}
          <div className="flex justify-between items-center gap-30 ">
            <h1 className="text-3xl  font-bold">Login 🔥 </h1>
            <a href="#" className="text-blue-500  hover:underline">
              Forgot Password?
            </a>
          </div>
          {/* form */}
          <form action="" className="flex flex-col ">
            <label htmlFor="email" className="font-mono mb-2 ">
              Email
            </label>
            <input
              className="inputfield"
              type="email"
              name="email"
              id="email"
              placeholder="XYZ@gmail.com"
            />
            <label htmlFor="password" className="font-mono mb-2 mt-5">
              Password
            </label>
            <input
              className="inputfield"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
            />
          </form>
          {/* footer */}
          <div className=" flex flex-row justify-between items-center  gap-20 ">
            <span className="flex flex-row gap-2 items-center">
              <p className="text-amber-300">Don't have an account? </p>
              <Link
                to="/signup"
                className=" text-blue-500 hover:underline cursor-pointer"
              >
                Signup
              </Link>
            </span>
            <button className="btn cursor-pointer">Log In 🚀</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
