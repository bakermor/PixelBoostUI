import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { Loading } from "../Loading";

const ProtectedRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Loading />;
  else {
    if (user === undefined) return <Navigate to="/login" />;
    return <Outlet />;
  }
};

export default ProtectedRoute;
