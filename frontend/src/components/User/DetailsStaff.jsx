import { Alert, Col, Row } from "antd";
import { Link, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import EmployeeDesignation from "../UI/EmployeeDesignation";
import EmployeeTimeline from "../UI/EmployeeTimeline";

import EmployeeSalary from "../UI/EmployeeSalary";

import EmployeeAward from "../UI/EmployeeAward";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUser,
  loadSingleStaff,
} from "../../redux/rtk/features/hrm/user/userSlice";
import BigDrawer from "../Drawer/BigDrawer";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import BtnEditSvg from "../UI/Button/btnEditSvg";
import AwardAddSinglePopup from "../UI/PopUp/PopUp/AwardHistoryAddSinglePopup";
import DesignationAddSinglePopup from "../UI/PopUp/PopUp/DesignationAddSinglePopup";
import EducationAddSinglePopup from "../UI/PopUp/PopUp/EducationAddSinglePopup";
import SalaryAddSinglePopup from "../UI/PopUp/PopUp/SalaryAddPopup";
import CommissionDetails from "./CommissionDetails";
import UserInfo from "./UserInfo";
import PaySlipDetails from "./PaySlipDetails";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const DetailStaff = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(loadSingleStaff(id));
    return () => {
      dispatch(clearUser());
    };
  }, [dispatch, id]);

  const [collapse, setCollapse] = useState(false);

  return (
    <div>
      {user ? (
        <div>
          <section>
            <div className="flex justify-between ant-card rounded h-auto">
              {/* Profile Card */}

              <div className="flex justify-start">
                <div className="flex justify-center py-8 px-4 mt-4 ml-4">
                  <div className="flex flex-col items-around">
                    <h1 className="text-2xl font-bold txt-color-2 mb-1">
                      {user.username}
                    </h1>
                    <h2 className="text-base font-medium txt-color-secondary mb-1">
                      {user.designationHistory?.length
                        ? user.designationHistory[0].designation?.name
                        : "No Designation"}
                    </h2>
                    <h2 className="text-base font-medium txt-color-secondary mb-1">
                      {user?.email ? user?.email : "No Email"}
                    </h2>

                    <h2 className="text-base font-medium txt-color-secondary mb-1">
                      {user?.role ? user?.role?.name : ""}
                    </h2>

                    <h3 className="text-base font-medium txt-color-secondary">
                      {user.employeeId || "No Employee ID"}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}

              <div className="flex items-start py-8 px-4">
                <UserPrivateComponent permission="update-user">
                  <button className="mr-2 mt-2">
                    <Link to={`/admin/staff/${id}/update`}>
                      <BtnEditSvg size={30} />
                    </Link>
                  </button>
                </UserPrivateComponent>
              </div>
            </div>
          </section>
          {/* infos */}
          <div className="flex gap-3 items-center justify-end px-10 text-lg font-semibold py-4 ">
            <p>See User Information</p>
            {collapse ? (
              <IoIosArrowUp
                size={25}
                className="cursor-pointer"
                onClick={() => setCollapse(false)}
              />
            ) : (
              <IoIosArrowDown
                size={25}
                className="cursor-pointer"
                onClick={() => setCollapse(true)}
              />
            )}
          </div>

          {collapse ? (
            <Row
              className="mt-5"
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
                xl: 32,
              }}>
              <UserInfo user={user} />

              <Col
                xs={24}
                sm={12}
                md={12}
                lg={11}
                xl={11}
                className="new-card rounded h-auto m-2">
                <div className="flex justify-between items-center mt-5">
                  <div className=" text-xl text-center">
                    Designation History
                  </div>
                  <UserPrivateComponent
                    permission={"update-designationHistory"}>
                    <div className="">
                      <BigDrawer title={"Designation History"}>
                        <DesignationAddSinglePopup />
                      </BigDrawer>
                    </div>
                  </UserPrivateComponent>
                </div>

                <hr className="mt-3 mb-3 new-hr" />
                <div className="flex justify-start ml-10">
                  {user.designationHistory?.length ? (
                    <EmployeeDesignation list={user?.designationHistory} />
                  ) : (
                    <div className="mb-10">
                      <p className="text-center mt-3 mb-3">
                        No Education History Found
                      </p>
                      <Alert
                        message="Not found , Click on edit button to add new"
                        type="info"
                        showIcon
                      />
                    </div>
                  )}
                </div>
              </Col>
              <Col
                xs={24}
                sm={12}
                md={12}
                lg={11}
                xl={12}
                className="new-card rounded h-auto m-2 ">
                <div className="flex justify-between items-center mt-5 ">
                  <div className=" text-xl text-center ">Education History</div>
                  <UserPrivateComponent permission={"update-education"}>
                    <div className="">
                      <BigDrawer title={"Designation History"}>
                        <EducationAddSinglePopup />
                      </BigDrawer>
                    </div>
                  </UserPrivateComponent>
                </div>
                <hr className="mt-3 mb-3 new-hr" />

                <div className="flex justify-start ml-10">
                  {user?.education?.length ? (
                    <EmployeeTimeline list={user?.education} edit={true} />
                  ) : (
                    <div className="mb-10">
                      <p className="text-center mt-3 mb-3">
                        No Education History Found
                      </p>
                      <Alert
                        message="Not found , Click on edit button to add new"
                        type="info"
                        showIcon
                      />
                    </div>
                  )}
                </div>
              </Col>
              <Col
                xs={24}
                sm={12}
                md={12}
                lg={11}
                xl={11}
                className="new-card rounded h-auto m-2 ">
                <div className="flex justify-between items-center mt-5 ">
                  <div className="txt-color-2 text-xl text-center ">
                    Salary History
                  </div>
                  <UserPrivateComponent permission={"update-salaryHistory"}>
                    <div className="">
                      <BigDrawer title={"Salary History"}>
                        <SalaryAddSinglePopup />
                      </BigDrawer>
                    </div>
                  </UserPrivateComponent>
                </div>
                <hr className="mt-3 mb-3 new-hr" />
                <div className="flex justify-start ml-10">
                  {user.salaryHistory?.length ? (
                    <EmployeeSalary list={user?.salaryHistory} edit={true} />
                  ) : (
                    <div className="mb-10">
                      <p className="text-center mt-3 mb-3 ">
                        No Education History Found
                      </p>
                      <Alert
                        message="Not found , Click on edit button to add new"
                        type="info"
                        showIcon
                      />
                    </div>
                  )}
                </div>
              </Col>
              <Col
                xs={24}
                sm={12}
                md={12}
                lg={11}
                xl={12}
                className="new-card rounded h-auto m-2 ">
                <div className="flex justify-between mt-5  items-center">
                  <div className="txt-color-2 text-xl text-center ">
                    Award History
                  </div>

                  <UserPrivateComponent permission={"update-awardHistory"}>
                    <div className="">
                      <BigDrawer title={"Award History"}>
                        <AwardAddSinglePopup />
                      </BigDrawer>
                    </div>
                  </UserPrivateComponent>
                </div>
                <hr className="mt-3 mb-3 new-hr" />
                <div className="flex justify-start ml-10">
                  {user.awardHistory?.length ? (
                    <EmployeeAward list={user?.awardHistory} edit={true} />
                  ) : (
                    <div className="mb-10">
                      <p className="text-center mt-3 mb-3 ">
                        No Award History Found
                      </p>
                      <Alert
                        message="Not found , Click on edit button to add new"
                        type="info"
                        showIcon
                      />
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          ) : (
            ""
          )}

          <div className="mt-5">
            <PaySlipDetails />
          </div>
        </div>
      ) : (
        <div className="mt-10">{loading && <Loader />}</div>
      )}
    </div>
  );
};

export default DetailStaff;
