import Card from "@/UI/Card";
import CommonDelete from "@/components/CommonUi/CommonDelete";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UpdateDrawer from "@/components/CommonUi/UpdateDrawer";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddPriority from "./AddPriority";
import {
  clearPriorityEdit,
  deletePriority,
  editPriority,
  loadAllPriority,
} from "@/redux/rtk/features/priority/prioritySlice";

export default function GetAllPriority() {
  const dispatch = useDispatch();
  const { list, loading, total, edit } = useSelector((state) => state.priority);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Create date",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("ll"),
    },

    {
      id: 3,
      title: "",
      key: "action",
      render: ({ id, name }) => [
        {
          label: (
            <div
              onClick={() => dispatch(editPriority({ id, values: { name } }))}
              className="flex items-center gap-2 cursor-pointer"
            >
              <EditOutlined className=" rounded-md" />
              Edit
            </div>
          ),
          key: "edit",
        },
        {
          label: (
            <CommonDelete
              id={id}
              title={"delete"}
              permission={"delete-priority"}
              deleteThunk={deletePriority}
              loadThunk={loadAllPriority}
            />
          ),
          key: "delete",
        },
      ],

      csvOff: true,
    },
  ];

  useEffect(() => {
    dispatch(loadAllPriority());
  }, [dispatch]);

  return (
    <Card
      className="max-md:border-0 max-md:bg-white"
      bodyClass="max-md:p-0 "
      headClass="border-none"
      title={"Priority"}
      extra={
        <CreateDrawer
          permission={"create-priority"}
          title={"Create priority"}
          width={35}
        >
          <AddPriority />
        </CreateDrawer>
      }
    >
      <UserPrivateComponent permission={"readAll-priority"}>
        <TableComponent
          list={list}
          columns={columns}
          loading={loading}
          total={total}
          title={"Priority List"}
          isSearch={false}
        />
      </UserPrivateComponent>
      <UpdateDrawer
        permission={"update-priority"}
        title={"Update priority"}
        width={35}
        open={edit}
        setClose={clearPriorityEdit}
      >
        <AddPriority edit={edit} />
      </UpdateDrawer>
    </Card>
  );
}
