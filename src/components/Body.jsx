// Body.jsx
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import Browse from "./Browse";
import Login from "./Login";
import MovieInfo from "./MovieInfo";
import RequireAuth from "./RequireAuth";

export default function Body() {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        const { uid, email, displayName, photoURL } = fbUser;
        dispatch(addUser({ uid, email, displayName, photoURL }));
      } else {
        dispatch(removeUser());
      }
    });
    return unsub;
  }, [dispatch]);

  const appRouter = createBrowserRouter([
    { path: "/", element: <Login /> },
    {
      path: "/browse",
      element: (
        <RequireAuth>
          <Browse />
        </RequireAuth>
      ),
    },
    {
      path: "/browse/:movieId",
      element: (
        <RequireAuth>
          <MovieInfo />
        </RequireAuth>
      ),
    },
  ]);

  return <RouterProvider router={appRouter} />;
}
