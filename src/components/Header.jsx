import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import profileIcon from "../assets/profile-icon.png";

const Header = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth).catch(() => navigate("/error"));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        const { uid, email, displayName, photoURL } = fbUser;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        if (location.pathname !== "/browse") navigate("/browse");
      } else {
        dispatch(removeUser());
        if (location.pathname !== "/") navigate("/");
      }
    });
    return () => unsubscribe(); // ✅ correct cleanup
  }, [auth, dispatch, navigate, location.pathname]);

  return (
    <header className="absolute top-0 inset-x-0 z-50 bg-gradient-to-b from-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <img src="/logo.svg" alt="FlicksGPT" className="h-8 sm:h-10 w-auto select-none" draggable="false" />
          {user && (
            <div className="flex items-center gap-3">
              <img
                src={user.photoURL || profileIcon}
                alt="Profile"
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover ring-2 ring-white/20 shadow"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = profileIcon;
                }}
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
