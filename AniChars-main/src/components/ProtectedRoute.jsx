import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import FullSpinner from "./ui/FullSpinner";

function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/home");
      toast.error("Please first login in order to use the website!");
    }
  }, [isAuthenticated, navigate, isLoading]);

  if (isLoading)
    return (
      <div className="absolute inset-0 bg-gray-200 dark:bg-gray-900">
        <FullSpinner size="xl" />
      </div>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
