import { GridLoader } from "react-spinners";
import colors from "tailwindcss/colors";
import { useDarkMode } from "../../context/DarkModeContext";
import { cn } from "../../utils/helpers";

function FullSpinner({ size = "base", blur = true }) {
  const { isDarkMode } = useDarkMode();
  const sizes = {
    xs: 10,
    sm: 15,
    base: 20,
    lg: 25,
    xl: 30,
  };

  return (
    <div
      className={cn("absolute inset-0 flex items-center justify-center", {
        "backdrop-blur-md": blur,
      })}
    >
      <GridLoader
        color={isDarkMode ? colors.blue[700] : colors.indigo[700]}
        size={sizes[size]}
      />
    </div>
  );
}

export default FullSpinner;
