import Card from "@/UI/Card";
import Modal from "@/UI/Modal";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import { loadAllEmailPaginated } from "@/redux/rtk/features/email/emailSlice";
import { stringShorter } from "@/utils/functions";
import { Tag } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddEmail from "./AddEmail";
import DetailsEmail from "./DetailsEmail";

export default function GetAllEmail() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const { list, loading, total } = useSelector((state) => state.email);
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
  });

  const columns = [
    {
      title: "Subject",
      key: "Subject",
      render: (email) => (
        <div className="cursor-pointer" onClick={() => setEmail(email)}>
          {stringShorter(email.subject, 30)}
        </div>
      ),
    },

    {
      title: "Owner",
      dataIndex: "emailOwner",
      key: "owner",
      render: (emailOwner, item) => (
        <Link to={`/admin/staff/${item?.emailOwnerId}`}>
          {emailOwner?.firstName} {emailOwner?.lastName}
        </Link>
      ),
      renderCsv: (emailOwner) =>
        `${emailOwner?.firstName} ${emailOwner?.lastName}`,
    },

    {
      title: "Status",
      key: "emailStatus",
      dataIndex: "emailStatus",
      render: (emailStatus) => {
        if (emailStatus === "sent") {
          return <Tag color="green">{emailStatus.toUpperCase()}</Tag>;
        } else if (emailStatus === "failed") {
          return <Tag color="red">{emailStatus.toUpperCase()}</Tag>;
        }
      },
      renderCsv: (emailStatus) => emailStatus,
    },
    {
      title: "Create date",
      key: "Create date",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("ll"),
      renderCsv: (date) => moment(date).format("ll"),
    },
  ];

  useEffect(() => {
    dispatch(loadAllEmailPaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <Card
      className="max-md:border-0 max-md:bg-white"
      bodyClass="max-md:p-0 "
      headClass="border-none"
      title={"Email"}
      extra={
        <CreateDrawer
          permission={"create-email"}
          title={"Create Email"}
          width={50}>
          <AddEmail />
        </CreateDrawer>
      }>
      <UserPrivateComponent permission={"readAll-email"}>
        <TableComponent
          list={list}
          columns={columns}
          loading={loading}
          total={list}
          setPageConfig={setPageConfig}
          title={"Email List"}
          isSearch
        />
      </UserPrivateComponent>
      <Modal
        open={email}
        onClose={() => setEmail(false)}
        className="md:w-[80%] md:h-[80%]">
        <DetailsEmail email={email} />
      </Modal>
    </Card>
  );
}
