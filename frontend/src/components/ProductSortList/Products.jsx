import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, InputNumber, Select } from "antd";
import { CiCircleRemove } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";

export default function Products({ form, pageConfig }) {
  const dispatch = useDispatch();
  const { list: productList, loading: productLoading } = useSelector(
    (state) => state.productSortList
  );

  const handleSetInitial = (productId, serial) => {
    const productArray = form.getFieldValue("reorderStocks");
    const findProduct = productList.find(
      (product) => productId === product?.productId
    );
    const newArray = productArray.map((product, index) => {
      if (index === serial) {
        return {
          ...findProduct,
          productQuantity: 0,
        };
      } else {
        return product;
      }
    });

    form.setFieldsValue({
      reorderStocks: newArray,
    });
  };

  return (
    <>
      <Form.List
        name="reorderStocks"
        rules={[
          {
            required: true,
            message: "Product is required",
          },
        ]}>
        {(fields, { add, remove }) => (
          <>
            <table className="w-full">
              <thead
                className={
                  "font-Popins text-black bg-tableHeaderBg border-gray-200 sticky top-0 z-10"
                }>
                <tr>
                  <th className="py-2 pl-2 text-left">SL</th>
                  <th className="py-2 pl-2 text-left min-w-[60%]">Product</th>
                  <th className="py-2 pl-2 text-left ">Quantity</th>
                  <th className="py-2 pl-2 text-left"></th>
                </tr>
              </thead>
              <tbody className="bg-tableBg">
                {fields.map(({ key, name, ...restField }, index) => {
                  return (
                    <tr
                      key={key}
                      className={`hover:bg-slate-900/10 py-1 ${
                        index === fields.length - 1 ? "" : "border-b"
                      }`}>
                      <td className="py-2 pl-2 align-top">{index + 1}</td>
                      <td className="py-2 pl-2 align-top ">
                        <Form.Item
                          {...restField}
                          name={[name, "productId"]}
                          className="max-w-[600px]"
                          rules={[
                            {
                              required: true,
                              message: "Product is required",
                            },
                          ]}>
                          <Select
                            placeholder="Select Product"
                            showSearch
                            loading={productLoading}
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                            onChange={(productId) => {
                              handleSetInitial(productId, index);
                            }}>
                            {productList?.map((item) => (
                              <Select.Option
                                key={item?.productId}
                                value={item?.productId}>
                                {item?.product?.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </td>

                      <td className="py-2 pl-2 align-top">
                        {" "}
                        <Form.Item
                          {...restField}
                          name={[name, "productQuantity"]}
                          rules={[
                            {
                              required: true,
                              message: "quantity is required",
                            },
                          ]}>
                          <InputNumber
                            // className="w-full text-sm xxs:p-0 md:p-2"
                            size={"small"}
                            placeholder="Quantity"
                          />
                        </Form.Item>
                      </td>
                      <td className="py-2 pl-2 align-top">
                        <Form.Item>
                          <button
                            shape="circle"
                            className="flex justify-center items-center hover:bg-black/40 rounded-md"
                            onClick={() => {
                              remove(name);
                            }}>
                            <CiCircleRemove size={25} />
                          </button>
                        </Form.Item>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="max-h-[calc(100vh-300px)] grid w-full overflow-y-auto overflow-x-visible mt-2"></div>
            {fields.length === 0 && (
              <div className="text-center py-10">No product selected yet</div>
            )}
            <div className="flex items-center justify-center mt-2">
              <Button
                onClick={() => add()}
                className="flex items-center justify-center w-48"
                block
                icon={<PlusOutlined />}>
                Add Product
              </Button>
            </div>
          </>
        )}
      </Form.List>
    </>
  );
}
