import { Card, Select } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearAccount,
  loadSingleAccount,
} from "../../redux/rtk/features/account/accountSlice";
import Loader from "../Loader/Loader";
import UpdateAccount from "./UpdateAccount";

const DetailAccount = () => {
  const data = useSelector((state) => state.accounts.account);
  const { id } = useParams("id");
  const dispatch = useDispatch();
  const [pageConfig, setPageConfig] = useState({});
  const {
    list: store,
    loading: storeLoading,
    defaultStore,
  } = useSelector((state) => state.store);

  //make a use effect to get the data from the getTrailBalance function
  useEffect(() => {
    dispatch(loadSingleAccount({ id, pageConfig }));
    return () => {
      dispatch(clearAccount());
    };
  }, [dispatch, id, pageConfig]);

  const handleChange = (value, key) => {
    setPageConfig({ ...pageConfig, [key]: value });
  };

  return (
    <>
      <Card>
        <div className=''>
          <div className='card-title flex flex-col sm:flex-row justify-between mb-4'>
            <h5 className='text-xl mb-3 sm:mb-0'>
              <span className='ml-2'> Account Ledger: {data?.name}</span>
              <div className={"filterTag min-w-[120px] max-w-[150px]"}>
                <Select
                  placeholder={"Select Store"}
                  className=''
                  loading={storeLoading}
                  defaultValue={defaultStore?.id}
                  mode={"multiple"}
                  showSearch={false}
                  style={{ width: "100%" }}
                  maxTagPlaceholder={(item) => (
                    <div className=''>{item.length} Selected</div>
                  )}
                  maxTagCount={0}
                  onChange={(value) => handleChange(value, "storeId")}
                >
                  {store.map((option) => (
                    <Select.Option key={option.id} value={option.id}>
                      {option.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </h5>
            {id > 15 && <UpdateAccount account={data || {}} id={id} />}
          </div>
          {data ? (
            <div className='w-full'>
              <div className='border-gray-200 w-full rounded  overflow-x-auto'>
                <table className='w-full bg-tableBg'>
                  <thead className='font-Popins text-black/70 bg-tableHeaderBg border-gray-200 uppercase'>
                    <tr className='border-b border-gray'>
                      <th
                        scope='col'
                        className='py-[14px] pl-3 text-left whitespace-nowrap tracking-wide'
                      >
                        Date
                      </th>
                      <th
                        scope='col'
                        className='py-[14px] pl-3 text-left whitespace-nowrap tracking-wide'
                      >
                        Debit
                      </th>
                      <th
                        scope='col'
                        className='py-[14px] pl-3 text-left whitespace-nowrap tracking-wide'
                      >
                        Credit
                      </th>
                      <th
                        scope='col'
                        className='py-[14px] pl-3 text-left whitespace-nowrap tracking-wide'
                      >
                        Particulars
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data?.debit?.map((item, index) => {
                        return (
                          <tr
                            key={index}
                            className='hover:bg-slate-900/10 border-b'
                          >
                            <td className='py-2 pl-3 whitespace-nowrap'>
                              {moment(item.date).format("ll")}
                            </td>
                            <td className='py-2 pl-3 whitespace-nowrap'>
                              {item.amount}
                            </td>
                            <td className='py-2 pl-3 whitespace-nowrap'></td>
                            <td className='py-2 pl-3 whitespace-nowrap'>
                              {item.particulars}
                            </td>
                          </tr>
                        );
                      })}
                    {data &&
                      data?.credit?.map((item, index) => {
                        return (
                          <tr
                            key={index}
                            className='hover:bg-slate-900/10 border-b'
                          >
                            <td className='py-2 pl-3 whitespace-nowrap'>
                              {moment(item.date).format("ll")}
                            </td>
                            <td className='py-2 pl-3 whitespace-nowrap'></td>
                            <td className='py-2 pl-3 whitespace-nowrap'>
                              {item.amount}
                            </td>
                            <td className='py-2 pl-3 whitespace-nowrap'>
                              {item.particulars}
                            </td>
                          </tr>
                        );
                      })}

                    {data && (
                      <tr className='hover:bg-slate-900/10 border-b rounded-b'>
                        <td colSpan='2' className='py-3 pl-3 whitespace-nowrap'>
                          <strong>Balance</strong>
                        </td>
                        <td>
                          <strong>{data?.balance.toFixed(2)}</strong>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </Card>
    </>
  );
};

export default DetailAccount;
