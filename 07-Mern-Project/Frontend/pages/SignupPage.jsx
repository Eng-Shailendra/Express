import React from "react";
const SignupPage = () => {
  return (
    <>
      <div className="container flex items-center justify-center h-screen">
        <div className="card flex flex-col gap-10 p-10   ">
          <div className="flex flex-row justify-between items-center ">
            <span className="font-bold">Sign Up 🔥</span>
            <p className="font-light">Create your account</p>
          </div>

          <form action="" className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              className="inputfield"
              type="text"
              name="username"
              placeholder="Enter your user name"
              id="username"
            />
            <label htmlFor="email">Email</label>
            <input
              className="inputfield"
              type="email"
              name="email"
              id="email"
              placeholder="xyz@gmail.com"
            />
            <label htmlFor="password">Password</label>
            <input
              className="inputfield"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
            />
          </form>

          <div className=" flex flex-row justify-between items-center ">
            <span className="flex flex-row gap-2 items-center">
              <p className="text-amber-300">Already have an account? </p>
              <button>Log in</button>
            </span>
            <button className="btn ">Sign Up 🚀</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignupPage;
