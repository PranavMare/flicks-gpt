import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <img src="\background.jpeg" alt="backgrond image" className="absolute" />

      <div>
        <form className="w-full md:w-3/12 absolute p-12 bg-black/80 my-36 mx-auto right-0 left-0 text-white rounded-lg">
          <h1 className="text-3xl font-bold py-4 ">{isSignInForm ? "Sign Up" : "Sign In"}</h1>
          {!isSignInForm && <input type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-700 rounded-sm" />}
          <input type="text" placeholder="Email address" className="p-4 my-4 w-full bg-gray-700 rounded-sm" />
          <input type="password" placeholder="Password" className="p-4 my-4 w-full bg-gray-700 rounded-sm" />
          <button className="p-4 my-6 bg-blue-500 w-full rounded-sm cursor-pointer">{isSignInForm ? "Sign up" : "Sign In"}</button>
          <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm ? "Already Registered? Sign In" : " New to FlicksGPT? Sign Up"} now
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
