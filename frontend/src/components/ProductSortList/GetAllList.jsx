import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../../UI/Card";
import {
  clearProductSortList,
  loadAllProductSortList,
} from "../../redux/rtk/features/productSortList/ProductSortListSlice";
import ViewBtn from "../Buttons/ViewBtn";
import CreateDrawer from "../CommonUi/CreateDrawer";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddPurchaseOrder from "../PurchaseOrderList/AddPurchaseOrder";
import TableComponent from "./TableComponent";

const GetAllList = () => {
  const dispatch = useDispatch();
  const [productList, setProductList] = useState([]);
  const { list, loading, total } = useSelector(
    (state) => state.productSortList
  );
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 100,
    status: "true",
  });
  const [storeId, setStoreId] = useState();

  const columns = [
    {
      id: 2,
      title: "ID",
      dataIndex: "product",
      key: "id",
      render: ({ id }) => <Link to={`/admin/product/${id}`}>{id}</Link>,
      renderCsv: ({ id }) => id,
    },
    {
      id: 4,
      title: "Name",
      dataIndex: "product",
      key: "name",
      render: ({ id, name }) => <Link to={`/admin/product/${id}`}>{name}</Link>,
      renderCsv: (name) => name,
      tdClass: "whitespace-normal",
    },
    {
      id: 3,
      title: "SKU",
      dataIndex: "product",
      render: ({ sku }) => sku,
      renderCsv: ({ sku }) => sku,
      key: "sku",
    },

    {
      id: 6,
      title: "QTY",
      dataIndex: "productQuantity",
      key: "productQuantity",
    },
    {
      id: 7,
      title: "Purchase price",
      dataIndex: "productPurchasePrice",
      key: "productPurchasePrice",
      responsive: ["md"],
    },
    {
      id: 8,
      title: "Sale price",
      dataIndex: "productSalePrice",
      key: "productSalePrice",
      responsive: ["md"],
    },

    {
      id: 12,
      title: "Reorder QTY",
      dataIndex: "reorderQuantity",
      key: "reorderQuantity",
    },
    {
      id: 13,
      title: "Action",
      key: "action",
      render: ({ product }) => (
        <div className='flex'>
          <ViewBtn path={`/admin/product/${product?.id}`} />
        </div>
      ),
      csvOff: true,
    },
  ];

  useEffect(() => {
    dispatch(loadAllProductSortList(pageConfig));
    return () => {
      dispatch(clearProductSortList());
    };
  }, [dispatch, pageConfig]);

  return (
    <Card
      className='max-md:border-0 max-md:bg-white'
      bodyClass='max-md:p-0 '
      headClass='border-none'
      title={"Product Short List"}
      extra={
        productList.length ? (
          <>
            <CreateDrawer
              permission={"create-product"}
              title={"Create Purchase Order"}
            >
              <AddPurchaseOrder list={productList} storeId={storeId} />
            </CreateDrawer>
          </>
        ) : (
          <button
            disabled
            title='Select at least one product'
            className={`xs:px-3 px-2 md:text-base py-[6px] lg:px-5  border bg-gray-400
                    text-white rounded cursor-not-allowed`}
          >
            <span className='flex items-center justify-center gap-1 md:gap-2 '>
              <PlusOutlined />
              <span className=''>Create Purchase Order</span>
            </span>
          </button>
        )
      }
    >
      <UserPrivateComponent permission={"readAll-reorderQuantity"}>
        <TableComponent
          list={list}
          total={total}
          loading={loading}
          columns={columns}
          csvFileName='Product Sort List'
          paginatedThunk={loadAllProductSortList}
          setProductList={setProductList}
          productList={productList}
          setStoreId={setStoreId}
          storeId={storeId}
        />
      </UserPrivateComponent>
    </Card>
  );
};

export default GetAllList;
