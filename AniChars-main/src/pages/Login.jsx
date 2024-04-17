import { motion } from "framer-motion";
import Logo from "../components/ui/Logo";
import LoginForm from "../components/login/LoginForm";
import useUser from "../hooks/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) return;
    navigate("/dashboard", { replace: true });
  }, [isLoading, isAuthenticated, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, translateX: 100 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center gap-5"
    >
      <Logo to="/home" />
      <LoginForm />
    </motion.div>
  );
}

export default Login;
