import { cn } from "@/utils/functions";
import { useEffect, useRef, useState } from "react";

export default function Tabs({ children, className }) {
  children = Array.isArray(children) ? children : [children];
  const [activeTab, setActiveTab] = useState(
    children[0]?.props?.myKey || children[0]?.props?.label,
  );
  const [parentBackgroundColor, setParentBackgroundColor] = useState("white");
  const tabsRef = useRef(null);
  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  useEffect(() => {
    const tabsElement = tabsRef.current;
    if (tabsElement) {
      let parent = tabsElement.parentNode;
      while (parent) {
        const computedStyle = window.getComputedStyle(parent);
        const backgroundColor =
          computedStyle.getPropertyValue("background-color");
        if (backgroundColor && backgroundColor !== "rgba(0, 0, 0, 0)") {
          setParentBackgroundColor(backgroundColor);
          break;
        }
        parent = parent.parentNode;
      }
    }
  }, []);

  return (
    <div className={cn("", { [className]: className })} ref={tabsRef}>
      <div className="ml-4 flex justify-between">
        <ul className="flex-grow flex gap-4">
          {children.map((tab) => (
            <li
              key={tab.props.label}
              className={cn(
                `py-2 relative px-4 text-sm border text-center rounded-t-md font-semibold text-gray-500 hover:text-blue-500 border-b-transparent cursor-pointer`,
                {
                  "text-blue-500":
                    activeTab === (tab.props.myKey || tab.props.label),
                },
              )}
              onClick={(e) =>
                handleClick(e, tab.props.myKey || tab.props.label)
              }
            >
              {tab.props.label}
              {activeTab === (tab.props.myKey || tab.props.label) && (
                <div
                  className="absolute -bottom-[3px] left-0 w-full h-1"
                  style={{ backgroundColor: parentBackgroundColor }}
                ></div>
              )}
            </li>
          ))}
        </ul>
        {children.map((one, index) => {
          if (
            (one.props.myKey || one.props.label) === activeTab &&
            one.props.action
          )
            return <div key={one.props.label + index}>{one.props.action}</div>;
          else return null;
        })}
      </div>
      <div className="border-t">
        {children.map((one, index) => {
          if ((one.props.myKey || one.props.label) === activeTab)
            return (
              <div key={one.props.label + index}>{one.props.children}</div>
            );
          else return null;
        })}
      </div>
    </div>
  );
}

export const Tab = ({ children, label }) => {
  if (!label) {
    throw new Error("Tab component must have a label prop");
  }
  return <>{children}</>;
};
