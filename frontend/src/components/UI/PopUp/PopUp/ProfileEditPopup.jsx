import { loadAllStore } from "@/redux/rtk/features/store/storeSlice";
import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadAllDepartment } from "../../../../redux/rtk/features/hrm/department/departmentSlice";
import { loadAllEmployeeStatus } from "../../../../redux/rtk/features/hrm/employeeStatus/employeeStatusSlice";
import { loadAllRole } from "../../../../redux/rtk/features/hr/role/roleSlice";
import { loadAllShift } from "../../../../redux/rtk/features/hrm/shift/shiftSlice";
import {
  loadSingleStaff,
  updateStaff,
} from "../../../../redux/rtk/features/hrm/user/userSlice";
import BtnEditSvg from "../../Button/btnEditSvg";

const ProfileEditPopup = ({ data }) => {
  let { id } = useParams("id");
  const dispatch = useDispatch();
  const [loader, setLoader] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { list: shift } = useSelector((state) => state.shift);
  const { list: store, loading: storeLoading } = useSelector(
    (state) => state.store
  );
  const { user } = useSelector((state) => state.users);
  const { Option } = Select;
  const { list } = useSelector((state) => state.role);
  const { list: department } = useSelector((state) => state.department);
  const { list: employmentStatus } = useSelector(
    (state) => state.employmentStatus
  );
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    setInitialValues({
      firstName: user?.firstName ? user.firstName : "",
      lastName: user?.lastName ? user.lastName : "",
      username: user?.username ? user.username : "",
      email: user?.email ? user.email : "",
      phone: user?.phone ? user.phone : "",
      street: user?.street ? user.street : "",
      city: user?.city ? user.city : "",
      state: user?.state ? user.state : "",
      zipCode: user?.zipCode ? user.zipCode : "",
      country: user?.country ? user.country : "",
      joinDate: user?.joinDate ? dayjs(user?.joinDate) : "",
      leaveDate: user?.leaveDate ? dayjs(user.leaveDate) : "",
      employeeId: user?.employeeId ? user.employeeId : "",
      bloodGroup: user?.bloodGroup ? user.bloodGroup : "",
      image: user?.image ? user.image : "",
      roleId: user?.roleId ? user.roleId : "",
      departmentId: user?.departmentId ? user.departmentId : "",
      shiftId: user?.shiftId ? user.shiftId : "",
      commissionType: user?.commissionType,
      commissionValue: user?.commissionValue,
      employmentStatusId: user?.employmentStatusId
        ? user.employmentStatusId
        : "",
      storeId: user?.usersStore?.map((store) => store.storeId),
    });
  }, [user]);

  const [form] = Form.useForm();
  const userId = localStorage.getItem("id");

  const onFinish = async (values) => {
    setLoader(true);

    try {
      let ownUser;
      if (
        (userId === id && values.password) ||
        (userId === id && user?.username !== values.username)
      ) {
        const result = window.confirm(
          "Before changing your password or username, make sure you are certain about the change. After making the change, you will need to log in again."
        );
        if (!result) {
          setLoader(false);
          return;
        }
        ownUser = true;
      }

      const resp = await dispatch(
        updateStaff({
          id: id,
          values,
        })
      );
      if (resp.payload.message === "success") {
        setIsModalOpen(false);
        setLoader(false);
        dispatch(loadSingleStaff(id));
        if (ownUser) {
          window.location.replace("/");
          localStorage.clear();
        }
      } else {
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setLoader(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]; // blood groups

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    dispatch(loadAllRole());
    dispatch(loadAllDepartment());
    dispatch(loadSingleStaff(id));
    dispatch(loadAllShift());
    dispatch(loadAllEmployeeStatus());
    dispatch(loadAllStore());
  }, [dispatch, id]);

  id = parseInt(id);
  return (
    <>
      <button onClick={showModal}>
        <BtnEditSvg size={30} />
      </button>
      <Modal
        width={"50%"}
        title='Update Employee Information'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          size='small'
          form={form}
          name='basic'
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          initialValues={initialValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <h2 className='text-center text-xl mt-3 mb-3 txt-color'>
            User Information
          </h2>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label='First Name'
            name='firstName'
          >
            <Input placeholder='John' />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label='Last Name'
            name='lastName'
          >
            <Input placeholder='Doe' />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label='Username'
            name='username'
          >
            <Input placeholder='john_doe' />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label='Password'
            name='password'
          >
            <Input placeholder='Strong Password' />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label='Email'
            name='email'
          >
            <Input placeholder='johndoe2@example.com' />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label='Phone'
            name='phone'
          >
            <Input placeholder='1234584515' />
          </Form.Item>

          <h2 className='text-center text-xl mt-3 mb-3 txt-color'>
            Address Information
          </h2>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label='Street'
            name='street'
          >
            <Input placeholder='123 Main Street' style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item style={{ marginBottom: "10px" }} label='City' name='city'>
            <Input placeholder='Los Angeles' />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label='State'
            name='state'
          >
            <Input placeholder='CA' />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label='Zip Code'
            name='zipCode'
          >
            <Input placeholder='90211' />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label='Country'
            name='country'
          >
            <Input placeholder='USA' />
          </Form.Item>

          <h2 className='text-center text-xl mt-3 mb-3 txt-color'>
            {" "}
            Employee Information{" "}
          </h2>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label='Joining Date'
            name='joinDate'
            valuePropName='date'
          >
            <DatePicker
              className='date-picker hr-staffs-date-picker'
              defaultValue={initialValues.joinDate}
            />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label='Leave Date'
            name='leaveDate'
            valuePropName='leaveDate'
          >
            <DatePicker className='date-picker hr-staffs-date-picker' />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label='Employee ID'
            name='employeeId'
          >
            <Input placeholder='OE-012' />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label='Blood Group'
            name='bloodGroup'
          >
            <Select
              placeholder='Select Blood Group'
              allowClear
              defaultValue={initialValues.bloodGroup}
              mode='single'
              size='middle'
              style={{
                width: "100%",
              }}
            >
              {bloodGroups.map((bloodGroup) => (
                <Option key={bloodGroup} value={bloodGroup}>
                  {bloodGroup}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {/* TODO: Add a Upload Seciton for Image */}

          <Form.Item
            name={"departmentId"}
            style={{ marginBottom: "10px" }}
            label='Department'
          >
            <Select placeholder='Select Department' allowClear size={"middle"}>
              {department &&
                department.map((department) => (
                  <Option key={department.id} value={department.id}>
                    {department.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name={"employmentStatusId"}
            style={{ marginBottom: "10px" }}
            label='Employment Status'
          >
            <Select placeholder='Select Department' allowClear size={"middle"}>
              {employmentStatus &&
                employmentStatus.map((employmentStatus) => (
                  <Option key={employmentStatus.id} value={employmentStatus.id}>
                    {employmentStatus.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          {id !== 1 && (
            <Form.Item
              label='Role'
              name={"roleId"}
              style={{ marginBottom: "10px" }}
            >
              <Select
                defaultValue={initialValues.roleId}
                loading={!list}
                size='middle'
                mode='single'
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder='Please select Role'
              >
                {list &&
                  list.map((role) => (
                    <Option key={role.id} value={role.id}>
                      {role.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          )}

          <Form.Item
            label='Shift'
            name={"shiftId"}
            style={{ marginBottom: "10px" }}
          >
            <Select
              defaultValue={initialValues.shiftId}
              loading={!shift}
              size='middle'
              mode='single'
              allowClear
              style={{
                width: "100%",
              }}
              placeholder='Please select shift'
            >
              {shift &&
                shift.map((shift) => (
                  <Option key={shift.id} value={shift.id}>
                    {shift.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          {id !== 1 && (
            <Form.Item
              style={{ marginBottom: "10px" }}
              label='Select Store'
              name='storeId'
            >
              <Select
                placeholder='Select Store'
                allowClear
                mode='multiple'
                size='middle'
                style={{
                  width: "100%",
                }}
                loading={storeLoading}
              >
                {store?.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item?.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
          <Form.Item
            style={{ marginBottom: "10px" }}
            label='Commission Type'
            name='commissionType'
          >
            <Select
              loading={!list}
              size='middle'
              mode='single'
              allowClear
              style={{
                width: "100%",
              }}
              placeholder='Please select'
            >
              <Option key={"percentage"} value={"percentage"}>
                Percentage
              </Option>
              <Option key={"flat"} value={"flat"}>
                Flat
              </Option>
            </Select>
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label='Commission Value'
            name='commissionValue'
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "10px", marginTop: "10px" }}
            wrapperCol={{
              offset: 5,
              span: 15,
            }}
          >
            <Button
              className='mt-5'
              block
              type='primary'
              shape='round'
              htmlType='submit'
              loading={loader}
            >
              Update Employee
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ProfileEditPopup;
