import { addJobCategory, loadAllJobCategoryPaginated } from "@/redux/rtk/features/hrm/jobCategory/jobCategorySlice";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";

const AddJobCategory = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [loader, setLoader] = useState(false);



    const onFinish = async (values) => {
        setLoader(true)
        try{
            const resp = await dispatch(addJobCategory(values));
            if(resp.payload.message === "success"){
                form.resetFields();
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
                        Add Job Category
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default AddJobCategory;