import { cn } from "../../utils/helpers";

function ElementHeader({ children, className }) {
  return (
    <header
      className={cn(
        "rounded-t-md bg-indigo-700 text-center font-nova-square text-2xl uppercase text-white dark:bg-blue-900 dark:text-gray-400",
        className,
      )}
    >
      {children}
    </header>
  );
}

export default ElementHeader;
