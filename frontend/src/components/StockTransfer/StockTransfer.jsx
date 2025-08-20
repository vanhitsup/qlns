import UseStoreFilter from "@/Hooks/useStoreFilter";
import Card from "@/UI/Card";
import { loadAllStockTransferPaginated } from "@/redux/rtk/features/stockTransfer/stockTransferSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CreateButton from "../Buttons/CreateButton";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";

export default function StockTransfer() {
  const dispatch = useDispatch();
  const { storeFilter } = UseStoreFilter();
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
  });
  const { list, loading, total } = useSelector((state) => state.stockTransfer);
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/admin/stock-transfer/${id}`}>{id}</Link>,
    },
    {
      title: "From Store",
      dataIndex: "storeFrom",
      render: (storeFrom) => storeFrom?.name,
      renderCsv: (storeFrom) => storeFrom?.name,
      key: "fromStore",
    },
    {
      title: "To Store",
      dataIndex: "storeTo",
      render: (storeTo) => storeTo?.name,
      renderCsv: (storeTo) => storeTo?.name,
      key: "storeTo",
    },
    {
      title: "Transferred By",
      dataIndex: "transferBy",
      key: "transferBy",
      render: (transferBy) => transferBy?.username,
      renderCsv: (transferBy) => transferBy?.username,
    },
    {
      title: "Transferred Quantity",
      dataIndex: "totalQuantity",
      key: "totalQuantity",
    },
    {
      title: "Transferred Amount",
      dataIndex: "totalPurchaseAmount",
      key: "totalPurchaseAmount",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "transferStatus",
      key: "transferStatus",
    },
  ];
  const filters = [
    storeFilter,
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Pending", value: "PENDING" },
        { label: "Accepted", value: "ACCEPTED" },
        { label: "Cancelled", value: "CANCELLED" },
      ],
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[200px]",
    },
    {
      key: "transfer",
      label: "Transfer Type",
      type: "select",
      options: [
        { label: "Incoming", value: "INCOMING" },
        { label: "Outgoing", value: "OUTGOING" },
      ],
      className: "min-w-[130px] max-w-[150px]",
      popupClassName: "w-[200px]",
    },
  ];

  useEffect(() => {
    dispatch(loadAllStockTransferPaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <Card
      className='max-md:border-0 max-md:bg-white'
      bodyClass='max-md:p-0 '
      headClass='border-none'
      title={"Stock Transfer"}
      extra={
        <>
          <CreateButton
            to='/admin/stock-transfer/add'
            title='Create Stock Transfer'
          />
        </>
      }
    >
      <UserPrivateComponent permission={"readAll-stockTransfer"}>
        <TableComponent
          list={list}
          columns={columns}
          loading={loading}
          total={total}
          setPageConfig={setPageConfig}
          title={"Stock transfer List"}
          filters={filters}
          isSearch
        />
      </UserPrivateComponent>
    </Card>
  );
}
