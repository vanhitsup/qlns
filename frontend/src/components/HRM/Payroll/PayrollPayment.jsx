import { loadAllAccount } from "@/redux/rtk/features/account/accountSlice";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, InputNumber, Select } from "antd";
import { useEffect } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";

export default function PayrollPayment({ totalCalculator }) {
  const dispatch = useDispatch();
  const { list: subAccount, loading: subAccountLoading } = useSelector(
    (state) => state.accounts
  );

  useEffect(() => {
    dispatch(loadAllAccount());
  }, [dispatch]);

  return (
    <Form.List name="paidAmount" rules={[{ required: true }]}>
      {(fields, { add, remove }) => (
        <div className="flex flex-col mb-2">
          <div className="bg-tableBg">
            {fields.map(({ key, name, ...restField }, index) => (
              <div key={key} className={`py-1`}>
                <div className="flex items-center">
                  <div className="flex gap-2">
                    <Form.Item
                      {...restField}
                      name={[name, "amount"]}
                      className="mb-0 w-1/2"
                      rules={[
                        {
                          required: true,
                          message: "Amount is required",
                        },
                      ]}>
                      <InputNumber
                        className="discountType"
                        placeholder="0"
                        style={{
                          width: "100%",
                        }}
                        size="small"
                        onChange={() =>
                          totalCalculator && totalCalculator(index)
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "paymentType"]}
                      rules={[
                        {
                          required: true,
                          message: "Payment type is required",
                        },
                      ]}>
                      <Select
                        showSearch
                        dropdownStyle={{ zIndex: 9999 }}
                        loading={subAccountLoading}
                        // size="small"
                        popupClassName="min-w-[200px]"
                        style={{
                          width: 180,
                        }}
                        placeholder="Select Payment type"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option?.children
                            ?.toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        filterSort={(optionA, optionB) =>
                          optionA.children
                            .toLowerCase()
                            .localeCompare(optionB.children.toLowerCase())
                        }>
                        {subAccount?.map((account) => (
                          <Select.Option key={account.id} value={account.id}>
                            {account.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>

                  <button
                    className="flex justify-center items-center hover:bg-black/40 rounded-md"
                    onClick={() => {
                      remove(name);
                      totalCalculator && totalCalculator(index);
                    }}></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Form.List>
  );
}

// PayrollPayment
