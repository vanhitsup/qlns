import Button from "@/UI/Button";
import CSV from "@/UI/CSV";
import Menu from "@/UI/Menu";
import Pagination from "@/UI/Pagination";
import { loadAllStoreByUser } from "@/redux/rtk/features/store/storeSlice";
import { Popover, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import PrintPdf from "../CommonUi/PrintPdf";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";

const TableComponent = ({
  columns,
  list,
  total,
  loading,
  paginatedThunk,
  children,
  query,
  setProductList,
  storeId,
  setStoreId,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const {
    list: store,
    loading: storeLoading,
    defaultStore,
  } = useSelector((state) => state.store);
  const dispatch = useDispatch();

  const onSelectChange = (newSelectedRowKeys, second) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setProductList(second);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const fetchData = (page, count) => {
    dispatch(paginatedThunk({ ...query, status: true, page, count }));
  };

  const handleChangeStore = (value) => {
    setStoreId(value);
    dispatch(paginatedThunk({ ...query, status: true, storeId: value }));
  };

  // column select
  const [columnsToShow, setColumnsToShow] = useState([]);

  useEffect(() => {
    setColumnsToShow(columns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(loadAllStoreByUser());
  }, [dispatch]);

  useEffect(() => {
    if (defaultStore) {
      setStoreId(defaultStore.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultStore]);

  return (
    <>
      <div className='mt-2'>
        <div className='pb-3'>
          <div className='w-full dark:text-yellow-50 flex flex-col md:flex-row gap-2 items-center justify-between'>
            <div className=''>
              <div className='filterTag float-left min-w-[130px] max-w-[150px]'>
                <Select
                  placeholder='Select a store'
                  mode={"single"}
                  loading={storeLoading}
                  showSearch={false}
                  value={storeId}
                  onChange={handleChangeStore}
                  maxTagPlaceholder={(item) => (
                    <div className=''>{item.length} Selected</div>
                  )}
                  maxTagCount={0}
                >
                  {store?.map((option) => (
                    <Select.Option key={option.id} value={option.id}>
                      {option.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className='flex items-center gap-2 w-full sm:w-auto'>
              <ColVisibilityDropdown
                options={columns}
                columns={columns}
                columnsToShowHandler={setColumnsToShow}
              />
              <Popover
                content={
                  <Menu
                    items={[
                      {
                        key: "1",
                        label: (
                          <PrintPdf
                            list={list}
                            columns={columns}
                            title={"Shortage Products"}
                          />
                        ),
                      },
                      {
                        key: "2",
                        label: (
                          <CSV
                            notButton={true}
                            list={list}
                            columns={columns}
                            title={"Shortage Products"}
                          />
                        ),
                      },
                    ]}
                  />
                }
                placement='bottomRight'
                arrow={false}
                trigger='click'
              >
                <Button
                  color={"gray"}
                  icon={<BsThreeDotsVertical size={15} />}
                  className='px-2'
                ></Button>
              </Popover>
            </div>
          </div>
        </div>

        <Table
          loading={loading}
          rowSelection={rowSelection}
          columns={columnsToShow}
          dataSource={
            !!list?.length && list.map((item) => ({ ...item, key: item?.id }))
          }
          pagination={false}
          scroll={{ x: 1000, y: window.innerHeight - 319 }}
        />
        <div className='flex justify-center mt-3'>
          {total >= 11 && <Pagination onChange={fetchData} total={total} />}
        </div>
      </div>
      {children && children}
    </>
  );
};
export default TableComponent;
