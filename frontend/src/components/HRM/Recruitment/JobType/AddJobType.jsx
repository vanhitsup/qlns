import { addJobType, loadAllJobTypePaginated } from "@/redux/rtk/features/hrm/JobType/jobTypeSlice";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";

const AddJobType = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [loader, setLoader] = useState(false);



    const onFinish = async (values) => {
        setLoader(true)
        try{
            const resp = await dispatch(addJobType(values));
            if(resp.payload.message === "success"){
                form.resetFields();
                dispatch(loadAllJobTypePaginated({
                    page: 1,
                    count: 10,
                    status: 'true',
                  }))
            }
            setLoader(false)    
        }catch(err){

        }
        
    };


    return (
        <Form
            style={{ marginBottom: "40px" }}
            form={form}
            eventKey={"jobType-form"}
            name="basic"
            className="mx-4"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
        >
            <div>
                <Form.Item
                    style={{ marginBottom: "10px" }}
                    label={"Job Type Name"}
                    name={"jobTypeName"}
                    rules={[
                        {
                            required: true,
                            message: "please Input Job Type Name",
                        },
                    ]}
                >
                    <Input placeholder="Full Time" />
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
                        Add Job Type
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default AddJobType;