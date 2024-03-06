import React from "react";
import bg from '../assets/bg.png';

const ForgotPassword = () => {
  return (
    <div className="w-full justify-center items-center h-screen flex flex-row">
      <div className="hidden lg:block h-screen  w-[70%] bg-blue-900">
        <img src={bg} alt="login-bg" className="max-w-full h-full object-cover" />
      </div>
      <div className="w-[100%] xm:w-[70%] md:w-[60%] lg:w-[40%] flex flex-col justify-center items-center p-4 ">
        <div className="flex justify-center items-center">
          Logo
        </div>
        <form className="w-[90%] bg-white shadow-md rounded-md py-12 px-6 mt-8">
          <div className="w-full flex flex-col">
            <label className="text-sm text-slate-500">Email</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="mt-2 border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-600 placeholder:text-sm"
            />
            <span className="text-sm text-red-700">Error Message</span>
          </div>
          <input
            type="submit"
            value="Reset Password"
            className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-8"
          />
          <div className="flex justify-center mt-4">
            <span className="text-sm text-slate-500">
              <a href="/" className="text-blue-500">
                Login
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
