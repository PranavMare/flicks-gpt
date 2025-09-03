import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    //Validate the form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    //sign-up
    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Sign up
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "/profile-icon.png",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    }
  };
  return (
    <div>
      <Header />
      <img src="\background.jpeg" alt="backgrond image" className="absolute" />

      <div>
        <form className="w-full md:w-3/12 absolute p-12 bg-black/80 my-36 mx-auto right-0 left-0 text-white rounded-3xl" onSubmit={(e) => e.preventDefault()}>
          <h1 className="text-3xl font-bold py-4 ">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
          {!isSignInForm && <input ref={name} type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-700 rounded-sm" />}
          <input ref={email} type="text" placeholder="Email address" className="p-4 my-4 w-full bg-gray-700 rounded-sm" />
          <input ref={password} type="password" placeholder="Password" className="p-4 my-4 w-full bg-gray-700 rounded-sm" />
          <p className="text-red-500 font-semibold text-lg py-2">{errorMessage}</p>
          <button className="p-4 my-6 bg-blue-500 w-full rounded-sm cursor-pointer" onClick={handleButtonClick}>
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm ? "New to FlicksGPT? Sign Up now!" : "Already Registered? Sign In!"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
