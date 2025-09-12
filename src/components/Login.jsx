import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSignInForm = () => setIsSignInForm(!isSignInForm);

  const handleButtonClick = async () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    const from = location.state?.from?.pathname ?? "/browse";

    try {
      if (!isSignInForm) {
        // Sign-up
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value,
        );
        await updateProfile(user, {
          displayName: name.current.value,
          photoURL: "/profile-icon.png",
        });
        const { uid, email: em, displayName, photoURL } = auth.currentUser;
        dispatch(addUser({ uid, email: em, displayName, photoURL }));
        navigate(from, { replace: true });
      } else {
        // Sign-in
        const { user } = await signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value,
        );
        const {
          uid,
          email: em,
          displayName,
          photoURL,
        } = user ?? auth.currentUser ?? {};
        if (uid) {
          dispatch(addUser({ uid, email: em, displayName, photoURL }));
        }
        navigate(from, { replace: true });
      }
    } catch (error) {
      setErrorMessage(
        `${error.code ?? ""} ${error.message ?? "Authentication failed"}`.trim(),
      );
    }
  };

  return (
    <div className="min-h-[100svh] bg-black text-white">
      <Header />
      <div className="relative flex min-h-[calc(100svh-64px)] items-center justify-center overflow-hidden md:min-h-[calc(100vh-64px)]">
        <img
          src="/background.jpeg"
          alt=""
          aria-hidden="true"
          draggable="false"
          loading="lazy"
          className="pointer-events-none absolute inset-0 h-full w-full object-contain object-center select-none md:object-cover md:object-[center_18%]"
        />

        <div className="absolute inset-0 -z-10 bg-black/50 md:bg-black/40" />

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-black/70 px-6 py-8 shadow-xl backdrop-blur sm:px-8 sm:py-10"
        >
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {isSignInForm ? "Sign In" : "Create your account"}
          </h1>

          {errorMessage ? (
            <div
              role="alert"
              aria-live="polite"
              className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
            >
              {errorMessage}
            </div>
          ) : null}

          {!isSignInForm && (
            <div className="mt-6">
              <label
                htmlFor="fullName"
                className="block text-sm text-slate-200"
              >
                Full Name
              </label>
              <input
                id="fullName"
                ref={name}
                type="text"
                placeholder="Jane Doe"
                autoComplete="name"
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 placeholder-white/60 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 placeholder-white/60 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
              placeholder="••••••••"
              autoComplete={isSignInForm ? "current-password" : "new-password"}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 placeholder-white/60 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            onClick={handleButtonClick}
            className="mt-8 w-full cursor-pointer rounded-xl bg-blue-600 px-4 py-3 font-medium transition hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black focus:outline-none active:bg-blue-600"
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p className="mt-6 text-sm text-slate-300">
            {isSignInForm ? "New to FlicksGPT?" : "Already registered?"}{" "}
            <button
              type="button"
              onClick={toggleSignInForm}
              className="cursor-pointer font-semibold text-white underline-offset-4 hover:underline"
            >
              {isSignInForm ? "Create an account" : "Sign in"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
