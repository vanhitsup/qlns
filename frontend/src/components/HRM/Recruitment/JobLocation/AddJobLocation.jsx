import { addJobLocation, loadAllJobLocationPaginated } from "@/redux/rtk/features/hrm/jobLocation/jobLocationSlice";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";

const AddJobLocation = () => {
    const [form] = Form.useForm();
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();

    const onFinish = async (values) => {
      setLoader(true);
      try{
        const resp = await dispatch(addJobLocation(values));

        if (resp.payload.message === "success") {
            form.resetFields();
            dispatch(loadAllJobLocationPaginated({
              page: 1,
              count: 10,
              status: 'true',
            }
          ))
        }
        setLoader(false);
      }catch(err){

      }
       
    };

    // const onFinishFailed = (errorInfo) => {
    //     toast.warning("Failed at adding Job Location");
    // };

    return (
        <Form
            style={{ marginBottom: "40px" }}
            form={form}
            eventKey={"jobLocation-form"}
            name="basic"
            className="mx-4"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
        >
            <div>
                <Form.Item
                    style={{ marginBottom: "10px" }}
                    label={"Country"}
                    name={"countryName"}
                    rules={[
                        {
                            required: true,
                            message: "please Input Country Name",
                        },
                    ]}
                >
                    <Input placeholder="Bangladesh" />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: "10px" }}
                    label={"Location"}
                    name={"jobLocation"}
                    rules={[
                        {
                            required: true,
                            message: "please Input Location",
                        },
                    ]}
                >
                    <Input placeholder="Dhaka" />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: "10px" }}
                    wrapperCol={{
                        offset: 6,
                        span: 12,
                    }}
                >
                    <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        block
                        loading={loader}
                    >
                        Add Job Location
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default AddJobLocation;