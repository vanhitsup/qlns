
import { addJobWorkExperience, loadAllJobWorkExperiencePaginated } from "@/redux/rtk/features/hrm/jobWorkExperience/jobWorkExperienceSlice";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";

const AddJobWorkExperience = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [loader, setLoader] = useState(false);



    const onFinish = async (values) => {
        setLoader(true)
        try{
            const resp = await dispatch(addJobWorkExperience(values));
            if(resp.payload.message === "success"){
                form.resetFields();
                dispatch(loadAllJobWorkExperiencePaginated({
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
        eventKey={"jobWorkExperience-form"}
        name="basic"
        className="mx-4"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
    >
        <div>
            <Form.Item
                style={{ marginBottom: "10px" }}
                label={"Work Experience"}
                name={"workExperience"}
                rules={[
                    {
                        required: true,
                        message: "please Input Job Work Experience",
                    },
                ]}
            >
                <Input placeholder="1-2 years" />
            </Form.Item>

            <Form.Item
                style={{ marginBottom: "10px" }}
                className="flex justify-center"
            >
                <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    block
                    loading={loader}
                >
                    Add Job Work Experience
                </Button>
            </Form.Item>
        </div>
    </Form>
    );
};

export default AddJobWorkExperience;