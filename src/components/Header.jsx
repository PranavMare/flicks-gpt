import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch(() => navigate("/error"));
  };

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));

        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
      //unsubscribe when component unmounts
      return () => unsubcribe();
    });
  }, []);

  return (
    <header className="absolute  top-0 inset-x-0 z-50 bg-gradient-to-b from-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <img src="/logo.svg" alt="FlicksGPT" className="h-8 sm:h-10 w-auto select-none" draggable="false" />

          {user && (
            <div className="flex items-center gap-3">
              <img
                src={user.photoURL || "/profile-icon.png"}
                onError={(e) => {
                  e.currentTarget.src = "/profile-icon.png";
                }}
                alt="Profile"
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover ring-2 ring-white/20 shadow"
                loading="lazy"
              />
              <button
                type="button"
                onClick={handleSignOut}
                className="px-3 py-1.5 rounded-md border border-white/20 bg-blue-800 text-white/90 font-semibold whitespace-nowrap hover:bg-blue-900 active:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                {"Sign\u2011Out"}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
