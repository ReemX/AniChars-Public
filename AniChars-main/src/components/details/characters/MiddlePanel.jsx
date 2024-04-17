import { useEffect, useRef, useState } from "react";
import Header from "../Header";
import Paragraph from "../Paragraph";
import SubHeader from "../SubHeader";
import Button from "../../ui/Button";
import { cn } from "../../../utils/helpers";

function MiddlePanel({ data, id }) {
  const [showCollapsable, setShowCollapsable] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const collapsable = useRef(null);
  const height = collapsable?.current?.scrollHeight;

  useEffect(() => {
    if (height < 358) {
      setShowCollapsable(false);
    } else {
      setShowCollapsable(true);
    }
  }, [id, height]);

  return (
    <div className="border-x-2 px-4 dark:border-gray-700">
      <Header>{data.name}</Header>
      <SubHeader extraClass="text-left mb-4">About</SubHeader>
      <div
        ref={collapsable}
        className="relative overflow-hidden rounded-b-lg pb-1 transition-all duration-500"
        style={{ maxHeight: isCollapsed ? "22.5rem" : `${height}px` }}
      >
        {showCollapsable && (
          <>
            <div
              className={cn(
                "absolute bottom-0 h-full max-h-60 w-full rounded-b-lg bg-gradient-to-t from-gray-800 to-transparent transition-all duration-500 dark:from-gray-950",
                { "max-h-0": !isCollapsed },
              )}
            ></div>
            <Button
              className={cn(
                "absolute bottom-2 right-1/2 translate-x-1/2 translate-y-3 font-nova-square text-2xl text-gray-500 transition-all hover:scale-105",
                {
                  "text-indigo-600 dark:text-blue-700": isCollapsed,
                },
              )}
              onClick={() => setIsCollapsed((p) => !p)}
            >
              {isCollapsed ? "Show More" : "Show Less"}
            </Button>
          </>
        )}
        <Paragraph>
          {data.about ?? "There is no information about this character."}
        </Paragraph>
      </div>
    </div>
  );
}

export default MiddlePanel;
