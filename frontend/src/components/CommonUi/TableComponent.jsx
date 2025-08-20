import Button from "@/UI/Button";
import CSV from "@/UI/CSV";
import Menu from "@/UI/Menu";
import PrintPDF from "@/components/CommonUi/PrintPdf";
import { Popover } from "antd";
import React, { useEffect, useState } from "react";
import { BsDatabaseExclamation, BsThreeDotsVertical } from "react-icons/bs";
import Pagination from "../../UI/Pagination";
import Table from "../../UI/Table";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import CommonSearch from "./CommonSearch";
import Filter from "./Filter";
import Segmented from "@/UI/Segmented";
import { CiCreditCard2, CiViewTable } from "react-icons/ci";

const TableComponent = ({
  list,
  total,
  loading,
  children,
  filters,
  columns,
  extraFilter,
  title,
  setPageConfig,
  isSearch,
  loadingUiSize = 10,
  nestedRowKey,
  card,
  defaultView = "list",
}) => {
  const fetchData = (page, count) => {
    setPageConfig((prev) => {
      return { ...prev, page, count };
    });
  };

  const [view, setView] = useState(defaultView);

  // column select
  const [columnsToShow, setColumnsToShow] = useState([]);
  useEffect(() => {
    setColumnsToShow(columns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns?.length]);

  const columnsToShowHandler = (val) => {
    setColumnsToShow(val);
  };

  const handleChange = (value) => {
    setView(value);
  };

  const options = [
    {
      value: "card",
      icon: <CiCreditCard2 size={21} />,
      title: "Card",
    },
    {
      value: "list",
      icon: <CiViewTable size={21} />,
      title: "List",
    },
  ];

  return (
    <>
      <div className="mt-2">
        <div className="w-full dark:text-yellow-50 flex flex-wrap gap-2 items-center flex-col-reverse sm:flex-row  justify-between mb-3">
          <div className="flex flex-wrap lg:flex-nowrap gap-2 w-full md:w-auto">
            {isSearch && (
              <div className="w-full sm:w-[250px]">
                <CommonSearch setPageConfig={setPageConfig} />
              </div>
            )}
            <div className="hideScrollBar overflow-x-auto overflow-y-hidden w-full">
              <Filter
                setPageConfig={setPageConfig}
                filters={filters}
                extraFilter={extraFilter}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {!card ? (
              <ColVisibilityDropdown
                options={columns}
                columns={columns}
                columnsToShowHandler={columnsToShowHandler}
              />
            ) : (
              <Segmented
                options={options}
                value={view}
                onChange={handleChange}
              />
            )}

            <Popover
              content={
                <Menu
                  items={[
                    {
                      key: "1",
                      label: (
                        <PrintPDF list={list} columns={columns} title={title} />
                      ),
                    },

                    {
                      key: "3",
                      label: (
                        <CSV
                          notButton={true}
                          list={list}
                          columns={columns}
                          title={title}
                        />
                      ),
                    },
                  ]}
                />
              }
              placement="bottomRight"
              arrow={false}
              trigger="click"
            >
              <Button
                color={"gray"}
                icon={<BsThreeDotsVertical size={15} />}
                className="  px-3"
              ></Button>
            </Popover>
          </div>
        </div>

        {view === "list" && (
          <Table
            loading={loading}
            columns={columnsToShow}
            nestedRowKey={nestedRowKey}
            data={
              !!list?.length && list.map((item) => ({ ...item, key: item?.id }))
            }
            scroll={{ y: window.innerHeight - 350 }}
            loadingUiSize={loadingUiSize}
          />
        )}

        {view === "card" && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {list?.map((item) => card(item))}
            </div>
            {!list?.length && !loading && (
              <div className="flex flex-col justify-center items-center h-full py-10">
                <BsDatabaseExclamation className="text-slate-200" size={70} />
                <span className="py-2 text-lg  text-slate-500"> Empty</span>
              </div>
            )}
          </>
        )}
      </div>
      <div className="flex justify-center mt-3">
        {total >= 11 && <Pagination onChange={fetchData} total={total} />}
      </div>
      {children && children}
    </>
  );
};
export default TableComponent;
