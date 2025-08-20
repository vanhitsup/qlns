import Table from "@/UI/Table";
import { Pagination } from "antd";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import useCurrency from "@/utils/useCurrency";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadAlleCommerceSalePaginated } from "@/redux/rtk/features/eCommerce/cartOrder/cartOrderSlice";

export default function Orders() {
  const currency = useCurrency();
  const dispatch = useDispatch();
  const {
    list,
    total,
    loading: saleLoading,
  } = useSelector((state) => state.ESale);
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
  });
  const columns = [
    {
      title: "Order#",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/order/${id}`}>{id}</Link>,
    },
    {
      title: "Place On",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("MMM Do YY"),
    },
    {
      title: "Items",
      dataIndex: "cartOrderProduct",
      key: "cartOrderProduct",
      render: (cartOrderProduct) => {
        const productNames = cartOrderProduct.map(
          (product) => product.product.name,
        );
        return productNames.join(", ");
      },
      tdClass: "whitespace-normal",
    },
    {
      title: "Total",
      key: "totalAmount",
      render: ({ totalAmount, totalDiscountAmount }) => (
        <span>
          <span
            dangerouslySetInnerHTML={{
              __html: currency?.currencySymbol,
            }}
          />
          {(totalAmount + totalDiscountAmount).toFixed(2)}
        </span>
      ),
    },
    {
      title: "Discount",
      dataIndex: "totalDiscountAmount",
      key: "totalDiscountAmount",
      render: (totalDiscountAmount) => (
        <span>
          <span
            dangerouslySetInnerHTML={{
              __html: currency?.currencySymbol,
            }}
          />
          {totalDiscountAmount.toFixed(2)}
        </span>
      ),
    },
    {
      title: "Tax",
      dataIndex: "totalTaxAmount",
      key: "totalTaxAmount",
      render: (totalTaxAmount) => (
        <span>
          <span
            dangerouslySetInnerHTML={{
              __html: currency?.currencySymbol,
            }}
          />
          {totalTaxAmount.toFixed(2)}
        </span>
      ),
    },

    {
      title: "Paid",
      dataIndex: "paidAmount",
      key: "paidAmount",
      render: (paidAmount) => (
        <span>
          <span
            dangerouslySetInnerHTML={{
              __html: currency?.currencySymbol,
            }}
          />
          {paidAmount.toFixed(2)}
        </span>
      ),
    },
    {
      title: "Due",
      dataIndex: "dueAmount",
      key: "dueAmount",
      render: (dueAmount) => (
        <span>
          <span
            dangerouslySetInnerHTML={{
              __html: currency?.currencySymbol,
            }}
          />
          {` ${dueAmount.toFixed(2)}`}
        </span>
      ),
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (orderStatus) => (
        <span
          className={` rounded px-2 py-[1px] text-ePrimary  ${
            orderStatus === "PENDING" && "text-orange-500 "
          }
                  ${orderStatus === "RECEIVED" && "text-green-500 "}
              
                  ${orderStatus === "CANCELLED" && "text-red-500"}
                    `}
        >
          {orderStatus}
        </span>
      ),
    },
  ];

  const fetchData = (page, count) => {
    setPageConfig((prev) => {
      return { ...prev, page, count };
    });
  };

  useEffect(() => {
    dispatch(loadAlleCommerceSalePaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <>
      <Table
        className="my-5"
        loading={saleLoading}
        columns={columns}
        data={
          !!list?.length && list.map((item) => ({ ...item, key: item?.id }))
        }
        scroll={{
          x: 400,
        }}
      />
      <div className="mt-2 flex justify-end">
        {total >= 11 && (
          <Pagination
            total={total}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
            onChange={fetchData}
            defaultPageSize={10}
            defaultCurrent={1}
            showLessItems
            showSizeChanger={total > 10}
          />
        )}
      </div>
    </>
  );
}
