import Table from "@/UI/Table";
import { Link } from "react-router-dom";
import { addKeys } from "./TransactionList";

export default function ProductList({ list }) {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "product",
      key: "product.name",
      render: (product) => (
        <Link to={`/admin/product/${product.id}`}>{product.name}</Link>
      ),
    },
    {
      title: "Purchase Price",
      dataIndex: "productUnitPurchasePrice",
      key: "productSalePrice",
    },
    {
      title: "Transfer Quantity",
      dataIndex: "productQuantity",
      key: "productQuantity",
    },
    {
      title: "Total Price ",
      key: "Total Price ",
      dataIndex: "productFinalAmount",
    },
  ];
  return (
    <div className='m-1 md:mt-4'>
      <Table
        scroll={{ x: true }}
        loading={!list}
        columns={columns}
        data={list ? addKeys(list) : []}
      />
    </div>
  );
}
