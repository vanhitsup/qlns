import Card from "@/UI/Card";
import ViewBtn from "@/components/Buttons/ViewBtn";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableNoPagination from "@/components/CommonUi/TableNoPagination";
import Loader from "@/components/Loader/Loader";
import {
  clearAward,
  loadSingleAward,
} from "@/redux/rtk/features/hrm/award/awardSlice";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import UpdateAward from "./UpdateAward";

const DetailsAward = () => {
  const { id } = useParams();

  //dispatch
  const dispatch = useDispatch();
  const { award, loading } = useSelector((state) => state.award);

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
      dataIndex: "user",
      key: "name",
      render: (user) => `${user.username}`,
      renderCsv: (user) => `${user.username}`,
    },

    {
      id: 1,
      title: "Awarded Date",
      dataIndex: "awardedDate",
      key: "awardedDate",
      render: (awardedDate) => dayjs(awardedDate).format("DD/MM/YYYY"),
      renderCsv: (awardedDate) => dayjs(awardedDate).format("DD/MM/YYYY"),
    },
    {
      id: 1,
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      render: (comment) => comment,
      renderCsv: (comment) => comment,
    },
    {
      id: 4,
      title: "",
      key: "action",
      render: ({ user }) => [
        {
          label: <ViewBtn title={"View"} path={`/admin/staff/${user.id}`} />,
          key: "view",
        },
      ],
      csvOff: true,
    },
  ];

  useEffect(() => {
    dispatch(loadSingleAward(id));
    return () => {
      dispatch(clearAward());
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
        {award ? (
          <Card
            className="border-0 md:border md:p-6 bg-transparent md:bg-[#fafafa]"
            bodyStyle={{ padding: 0 }}
            key={award.id}>
            <div className="md:flex flex justify-between md:mb-8 items-center gap-2">
              <h5 className="flex items-center">
                <span className=" font-semibold">{award.name}</span>
              </h5>
              <div className="flex items-center gap-2">
                <CreateDrawer
                  permission={"update-award"}
                  title={"Update Award"}
                  update
                  color={"bg-gray-700"}
                  width={30}>
                  <UpdateAward award={award} />
                </CreateDrawer>
              </div>
            </div>
            <TableNoPagination
              list={award?.awardHistory}
              columns={columns}
              csvFileName={"Award list"}
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

export default DetailsAward;
