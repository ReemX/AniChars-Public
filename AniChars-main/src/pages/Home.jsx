import { motion } from "framer-motion";
import colors from "tailwindcss/colors";
import HomeHero from "../components/home/HomeHero";
import Button from "../components/ui/Button";
import MiniSpinner from "../components/ui/MiniSpinner";
import useUser from "../hooks/useUser";

function Home() {
  const { isLoading, isAuthenticated } = useUser();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HomeHero />
      <div className="absolute right-3 top-3 rounded-full bg-gray-200/30 p-4 px-3 py-1">
        {isLoading ? (
          <MiniSpinner size={25} color={colors.gray[200]} />
        ) : (
          <Button
            to={!isAuthenticated ? "/login" : "/dashboard"}
            className="font-semibold text-gray-200"
          >
            {!isAuthenticated ? "Login" : "Dashboard"}
          </Button>
        )}
      </div>
    </motion.div>
  );
}

export default Home;
