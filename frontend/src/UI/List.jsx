import { cn } from "@/utils/functions";

export default function List({
  list,
  className,
  listClassName,
  labelClassName,
}) {
  if (Array.isArray(list) && list.length === 0) return null;
  list = list.filter((item) => item !== null && item !== undefined);
  return (
    <>
      <ul
        className={cn("flex flex-col gap-2 py-2", { [className]: className })}
      >
        {list.map((item) => {
          if (!item.hidden) {
            return (
              <li
                className={cn("flex items-start gap-2", {
                  [item.className]: item.className,
                  [listClassName]: listClassName,
                })}
                key={item.key || item.label}
              >
                <span
                  className={cn("text-gray-600 font-medium w-[50%]", {
                    [labelClassName]: labelClassName,
                  })}
                >
                  {item.label}
                </span>
                <span
                  className={cn("text-slate-800 font-medium flex-grow", {
                    [item.valueClass]: item.valueClass,
                  })}
                >
                  {item.value}
                </span>
              </li>
            );
          } else {
            return null;
          }
        })}
      </ul>
    </>
  );
}
