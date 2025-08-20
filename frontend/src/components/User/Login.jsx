import { Button, Card, Form, Input } from "antd";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addUser } from "@/redux/rtk/features/hrm/user/userSlice";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { loadPermissionById } from "@/redux/rtk/features/auth/authSlice";
import { getSetting } from "@/redux/rtk/features/setting/settingSlice";
import LoginTable from "@/components/Card/LoginTable";
import Password from "antd/es/input/Password";

const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading } = useSelector((state) => state?.setting) || {};
  const [imageError, setImageError] = useState();
  const [loader, setLoader] = useState(false);
  const [defaultValue, setDefaultValue] = useState("");

  const onFinish = async (values) => {
    setLoader(true);
    const resp = await dispatch(addUser(values));
    if (resp.payload.message === "success") {
      setLoader(false);
      dispatch(getSetting());
      dispatch(loadPermissionById(resp.payload?.data?.roleId));
    } else {
      setLoader(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    setLoader(false);
  };

  const isLogged = Boolean(localStorage.getItem("isLogged"));
  useEffect(() => {
    if (isLogged) {
      navigate("/admin");
    }
  }, [isLogged, navigate]);

  useEffect(() => {
    if (defaultValue) {
      form.setFieldsValue({
        username: defaultValue[0].username || "",
        password: defaultValue[0].password || "",
      });
    }
  }, [defaultValue, form]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Card bordered={false} className="w-full max-w-[24rem] mt-[30px] mx-auto">
        {data && !loading && (
          <div
            className={`w-[180px] h-[70px] mx-auto flex items-center justify-center  `}>
            {data?.logo && !imageError ? (
              <img
                className="text-white text-center mt-2 mb-1  "
                alt="logo"
                src={data.logo}
                style={{ width: "180PX", height: "70px" }}
                onError={() => setImageError(true)}
              />
            ) : (
              <h2 className=" text-center flex items-center justify-center gap-2 text-[30px]">
                HRM
                <strong style={{ color: "#55F	", fontWeight: "bold" }}>
                  OS
                </strong>
              </h2>
            )}
          </div>
        )}
        {loading && (
          <div>
            {" "}
            <div className={`w-[180px] h-[70px] mx-auto flex flex-col gap-1 `}>
              <h1 className="bg-slate-200 h-4 rounded  w-full  animate-pulse"></h1>
              <h1 className="bg-slate-200 h-4 rounded w-full  animate-pulse"></h1>
              <h1 className="bg-slate-200 h-4 rounded  w-full animate-pulse"></h1>
            </div>
          </div>
        )}

        <h1 className="font-Popins font-semibold text-xl text-center mt-3 pb-4">
          Welcome Back
        </h1>
        <Form
          name="basic"
          form={form}
          onFinish={onFinish}
          initialValues={{
            username: defaultValue[0]?.username || "",
            password: defaultValue[0]?.password || "",
          }}
          // style={{ marginLeft: "20px", marginRight: "20px" }}
          onFinishFailed={onFinishFailed}>
          <Form.Item
            className="mb-4"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}>
            <Input
              prefix={<UserOutlined className="ml-1" />}
              placeholder="Enter username"
            />
          </Form.Item>

          <Form.Item
            className="mb-2"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input password!",
              },
            ]}>
            <Input.Password
              prefix={<LockOutlined className="ml-1" />}
              placeholder="Enter password"
            />
          </Form.Item>

          <Form.Item className="">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full rounded-md font-Popins"
              loading={loader}>
              Login
            </Button>
          </Form.Item>
        </Form>
        <div>
          <LoginTable setDefaultValue={setDefaultValue} />
        </div>
      </Card>
    </div>
  );
};

export default Login;
