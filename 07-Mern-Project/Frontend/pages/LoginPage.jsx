import React from "react";
import FlashMassage from "../Component/FlashMassage";

const LoginPage = () => {
  return (
    <>
      <FlashMassage />
      <div className="container flex items-center justify-center  h-screen">
        <div className="shadow-md flex flex-col justify-between gap-10 p-10 rounded-md">
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
              <button>Log in</button>
            </span>
            <button className="btn ">Log In 🚀</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
