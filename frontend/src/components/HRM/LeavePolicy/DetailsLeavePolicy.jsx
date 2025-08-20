import Card from "@/UI/Card";
import ViewBtn from "@/components/Buttons/ViewBtn";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableNoPagination from "@/components/CommonUi/TableNoPagination";
import Loader from "@/components/Loader/Loader";
import {
  clearLeavePolicy,
  loadSingleLeavePolicy,
} from "@/redux/rtk/features/hrm/leavePolicy/leavePolicySlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import UpdateLeavePolicy from "./UpdateLeavePolicy";

const DetailsLeavePolicy = () => {
  const { id } = useParams("id");

  //dispatch
  const dispatch = useDispatch();
  const { leavePolicy, loading } = useSelector((state) => state.leavePolicy);
  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      id: 1,
      title: "Name",
      dataIndex: "username",
      key: "name",
      render: (username) => `${username}`,
      renderCsv: (username) => `${username}`,
    },
    {
      id: 4,
      title: "",
      dataIndex: "",
      key: "action",
      render: ({ user }) => [
        {
          label: <ViewBtn title={"View"} path={`/admin/staff/${user?.id}`} />,
          key: "view",
        },
      ],
      csvOff: true,
    },
  ];

  useEffect(() => {
    dispatch(loadSingleLeavePolicy(id));
    return () => {
      dispatch(clearLeavePolicy());
    };
  }, [dispatch, id]);

  const rightElement = (
    <>
      <h5 className="text-lg">Employee List</h5>
    </>
  );
  return (
    <div>
      <div className="mr-top">
        {leavePolicy ? (
          <Card
            className="border-0 md:border md:p-6 bg-transparent md:bg-[#fafafa]"
            bodyStyle={{ padding: 0 }}
            key={leavePolicy.id}>
            <div className="md:flex flex justify-between md:mb-8 items-center gap-2">
              <h5 className="flex items-center">
                <span className=" font-semibold">{leavePolicy.name}</span>
              </h5>
              <div className="flex items-center gap-2">
                <CreateDrawer
                  permission={"update-leavePolicy"}
                  title={"Update Leave Policy"}
                  update
                  color={"bg-gray-700"}
                  width={30}>
                  <UpdateLeavePolicy leavePolicy={leavePolicy} />
                </CreateDrawer>
              </div>
            </div>
            <TableNoPagination
              list={leavePolicy?.user}
              columns={columns}
              csvFileName={"Leave policy list"}
              rightElement={rightElement}
              loading={loading}
            />
          </Card>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default DetailsLeavePolicy;
