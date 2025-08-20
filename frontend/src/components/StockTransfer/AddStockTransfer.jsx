import { Button, DatePicker, Form, Input, Select } from "antd";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProduct } from "../../redux/rtk/features/product/productSlice";

import { addStockTransfer } from "@/redux/rtk/features/stockTransfer/stockTransferSlice";
import { loadAllStore } from "@/redux/rtk/features/store/storeSlice";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Products from "./Products";

export default function AddStockTransfer() {
  const [loader, setLoader] = useState(false);
  const [subTotal, setSubTotal] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { list: productList, loading: productLoading } = useSelector(
    (state) => state.products
  );
  const { allList, loading: storeLoading } = useSelector(
    (state) => state.store
  );

  const onFormSubmit = async (values) => {
    try {
      const mergedObject = values.stockInfo.reduce(
        (accumulator, currentObject) => {
          const productId = currentObject.productId;
          if (!accumulator[productId]) {
            accumulator[productId] = { ...currentObject };
          } else {
            accumulator[productId].productQuantity +=
              currentObject.productQuantity;
          }
          return accumulator;
        },
        {}
      );

      const mergedArray = Object.values(mergedObject);
      const productArray = mergedArray.map((item) => {
        const quantity = item?.productQuantity || 0;
        const data = {
          stockIdFrom: item.stockIdFrom,
          quantity: quantity,
        };

        return data;
      });

      const data = {
        ...values,
        stockInfo: productArray,
      };
      const resp = await dispatch(addStockTransfer(data));
      if (resp.payload.message === "success") {
        form.resetFields();
        setLoader(false);
        navigate(`/admin/stock-transfer/${resp.payload.data.id}`);
      } else {
        setLoader(false);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  // =============================== total calculate===================================
  const totalCalculator = () => {
    const productArray = form.getFieldValue("stockInfo");
    const subTotal =
      productArray?.reduce((subTotal, current) => {
        const quantity = current?.productQuantity || 0;
        const price = current?.productPurchasePrice || 0;
        const subPrice = price * quantity;
        return [...subTotal, { subPrice }];
      }, []) || [];

    setSubTotal(subTotal);
  };

  const total = subTotal.reduce((acc, item) => {
    return acc + item.subPrice;
  }, 0);

  useEffect(() => {
    dispatch(loadProduct({ page: 1, count: 100, status: "true" }));
    dispatch(loadAllStore());
  }, [dispatch]);

  return (
    <Form
      form={form}
      name='dynamic_form_nest_item'
      onFinish={onFormSubmit}
      onFinishFailed={() => {
        setLoader(false);
      }}
      layout='vertical'
      size='large'
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
      autoComplete='off'
      initialValues={{
        date: dayjs(),
        stockInfo: [{}],
      }}
    >
      <div className='flex gap-2 2xl:h-[calc(100vh-130px)] min-h-[500px]'>
        <div className='w-[70%] 2xl:w-[75%]'>
          <Products
            form={form}
            totalCalculator={totalCalculator}
            subTotal={subTotal}
            productList={productList}
            productLoading={productLoading}
          />
        </div>
        <div className='flex flex-col w-[30%] 2xl:w-[25%] 2xl:h-[calc(100vh-120px)]'>
          <div className='flex-grow 2xl:overflow-y-auto 2xl:overflow-x-hidden  pl-2'>
            <Form.Item
              label='Transfer to'
              className='mb-0 min-w-[200px]'
              name='storeIdTo'
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
                placeholder='Select a store'
                optionFilterProp='children'
              >
                {allList?.map((store) => (
                  <Select.Option key={store.id} value={store.id}>
                    {store.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label='Date'
              required
              className='w-full mb-0'
              name='date'
              rules={[
                {
                  required: true,
                  message: "Please input Date!",
                },
              ]}
            >
              <DatePicker label='date' size='small' format={"YYYY-MM-DD"} />
            </Form.Item>
            <Form.Item className='mb-0' label='Note' name='note'>
              <Input
                className=''
                size={"small"}
                placeholder='Write sale Note'
                label='note'
              />
            </Form.Item>
          </div>

          <div className='bg-gray-100 px-2'>
            <div className='py-2'>
              <div className=' flex justify-between'>
                <strong>Total amount: </strong>
                <strong>{Number(total).toFixed(2)} </strong>
              </div>
            </div>
            <div className='flex gap-2'>
              <Form.Item className='w-full pb-0'>
                <Button
                  block
                  type='primary'
                  htmlType='submit'
                  loading={loader}
                  onClick={() => setLoader(true)}
                >
                  Create Stock Transfer
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
