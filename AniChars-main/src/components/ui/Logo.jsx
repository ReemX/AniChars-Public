import { cn } from "../../utils/helpers";
import Button from "./Button";

function Logo({ type, to }) {
  return (
    <Button
      className={cn(
        "cursor-pointer select-none font-nova-square text-6xl font-[400] text-gray-200 transition-transform hover:scale-105 dark:text-gray-400",
        {
          "text-xl": type === "small",
        },
      )}
      to={to}
    >
      AniChars
    </Button>
  );
}

export default Logo;
