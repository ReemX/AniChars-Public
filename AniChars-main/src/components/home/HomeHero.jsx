import { motion } from "framer-motion";
import Logo from "../ui/Logo";

function HomeHero() {
  return (
    <motion.div className="space-y-4 text-center">
      <Logo />
      <p className="select-none text-gray-300">
        The app to rate and discusse your favorite anime characters
      </p>
    </motion.div>
  );
}

export default HomeHero;
