import { EditOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../UI/Card";
import {
  deleteCurrency,
  editCurrency,
  loadAllCurrencyPaginated,
} from "../../../redux/rtk/features/eCommerce/currency/currencySlice";
import CommonDelete from "../../CommonUi/CommonDelete";
import CreateDrawer from "../../CommonUi/CreateDrawer";
import TableComponent from "../../CommonUi/TableComponent";
import UserPrivateComponent from "../../PrivacyComponent/UserPrivateComponent";
import AddCurrency from "./AddCurrency";
import UpdateCurrency from "./UpdateCurrency";

export default function GetAllCurrency() {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector((state) => state.currency);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
  });
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      id: 2,
      title: "Name",
      dataIndex: "currencyName",
      key: "currencyName",
    },

    {
      id: 3,
      title: "Symbol",
      dataIndex: "currencySymbol",
      key: "currencySymbol",
      render: (symbol) => (
        <span dangerouslySetInnerHTML={{ __html: symbol }}></span>
      ),

      csvOff: true,
    },
    {
      id: 4,
      title: "",
      key: "action",
      render: (item) => [
        {
          label: (
            <UserPrivateComponent permission={"update-currency"}>
              <div
                onClick={() => {
                  dispatch(editCurrency(item));
                  showModal();
                }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <EditOutlined className="gray-600 rounded-md" />
                Edit
              </div>
            </UserPrivateComponent>
          ),
          key: "edit",
        },
        {
          label: (
            <CommonDelete
              values={{
                id: item.id,
                status: item.status,
              }}
              title={item.status === "true" ? "Hide" : "Show"}
              permission={"delete-currency"}
              deleteThunk={deleteCurrency}
              loadThunk={loadAllCurrencyPaginated}
              query={pageConfig}
              className="bg-white text-black"
            />
          ),
          key: "delete",
        },
      ],

      csvOff: true,
    },
  ];
  const filters = [
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Show", value: "true" },
        { label: "Hide", value: "false" },
      ],
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[100px]",
    },
  ];
  useEffect(() => {
    dispatch(loadAllCurrencyPaginated(pageConfig));
  }, [dispatch, pageConfig]);
  return (
    <>
      <Card
        className="max-md:border-0 max-md:bg-white"
        bodyClass="max-md:p-0 "
        headClass="border-none"
        title={"Currency"}
        extra={
          <CreateDrawer
            permission={"create-currency"}
            title={"Create Currency"}
            width={35}
          >
            <AddCurrency />
          </CreateDrawer>
        }
      >
        <UserPrivateComponent permission={"readAll-currency"}>
          <TableComponent
            total={total}
            columns={columns}
            list={list}
            loading={loading}
            setPageConfig={setPageConfig}
            title={"Currency list"}
            filters={filters}
            isSearch
          />
        </UserPrivateComponent>
      </Card>
      <Modal
        title="Update Currency"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <UpdateCurrency handleCancel={handleCancel} />
      </Modal>
    </>
  );
}
