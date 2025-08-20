import ChangePassword from "@/CustomerUI/ChangePassword";
import Button from "@/UI/Button";
import Menu from "@/UI/Menu";
import { Modal, Popover, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadSingleCustomerEcom } from "@/redux/rtk/features/eCommerce/customer/customerSlice";
import { nameRender } from "@/utils/functions";
import UpdateProfile from "./UpdateProfile";
import Tabs, { Tab } from "@/UI/Tabs";
import Orders from "@/eCommerce/UserAccount/Orders";

export default function MyAccount() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { customer, loading } = useSelector((state) => state.customerECommerce);

  const [changePasswordModal, setChangePasswordModal] = useState(false);

  const handleChangePassword = () => {
    setChangePasswordModal(true);
  };
  const handleChangeModal = () => {
    setChangePasswordModal(false);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // const handleChange = (value, name) => {
  //   setPageConfig((prev) => {
  //     return {
  //       ...prev,
  //       [name]: value,
  //       page: 1,
  //     };
  //   });
  // };

  const logOut = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  useEffect(() => {
    dispatch(loadSingleCustomerEcom());
  }, [dispatch]);
  const handleOnError = (e) => {
    e.target.src = "/images/default.jpg";
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between gap-5">
        {/*===================================================
                         Profile Container
          ======================================================*/}
        <div className="w-full lg:w-1/3 bg-slate-100  rounded p-5">
          <div className="flex justify-between items-center pb-7">
            <div className="flex justify-between items-center text-[14px]">
              <h3> Profile</h3>
            </div>

            <span>
              <Popover
                content={
                  <Menu
                    items={[
                      {
                        key: "1",
                        label: (
                          <button
                            onClick={showModal}
                            className="text-gray-500  hover:bg-slate-200 w-full p-1 text-start -my-3 rounded px-2">
                            Edit
                          </button>
                        ),
                      },

                      {
                        key: "change-password",
                        label: (
                          <button
                            onClick={handleChangePassword}
                            className="text-gray-500 hover:bg-slate-200 w-full p-1 text-start -my-3 rounded px-2">
                            Change Password
                          </button>
                        ),
                      },
                      {
                        key: "logout",
                        label: (
                          <button
                            onClick={logOut}
                            className="text-red-500  hover:bg-slate-200 w-full p-1 text-start -my-3 rounded px-2">
                            Logout
                          </button>
                        ),
                      },
                    ]}
                  />
                }
                placement="bottomRight"
                arrow={false}
                trigger="click">
                <Button
                  color={"gray"}
                  icon={<BsThreeDotsVertical size={15} />}
                  className=" p-1 rounded"></Button>
              </Popover>
            </span>
          </div>
          {loading && (
            <div>
              <div className="flex justify-center my-2">
                <span className="h-[80px] animate-pulse w-[80px] bg-gray-200 rounded-full"></span>
              </div>
              <div>
                <Skeleton active />
              </div>
            </div>
          )}
          {customer && !loading && (
            <div>
              <div className="flex justify-center my-2">
                {customer.profileImage ? (
                  <img
                    onError={handleOnError}
                    className="h-[80px] w-[80px] border-[3px] border-ePrimary rounded-full"
                    src={customer.profileImage}
                    alt="icon"
                  />
                ) : (
                  <FaUser size={80} className="text-gray-600 rounded-full " />
                )}
              </div>
              <div className="text-[14px]">
                <p className="py-1 text-[18px] text-center">
                  {nameRender(customer)}
                </p>
                <p className="text-gray-600 text-center">{customer?.phone}</p>
                <p className="text-gray-600 text-center">{customer?.email}</p>
              </div>
            </div>
          )}
        </div>

        {/*===================================================
                             Address Book Container
        ======================================================*/}
        <div className="w-full lg:w-2/3 bg-slate-100 rounded p-5">
          {/* Address title */}
          <div className=" flex  items-center text-[14px]">
            <h3>Shipping Address </h3>
            {/* <span className='px-2'>|</span>
            <button
              onClick={() => Navigate("/user")}
              className='text-ePrimary text-[12px] bg-ePrimary/10 px-1 rounded-sm '
            >
              Edit
            </button> */}
          </div>

          <div className="flex justify-between pt-2">
            <div>
              <p className="mt-2 ml-4">{customer?.address}</p>
            </div>
            {/* <div className="w-1/2 border-r">
              <span className="text-[12px] text-gray-600 py-4 inline-block">
                DELIVERY ADDRESS
              </span>
              <div>
                <h3 className="text-[12px] font-semibold  pb-1">Tanvir </h3>
                <p className="text-[12px] text-gray-600">shapla Sarani</p>
                <p className="text-[12px] text-gray-600">
                  {" "}
                  Dhaka - Dhaka - North - Shewrapara
                </p>
                <p className="text-[12px] text-gray-600">(+880) 1741940694</p>
              </div>
            </div> */}

            {/* <div className='w-1/2 pl-4'>
              <span className='text-[12px] text-gray-600 py-4 inline-block'>
                {" "}
                BILLING ADDRESS
              </span>
              <div>
                <h3 className='text-[12px] font-semibold  pb-1'>Tanvir </h3>
                <p className='text-[12px] text-gray-600'>shapla Sarani</p>
                <p className='text-[12px] text-gray-600'>
                  {" "}
                  Dhaka - Dhaka - North - Shewrapara
                </p>
                <p className='text-[12px] text-gray-600'>(+880) 1741940694</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/*===================================================
                        Order Table 
      ======================================================*/}
      <div className="bg-slate-100 my-4 p-5 table-container eCommerce">
        <Tabs>
          <Tab label="Order">
            <Orders />
          </Tab>
        </Tabs>
      </div>

      {/*===================================================
                        update profile modal
      ======================================================*/}
      {customer && (
        <Modal
          open={isModalOpen}
          width={400}
          onCancel={handleCancel}
          title={"Update Profile"}
          footer={null}>
          <UpdateProfile handleCancel={handleCancel} customer={customer} />
        </Modal>
      )}

      <Modal
        open={changePasswordModal}
        onCancel={handleChangeModal}
        footer={null}
        width={400}
        title={"Change Password"}>
        <ChangePassword />
      </Modal>
    </div>
  );
}
