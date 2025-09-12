import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import profileIcon from "../assets/profile-icon.png";
import { toggleGptSearchView } from "./../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/", { replace: true });
    } catch {
      navigate("/error");
    }
  };

  const handleGPTSerachClick = () => {
    dispatch(toggleGptSearchView());
    navigate("/browse");
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-gradient-to-b from-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between sm:h-16">
          <img
            src="/logo.svg"
            alt="FlicksGPT"
            className="h-8 w-auto select-none sm:h-10"
            draggable="false"
          />

          {user && (
            <div className="flex items-center gap-3">
              {showGPTSearch && (
                <select
                  onChange={handleLanguageChange}
                  className="rounded-md border border-white/20 px-3 py-1.5 font-semibold whitespace-nowrap text-white focus:ring-2 focus:ring-white/40 focus:outline-none active:bg-white/20"
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option
                      key={lang.identifier}
                      value={lang.identifier}
                      className="text-black active:bg-white/20"
                    >
                      {lang.name}
                    </option>
                  ))}
                </select>
              )}

              <img
                src={user.photoURL || profileIcon}
                alt="Profile"
                className="h-9 w-9 rounded-full object-cover shadow ring-2 ring-white/20 sm:h-10 sm:w-10"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = profileIcon;
                }}
              />

              <button
                key={showGPTSearch ? "home" : "gpt"}
                type="button"
                onClick={handleGPTSerachClick}
                className={`rounded-md border border-white/20 bg-blue-800 px-3 py-1.5 font-semibold whitespace-nowrap text-white/90 hover:bg-blue-900 focus:ring-2 focus:ring-white/40 focus:outline-none active:bg-white/20 ${
                  !showGPTSearch ? "motion-safe:animate-bounce" : ""
                }`}
              >
                {showGPTSearch ? "Home" : "GPT Search"}
              </button>

              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-md border border-white/20 bg-blue-800 px-3 py-1.5 font-semibold whitespace-nowrap text-white/90 hover:bg-blue-900 focus:ring-2 focus:ring-white/40 focus:outline-none active:bg-white/20"
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
