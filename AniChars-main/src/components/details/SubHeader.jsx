import { cn } from "../../utils/helpers";

function SubHeader({ children, extraClass = "text-center mb-4" }) {
  return (
    <h3
      className={cn(
        "font-nova-square text-xl font-bold dark:text-gray-400",
        extraClass,
      )}
    >
      {children}
    </h3>
  );
}

export default SubHeader;
