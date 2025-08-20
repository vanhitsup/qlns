import Button from "@/UI/Button";
import { loadProduct } from "@/redux/rtk/features/product/productSlice";
import { loadAllStoreByUser } from "@/redux/rtk/features/store/storeSlice";
import { PlusOutlined } from "@ant-design/icons";
import { Form, InputNumber, Select } from "antd";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { CiCircleRemove } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../UI/Card";
import SearchForm from "../../UI/Search";

export default function Products({
  form,
  productList,
  productLoading,
  totalCalculator,
  subTotal,
}) {
  const dispatch = useDispatch();
  const {
    list: store,
    loading: storeLoading,
    defaultStore,
  } = useSelector((state) => state.store);

  const handleSetInitial = (product, serial) => {
    if (!form.getFieldValue("storeIdFrom")) {
      toast.error("Please select a store first");
      return;
    }
    const productArray = form.getFieldValue("stockInfo");
    const findProduct = productList.find((pro) => pro.id === product);
    if (findProduct.stockInfo[0]?.productQuantity === 0) {
      toast.error("Product is out of stock");
    }
    const newArray = productArray.map((product, index) => {
      if (index === serial) {
        const data = {
          ...product,
          stockIdFrom: findProduct.stockInfo[0]?.id,
          productQuantity: findProduct.stockInfo[0]?.productQuantity ? 1 : 0,
          productPurchasePrice: findProduct.stockInfo[0]?.productPurchasePrice,
        };

        return data;
      } else {
        return product;
      }
    });

    form.setFieldsValue({
      stockInfo: newArray,
    });
    totalCalculator();
  };

  const render = (index) => {
    const findId = form
      .getFieldValue("stockInfo")
      ?.find((_, i) => i === index)?.productId;
    const findProduct = productList?.find((item) => findId === item.id);

    let stock = null;
    if (findProduct?.stockInfo[0]?.productQuantity) {
      stock = (
        <span className='text-xs'>
          <span className='mr-1'>Stock: </span>
          <span>{findProduct.stockInfo[0].productQuantity}</span>
        </span>
      );
    }
    let attributes = null;
    if (findProduct?.productProductAttributeValue) {
      attributes = findProduct.productProductAttributeValue.map(
        (item, index) => (
          <span key={item.id} className='text-xs'>
            <span className='mr-1'>
              {item.productAttributeValue?.productAttribute?.name}:{" "}
            </span>
            {/* coma separator  */}
            <span>{item.productAttributeValue?.name}</span>
            {index < findProduct.productProductAttributeValue.length - 1 && (
              <span>, </span>
            )}
          </span>
        )
      );
    }
    let uom = null;
    if (findProduct?.productGroup?.uom?.name) {
      uom = (
        <span className='text-xs'>
          <span className='mr-1'>UoM: </span>
          <span>{`${findProduct?.productGroup?.uomValue}/${findProduct?.productGroup?.uom?.name}`}</span>
        </span>
      );
    }

    return { stock, uom, attributes };
  };

  useEffect(() => {
    dispatch(loadAllStoreByUser());
  }, [dispatch]);

  const handleSelectStore = (store) => {
    dispatch(loadProduct({ page: 1, count: 1000, storeId: store }));
    form.setFieldsValue({
      stockInfo: [{}],
    });
  };

  useEffect(() => {
    if (defaultStore) {
      form.setFieldValue("storeIdFrom", defaultStore.id);
    }
  }, [defaultStore, form]);

  return (
    <Card
      className='h-[calc(100vh-120px)]'
      headClass=''
      bodyClass='p-0'
      title={
        <div className='flex gap-2'>
          <SearchForm
            className='w-[450px]'
            form={form}
            totalCalculator={totalCalculator}
          />
        </div>
      }
      extra={
        <Form.Item
          className='mb-0 min-w-[200px]'
          name='storeIdFrom'
          rules={[
            {
              required: true,
              message: "Store is required",
            },
          ]}
        >
          <Select
            className='w-full'
            loading={storeLoading}
            showSearch
            onChange={handleSelectStore}
            placeholder='Select a store'
            optionFilterProp='children'
          >
            {store?.map((store) => (
              <Select.Option key={store.id} value={store.id}>
                {store.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      }
    >
      <Form.List
        name='stockInfo'
        rules={[
          {
            required: true,
            message: "Product is required",
          },
        ]}
      >
        {(fields, { add, remove }) => (
          <>
            <div className='max-h-[calc(100vh-220px)] overflow-auto'>
              <table className='w-full'>
                <thead
                  className={
                    "font-Popins text-black bg-tableHeaderBg border-gray-200 sticky top-0 z-10"
                  }
                >
                  <tr>
                    <th className='py-2 pl-2 text-left'>SL</th>
                    <th className='py-2 pl-2 text-left'>Product</th>
                    <th className='py-2 pl-2 text-left'>Price</th>
                    <th className='py-2 pl-2 text-left'>Quantity</th>
                    <th className='py-2 pl-2 text-left'>Amount</th>
                    <th className='py-2 pl-2 text-left'></th>
                  </tr>
                </thead>
                <tbody className='bg-tableBg'>
                  {fields.map(({ key, name, ...restField }, index) => {
                    const indexedProduct = render(index);
                    return (
                      <tr
                        key={key}
                        className={`hover:bg-slate-900/10 py-1 ${
                          index === fields.length - 1 ? "" : "border-b"
                        }`}
                      >
                        <td className='py-2 pl-2  align-top'>{index + 1}</td>
                        <td className='py-2 pl-2 align-top'>
                          <Form.Item
                            {...restField}
                            name={[name, "productId"]}
                            className='mb-0 max-w-[500px]'
                            rules={[
                              {
                                required: true,
                                message: "Product is required",
                              },
                            ]}
                          >
                            <Select
                              placeholder='Select Product'
                              showSearch
                              loading={productLoading}
                              optionFilterProp='children'
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .includes(input.toLowerCase())
                              }
                              onChange={(product) => {
                                handleSetInitial(product, index);
                              }}
                            >
                              {productList?.map((item) => (
                                <Select.Option key={item.id} value={item.id}>
                                  {item.name}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <div className='px-2'>
                            {indexedProduct.attributes}
                          </div>
                          <div className='px-2'>{indexedProduct.uom}</div>
                        </td>

                        <td className='py-2 pl-2 align-top'>
                          <Form.Item
                            {...restField}
                            name={[name, "productPurchasePrice"]}
                            className='mb-0 max-w-[150px]'
                            rules={[
                              {
                                required: true,
                                message: "Price is required",
                              },
                            ]}
                          >
                            <InputNumber
                              type='number'
                              size='small'
                              style={{ width: "100%" }}
                              placeholder='50000'
                              disabled
                            />
                          </Form.Item>
                        </td>
                        <td className='py-2 pl-2 align-top'>
                          <Form.Item
                            {...restField}
                            name={[name, "productQuantity"]}
                            className='mb-0 max-w-[200px]'
                            rules={[
                              {
                                required: true,
                                message: "quantity is required",
                              },
                            ]}
                          >
                            <InputNumber
                              type='number'
                              style={{ width: "100%" }}
                              size={"small"}
                              placeholder='Quantity'
                              onChange={() => totalCalculator(index)}
                            />
                          </Form.Item>
                          <div>{indexedProduct.stock}</div>
                        </td>
                        <td className='py-2 pl-2 align-top min-w-[80px]'>
                          <div className='font-weight-bold md:text-base xxs:text-xs'>
                            {subTotal[index]?.subPrice?.toFixed(2) || 0}
                          </div>
                        </td>

                        <td className='py-2 pl-2 align-top'>
                          <Form.Item>
                            <button
                              shape='circle'
                              className='flex justify-center items-center hover:bg-black/40 rounded-md'
                              onClick={() => {
                                remove(name);
                                totalCalculator(index);
                              }}
                            >
                              <CiCircleRemove size={25} />
                            </button>
                          </Form.Item>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {fields.length === 0 && (
              <div className='text-center py-10'>No product selected yet</div>
            )}
            <div className='flex items-center justify-center mt-2'>
              <Button
                onClick={() => add()}
                className='flex items-center justify-center w-48'
                block
                icon={<PlusOutlined />}
              >
                Add Product
              </Button>
            </div>
          </>
        )}
      </Form.List>
    </Card>
  );
}
