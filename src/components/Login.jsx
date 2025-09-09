import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();

  const toggleSignInForm = () => setIsSignInForm(!isSignInForm);

  const handleButtonClick = () => {
    // Validate the form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    // Sign-up
    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "/profile-icon.png",
          })
            .then(() => {
              const { uid, email: em, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email: em, displayName, photoURL }));
            })
            .catch((error) => setErrorMessage(error.message));
        })
        .catch((error) => setErrorMessage(`${error.code} ${error.message}`));
    } else {
      // Sign-in
      signInWithEmailAndPassword(auth, email.current.value, password.current.value).catch((error) => setErrorMessage(`${error.code} ${error.message}`));
    }
  };

  return (
    <div className="min-h-[100svh] bg-black text-white">
      <Header />
      <div className="relative flex min-h-[calc(100svh-64px)] md:min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden">
        <img
          src="/background.jpeg"
          alt=""
          aria-hidden="true"
          draggable="false"
          loading="lazy"
          className="
            absolute inset-0 h-full w-full object-contain md:object-cover object-center md:object-[center_18%] pointer-events-none select-none"
        />

        <div className="absolute inset-0 -z-10 bg-black/50 md:bg-black/40" />

        <form
          onSubmit={(e) => e.preventDefault()}
          className="
            w-full max-w-md mx-auto rounded-2xl border border-white/10 bg-black/70 backdrop-blur shadow-xl px-6 py-8 sm:px-8 sm:py-10"
        >
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{isSignInForm ? "Sign In" : "Create your account"}</h1>

          {errorMessage ? (
            <div role="alert" aria-live="polite" className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-200 text-sm">
              {errorMessage}
            </div>
          ) : null}

          {!isSignInForm && (
            <div className="mt-6">
              <label htmlFor="fullName" className="block text-sm text-slate-200">
                Full Name
              </label>
              <input
                id="fullName"
                ref={name}
                type="text"
                placeholder="Jane Doe"
                autoComplete="name"
                className="
                  mt-1 w-full rounded-xl
                  bg-white/10 placeholder-white/60
                  border border-white/10
                  px-4 py-3
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          <div className="mt-6">
            <label htmlFor="email" className="block text-sm text-slate-200">
              Email address
            </label>
            <input
              id="email"
              ref={email}
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className="
                mt-1 w-full rounded-xl
                bg-white/10 placeholder-white/60
                border border-white/10
                px-4 py-3
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="mt-6">
            <label htmlFor="password" className="block text-sm text-slate-200">
              Password
            </label>
            <input
              id="password"
              ref={password}
              type="password"
              placeholder="   ••••••••"
              autoComplete={isSignInForm ? "current-password" : "new-password"}
              className="
                mt-1 w-full rounded-xl bg-white/10 placeholder-white/60 border border-white/10px-4 py-3
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            onClick={handleButtonClick}
            className=" mt-8 w-full rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-600 px-4 py-3 font-medium transition
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-black cursor-pointer"
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p className="mt-6 text-sm text-slate-300">
            {isSignInForm ? "New to FlicksGPT?" : "Already registered?"}{" "}
            <button type="button" onClick={toggleSignInForm} className="font-semibold text-white hover:underline underline-offset-4 cursor-pointer">
              {isSignInForm ? "Create an account" : "Sign in"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
