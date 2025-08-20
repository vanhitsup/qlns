import { Popover } from "antd";
import { BsDatabaseExclamation, BsThreeDots } from "react-icons/bs";
import { cn } from "@/utils/functions";

import { FaLock } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";

const PayrollTable = ({
  columns,
  data,
  loading = false,
  loadingUiSize = 5,
  scroll = {},
  headClass,
  nestedRowKey,
  onRowSelect,
  selectedRowKeys,
  inactiveChecker,
  selectedRowKey = "userId",
  lock = {
    lockIcon: null,
    lockIndex: null,
    lockValue: null,
    lockMessage: "You can't delete this row",
  },
}) => {
  const allSelectInputRef = useRef();
  let nestedRow = null;
  const defaultSortTypes = ["asc", "desc"];
  const [shortSelected, setShortSelected] = useState({});

  const renderItem = (item, column) => {
    if (column?.key === "action" && column?.render) {
      return (
        <Popover
          // content={<Menu items={column.render(item)} />}
          placement="bottomRight"
          arrow={false}
          trigger="click">
          <BsThreeDots className="cursor-pointer text-base mr-2" />
        </Popover>
      );
    } else if (
      column?.dataIndex &&
      Object.prototype.hasOwnProperty.call(item, column?.dataIndex)
    ) {
      if (column?.amount) {
        const value = item[column?.dataIndex];
        if (value && value < 0) {
          return `(${Math.abs(value).toFixed(2)})`;
        } else if (value) {
          return value.toFixed(2);
        } else {
          return "-";
        }
      } else if (column.render)
        return column.render(item[column?.dataIndex], item) || "-";
      else if (typeof item[column?.dataIndex] === "number") {
        return item[column?.dataIndex];
      } else {
        return item[column?.dataIndex] ? item[column?.dataIndex] : "-";
      }
    } else if (column.render && !column?.dataIndex) {
      return column.render(item) || "-";
    }
    return "-";
  };

  const renderNestedRow = (nestedItem, column) => {
    if (column.renderNested)
      return column.renderNested(nestedItem[column.nestDataIndex]) || "-";
  };

  const handleAllRowSelect = (e) => {
    const checked = e.target.checked;
    if (checked) {
      // filter for locked item
      const filteredData = data.filter((item) => {
        if (!lock.lockIndex) return true;
        return item[lock?.lockIndex] !== lock.lockValue;
      });
      onRowSelect(filteredData.map((item) => item[selectedRowKey]));
    } else {
      onRowSelect([]);
    }
  };

  const handleRowSelect = (e, data) => {
    const checked = e.target.checked;
    if (checked) {
      onRowSelect([...selectedRowKeys, data[selectedRowKey]]);
    } else {
      onRowSelect(
        selectedRowKeys.filter((key) => key !== data[selectedRowKey])
      );
    }
  };

  useEffect(() => {
    if (allSelectInputRef.current && !selectedRowKeys.length) {
      allSelectInputRef.current.checked = false;
    }
  });

  return (
    <div className="tableContainer tableScrollBar overflow-y-auto w-full">
      <div
        style={{
          maxHeight: scroll.y ? `${scroll.y}px` : "auto",
        }}>
        <table
          className=""
          style={{
            width: "100%",
          }}>
          <thead
            className={cn(
              "font-Popins text-black/70 bg-tableHeaderBg border-gray-200 sticky top-0 z-10",
              { [headClass]: headClass }
            )}>
            <tr>
              {selectedRowKeys && selectedRowKeys && (
                <th
                  className={`py-[14px] pl-3 text-left whitespace-nowrap tracking-wide rounded-tl-lg`} // rounded class
                >
                  <input
                    ref={allSelectInputRef}
                    type="checkbox"
                    onChange={handleAllRowSelect}
                  />
                </th>
              )}
              {columns.map((column, index) => {
                const isHidden = Boolean(column.hidden);
                if (isHidden) return null;
                const isSort = Boolean(column.sorter);
                const sorter = column.sorter;

                return (
                  <th
                    key={column.key}
                    onClick={
                      isSort
                        ? () => {
                            setShortSelected((prev) => {
                              if (prev[column.dataIndex]) {
                                const index = defaultSortTypes.indexOf(
                                  prev[column.dataIndex]
                                );
                                if (index === defaultSortTypes.length - 1) {
                                  sorter(column.dataIndex, defaultSortTypes[0]);
                                  return {
                                    [column.dataIndex]: defaultSortTypes[0],
                                  };
                                } else {
                                  sorter(
                                    column.dataIndex,
                                    defaultSortTypes[index + 1]
                                  );
                                  return {
                                    [column.dataIndex]:
                                      defaultSortTypes[index + 1],
                                  };
                                }
                              } else {
                                sorter(column.dataIndex, defaultSortTypes[0]);
                                return {
                                  [column.dataIndex]: defaultSortTypes[0],
                                };
                              }
                            });
                          }
                        : undefined
                    }
                    className={cn(
                      `py-[14px] pl-3 select-none text-left whitespace-nowrap tracking-wide`,
                      {
                        "rounded-tl-lg": index === 0 && !selectedRowKeys,
                        "rounded-tr-lg": index === columns.length - 1,
                        "cursor-pointer hover:underline": isSort,
                        [column.thClass]: column.thClass,
                      }
                    )}>
                    {isSort ? (
                      <div className="flex items-center space-x-1">
                        {column.title || null}
                        <MdArrowDropDown
                          className={cn("text-primary", {
                            "transform rotate-180":
                              shortSelected[column.dataIndex] === "asc",
                            "transform rotate-0":
                              shortSelected[column.dataIndex] === "desc",
                            hidden: !shortSelected[column.dataIndex],
                          })}
                          size={20}
                        />
                      </div>
                    ) : (
                      column.title || null
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          {data?.length > 0 && !loading && (
            <>
              {data.map((item, index) => {
                const isNest = Boolean(
                  nestedRowKey &&
                    item[nestedRowKey] &&
                    item[nestedRowKey].length > 1
                );

                const isInactive = inactiveChecker && inactiveChecker(item);
                if (isNest) {
                  nestedRow = item[nestedRowKey];
                }
                let nestContent = null;
                if (nestedRow) {
                  nestContent = nestedRow.map((nestedItem, nestedIndex) => {
                    if (nestedIndex === 0) {
                      return null;
                    }
                    return (
                      <tr
                        key={nestedIndex}
                        className={`${
                          nestedIndex === nestedRow.length - 1
                            ? "border-b"
                            : "border-b border-b-slate-900/20"
                        }`}>
                        {columns.map((column) => {
                          if (
                            column?.nestDataIndex &&
                            Object.prototype.hasOwnProperty.call(
                              nestedItem,
                              column?.nestDataIndex
                            )
                          ) {
                            return (
                              <td
                                key={column.key}
                                className={cn("py-2 pl-3 whitespace-nowrap", {
                                  [column.tdClass]: column.tdClass,
                                })}>
                                {renderNestedRow(nestedItem, column)}
                              </td>
                            );
                          } else return null;
                        })}
                      </tr>
                    );
                  });
                }
                nestedRow = null;

                return (
                  <tbody
                    className="bg-tableBg hover:bg-slate-900/10"
                    key={index}>
                    <tr
                      className={cn({
                        "border-b": index !== data.length - 1,
                        "border-b border-b-slate-900/20":
                          isNest && index === data.length - 1,
                      })}>
                      {selectedRowKeys && (
                        <>
                          {lock?.lockIndex &&
                          item[lock?.lockIndex] === lock.lockValue ? (
                            <td
                              className={cn("py-2 pl-3 whitespace-nowrap", {
                                "rounded-bl-lg": index === data.length - 1,
                              })}>
                              <span title={lock.lockMessage}>
                                {lock.lockIcon || <FaLock />}
                              </span>
                            </td>
                          ) : (
                            <td
                              className={cn("py-2 pl-3 whitespace-nowrap", {
                                "rounded-bl-lg": index === data.length - 1,
                              })}>
                              <input
                                type="checkbox"
                                onChange={(e) => handleRowSelect(e, item)}
                                checked={selectedRowKeys?.includes(item.userId)}
                              />
                            </td>
                          )}
                        </>
                      )}

                      {columns.map((column, colIndex) => {
                        const isHidden = Boolean(column.hidden);
                        if (isHidden) return null;
                        const isNest = Boolean(
                          nestedRowKey &&
                            item[nestedRowKey] &&
                            item[nestedRowKey].length > 1
                        );

                        const isSetRowSpan = Boolean(
                          isNest && !column.renderNested
                        );

                        return (
                          <td
                            rowSpan={
                              isSetRowSpan ? item[nestedRowKey].length : 1
                            }
                            key={column.key}
                            className={cn(
                              "py-2 pl-3 whitespace-nowrap",
                              {
                                "rounded-bl-lg":
                                  index === data.length - 1 &&
                                  colIndex === 0 &&
                                  !selectedRowKeys,
                                "opacity-40": isInactive,
                              },
                              {
                                "rounded-br-lg":
                                  index === data.length - 1 &&
                                  colIndex === columns.length - 1 &&
                                  !selectedRowKeys,
                              },
                              {
                                [column.tdClass]: column.tdClass,
                              }
                            )}>
                            {renderItem(item, column)}
                          </td>
                        );
                      })}
                    </tr>
                    {nestContent || null}
                  </tbody>
                );
              })}
            </>
          )}
        </table>
        {!data?.length && !loading && (
          <div className="flex flex-col justify-center items-center h-full py-10">
            <BsDatabaseExclamation className="text-slate-200" size={70} />
            <span className="py-2 text-lg  text-slate-500"> Empty</span>
          </div>
        )}
        {loading && <TableLoader length={loadingUiSize} />}
      </div>
    </div>
  );
};

export default PayrollTable;

export const TableLoader = ({ length = 3 }) => {
  const loaderArray = Array(length).fill("1");
  return loaderArray.map((_, index) => (
    <div
      key={index}
      className="w-full flex justify-between px-10 border-b py-2 gap-5">
      <div className="rounded w-full h-[18px] bg-slate-200 animate-pulse" />
      <div className="rounded w-full h-[18px] bg-slate-200 animate-pulse" />
      <div className="rounded w-full h-[18px] bg-slate-200 animate-pulse" />
    </div>
  ));
};
