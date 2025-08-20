

import { addJobCategory, loadAllJobCategoryPaginated, updateJobCategory } from "@/redux/rtk/features/hrm/jobCategory/jobCategorySlice";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UpdateJobCategory = ({handleCancel}) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [loader, setLoader] = useState(false);
    const {jobCategory} = useSelector(state=>state.jobCategory);


    const onFinish = async (values) => {
        setLoader(true)
        try{
            const resp = await dispatch(updateJobCategory({id:jobCategory.id,values:values}));
            if(resp.payload.message === "success"){
                handleCancel()
                dispatch(loadAllJobCategoryPaginated({
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
        form.setFieldValue("jobCategoryName", jobCategory.jobCategoryName);
      }, [form, jobCategory]);


    return (
        <Form
            style={{ marginBottom: "40px" }}
            form={form}
            eventKey={"jobCategory-form"}
            name="basic"
            className="mx-4"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
        >
            <div>
                <Form.Item
                    style={{ marginBottom: "10px" }}
                    label={"Job Category"}
                    name={"jobCategoryName"}
                    rules={[
                        {
                            required: true,
                            message: "please Input Job Category Name",
                        },
                    ]}
                >
                    <Input placeholder="Engineering" />
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
                        Update Job Category
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default UpdateJobCategory;