import { useEffect, useState } from "react";

function ToggleButton({
  initialValue = false,
  bg_on_color = "bg-white",
  bg_off_color = "bg-indigo-200",
  border_color = "border-indigo-700",
  slider_color = "after:bg-indigo-800",
  gap = "gap-2",
  label_1 = "Characters",
  label_2 = "Series",
  lables = "both",
  lables_style = "text-black",
  container_Style = "",
  setFn = () => {},
}) {
  const [toggle, setToggle] = useState(initialValue);

  useEffect(() => {
    setFn(toggle);
  }, [toggle, setFn]);

  const toggleCss = toggle
    ? `after:translate-x-[1px] ${bg_on_color}`
    : `after:translate-x-[13px] ${bg_off_color}`;

  const baseStyle = `h-5 w-8 cursor-pointer appearance-none rounded-full border ${border_color} transition-colors dark:border-blue-900 dark:after:bg-blue-800 after:absolute after:h-4 after:w-4 after:translate-y-[1px] after:rounded-full after:transition-all ${slider_color} `;

  return (
    <div className={"flex items-center " + `${gap} ` + container_Style}>
      {lables === "left" ||
        (lables === "both" && (
          <p className={"dark:text-gray-300 " + lables_style}>{label_1}</p>
        ))}
      <input
        type="checkbox"
        className={baseStyle + toggleCss}
        checked={toggle}
        onChange={() => setToggle((c) => !c)}
      />
      {lables === "right" ||
        (lables === "both" && (
          <p className={"dark:text-gray-300 " + lables_style}>{label_2}</p>
        ))}
    </div>
  );
}

export default ToggleButton;
