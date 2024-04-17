import { PuffLoader } from "react-spinners";
import colors from "tailwindcss/colors";
import { useDarkMode } from "../../context/DarkModeContext";

function MiniSpinner({
  size = 28,
  color = colors.indigo[700],
  darkColor = colors.gray[400],
}) {
  const { isDarkMode } = useDarkMode();
  return <PuffLoader size={size} color={isDarkMode ? darkColor : color} />;
}

export default MiniSpinner;
