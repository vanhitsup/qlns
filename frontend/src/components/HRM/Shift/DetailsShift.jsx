import Table from "@/UI/Table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Card from "../../../UI/Card";
import {
  clearShift,
  loadSingleShift,
} from "../../../redux/rtk/features/hrm/shift/shiftSlice";
import ViewBtn from "../../Buttons/ViewBtn";
import CreateDrawer from "../../CommonUi/CreateDrawer";
import Loader from "../../Loader/Loader";
import UpdateShift from "./UpdateShift";

export default function DetailsShift() {
  const { id } = useParams();

  //dispatch
  const dispatch = useDispatch();
  const { shift, loading } = useSelector((state) => state.shift);

  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/admin/staff/${id}`}>{id}</Link>,
    },
    {
      id: 2,
      title: "Name",
      dataIndex: "username",
      key: "username",
      render: (username, { id }) => (
        <Link to={`/admin/staff/${id}`}>{username}</Link>
      ),
    },
    {
      id: 6,
      title: "action",
      key: "Action",
      render: ({ id }) => <ViewBtn path={`/admin/staff/${id}`} />,
    },
  ];

  useEffect(() => {
    dispatch(loadSingleShift(id));
    return () => {
      dispatch(clearShift());
    };
  }, [dispatch, id]);
  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

  return (
    <div>
      {shift ? (
        <Card
          title={<span className="mr-left">{shift.name}</span>}
          extra={
            <>
              <CreateDrawer
                permission={"update-shift"}
                title={"Update Shift"}
                update
                color={"bg-gray-700"}
                width={30}>
                <UpdateShift />
              </CreateDrawer>
            </>
          }>
          <div className="mt-4">
            <Table
              scroll={{ x: true }}
              loading={loading}
              columns={columns}
              data={shift?.user ? addKeys(shift?.user) : []}
            />
          </div>
        </Card>
      ) : (
        <Loader />
      )}
    </div>
  );
}
