import Card from "@/UI/Card";
import Table from "@/UI/Table";
import {
  clearEditNote,
  editNote,
} from "@/redux/rtk/features/CRM/note/noteSlice";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Drawer, Modal } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddNote from "../CRM/Note/AddNote";
import DetailsNote from "../CRM/Note/DetailsNote";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import { useState } from "react";

export default function Notes({ data, loading, name, singleLoadThunk }) {
  // Drawer state
  const dispatch = useDispatch();
  const { edit } = useSelector((state) => state.note);
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
      render: (title, note) => (
        <span
          className="cursor-pointer"
          onClick={() => dispatch(editNote(note))}>
          {title}
        </span>
      ),
    },
    {
      title: "Owner",
      dataIndex: "noteOwner",
      key: "owner",
      render: (noteOwner, item) => (
        <Link to={`/admin/staff/${item?.noteOwnerId}`}>
          {noteOwner?.firstName} {noteOwner?.lastName}
        </Link>
      ),
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      render: (description) =>
        description ? `${description.slice(0, 30)}...` : "-",
    },
    {
      title: "Create date",
      key: "Create date",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("MMMM Do YYYY"),
    },
    {
      id: 5,
      title: "",
      key: "action",
      render: (item) => [
        {
          label: (
            <span
              className="cursor-pointer"
              onClick={() => dispatch(editNote(item))}>
              <button className="flex justify-center items-center gap-2 rounded">
                <EyeOutlined /> View
              </button>
            </span>
          ),
          key: "view",
        },
      ],
      csvOff: true,
    },
  ];

  return (
    <Card
      title={
        <div className="flex items-center gap-2">
          <span className="font-bold">Notes</span>
          <UserPrivateComponent permission="create-quote">
            <PlusOutlined
              onClick={() => setOpen(true)}
              className="bg-primary text-white cursor-pointer rounded-sm text-[14px] p-[2px]"
            />
          </UserPrivateComponent>
        </div>
      }>
      <div>
        <UserPrivateComponent permission="readAll-note">
          <Table
            columns={columns}
            loading={loading}
            data={data ? data.note : []}
          />
        </UserPrivateComponent>
      </div>

      <UserPrivateComponent permission="create-quote">
        <Drawer
          onClose={onClose}
          open={open}
          title={"Create Note"}
          width={window.innerWidth <= 768 ? "100%" : "45%"}
          placement="right">
          <div className="mt-4">
            <AddNote
              createAs={{
                values: { [name]: data?.id },
                singleLoadThunk,
                id: data?.id,
                name,
              }}
            />
          </div>
        </Drawer>
      </UserPrivateComponent>

      <UserPrivateComponent permission={"readSingle-note"}>
        <Modal
          footer={null}
          open={edit}
          onCancel={() => dispatch(clearEditNote())}
          width={window.innerWidth > 768 ? "60%" : "100%"}
          closeIcon={null}>
          <DetailsNote
            note={edit}
            onClose={() => dispatch(clearEditNote())}
            load={() => dispatch(singleLoadThunk(data.id))}
          />
        </Modal>
      </UserPrivateComponent>
    </Card>
  );
}
