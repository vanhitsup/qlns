import Table from "@/UI/Table";
import { SolutionOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Card from "../../../UI/Card";
import {
  clearEmployeeStatus,
  loadSingleEmployeeStatus,
} from "../../../redux/rtk/features/hrm/employeeStatus/employeeStatusSlice";
import ViewBtn from "../../Buttons/ViewBtn";
import Loader from "../../Loader/Loader";

export default function DetailsEmploymentStatus() {
  const { id } = useParams();

  //dispatch
  const dispatch = useDispatch();
  const { employeeStatus, loading } = useSelector(
    (state) => state.employmentStatus
  );
  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Link
          className="hover:text-primary duration-200"
          to={`/admin/staff/${id}`}>
          {id}
        </Link>
      ),
      renderCsv: (id) => id,
    },

    {
      id: 2,
      title: "User Name",
      dataIndex: "",
      key: "username",
      render: ({ id, username }) => (
        <Link
          className="hover:text-primary duration-200"
          to={`/admin/staff/${id}`}>
          {username}
        </Link>
      ),
      renderCsv: ({ username }) => username,
    },
    {
      id: 3,
      title: "Action",
      dataIndex: "",
      key: "action",
      render: ({ id }) => [
        {
          label: <ViewBtn title={"View"} path={`/admin/staff/${id}`} />,
          key: "view",
        },
      ],
      csvOff: true,
    },
  ];

  useEffect(() => {
    dispatch(loadSingleEmployeeStatus(id));
    return () => {
      dispatch(clearEmployeeStatus());
    };
  }, [dispatch, id]);
  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

  return (
    <div>
      {employeeStatus ? (
        <>
          <Card>
            <div className="py-3 px-3 font-semibold space-y-3 text-lg">
              <p>Name: {employeeStatus?.name}</p>
              <p>Description: {employeeStatus?.description}</p>
              <p>
                Weekend Salary:{" "}
                {employeeStatus?.isWeekendPaid === "true" ? "Yes" : "No"}
              </p>
              <p>
                Holiday Salary:{" "}
                {employeeStatus?.isHolidayPaid === "true" ? "Yes" : "No"}
              </p>
            </div>
          </Card>
          <Card
            className="mt-5"
            title={
              <>
                <SolutionOutlined />
                <span className="mr-left">
                  ID : {employeeStatus.id} | {employeeStatus.name}
                </span>
              </>
            }>
            <div>
              <Table
                scroll={{ x: true }}
                loading={!employeeStatus?.user}
                columns={columns}
                data={employeeStatus?.user ? addKeys(employeeStatus?.user) : []}
              />
            </div>
          </Card>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
