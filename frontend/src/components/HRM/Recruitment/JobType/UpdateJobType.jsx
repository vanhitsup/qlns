

import { loadAllJobTypePaginated, updateJobType } from "@/redux/rtk/features/hrm/JobType/jobTypeSlice";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UpdateJobType = ({handleCancel}) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [loader, setLoader] = useState(false);
    const {jobType} = useSelector(state=>state.jobType);


    const onFinish = async (values) => {
        setLoader(true)
        try{
            const resp = await dispatch(updateJobType({id:jobType.id,values:values}));
            if(resp.payload.message === "success"){
                handleCancel()
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

    useEffect(() => {
        form.setFieldValue("jobTypeName", jobType.jobTypeName);
      }, [form, jobType]);


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
                    label={"Job Type"}
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
                        Update Job Type
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default UpdateJobType;