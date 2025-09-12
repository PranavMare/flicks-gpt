import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const user = useSelector((s) => s.user);
  const location = useLocation();

  if (!user) {
    // Remember where the user wanted to go
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}
