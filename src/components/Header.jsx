import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import profile_icon from "../../public/profile_icon.png";
import { useSelector } from "react-redux";

const Header = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  return (
    <div className="w-full px-8 py-2 bg-gradient-to-b from-black z-10 absolute flex justify-between">
      <img src="\logo.svg" alt="logo" />
      {user && (
        <div className="flex">
          <img src={user.photoURL} alt="profile_icon" className="p-4" />
          <button className="cursor-pointer text-white font-bold" onClick={handleSignOut}>
            Sign-Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
