
import { loadAllJobCategory } from "@/redux/rtk/features/hrm/jobCategory/jobCategorySlice";
import { loadAllJobSkillsPaginated, updateJobSkills } from "@/redux/rtk/features/hrm/jobSkills/jobSkillsSlice";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const UpdateJobSkills = ({handleCancel}) => {
    const dispatch = useDispatch();
    const { Option } = Select;
    const [form] = Form.useForm();
    const [loader, setLoader] = useState(false);
    const {list:jobCategory,loading:jobCategoryLoading} = useSelector(state => state.jobCategory)
    const {edit} =  useSelector(state=> state.jobSkills);
    const onFinish = async (values) => {
        setLoader(true);
        try{
            const resp = await dispatch(updateJobSkills({id:edit.id,values:values}));
            if (resp.payload.message === "success") {
                handleCancel();
                dispatch(loadAllJobSkillsPaginated({
                    page: 1,
                    count: 10,
                    status: 'true',
                  }))
            }
            setLoader(false);    
        }catch(err){

        }
       
    };

    // const onFinishFailed = (errorInfo) => {
    //     toast.warning("Failed at adding Job Skill");
    // };

    useEffect(() => {
        form.setFieldValue("jobCategoryId", edit.jobCategoryId);
        form.setFieldValue("jobSkillName", edit.jobSkillName);
      }, [form, edit]);
    
    useEffect(()=>{
        dispatch(loadAllJobCategory())
    },[dispatch])
    return (
        <Form
            style={{ marginBottom: "40px" }}
            form={form}
            eventKey={"jobSkills-form"}
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
                    name={"jobCategoryId"}
                    rules={[
                        {
                            required: true,
                            message: "please Input Job Category!",
                        },
                    ]}
                >
                    <Select
                        loading={jobCategoryLoading}
                        size="middle"
                        mode="single"
                        allowClear
                        style={{
                            width: "100%",
                        }}
                        placeholder="Please select Job Category"
                    >
                        {jobCategory &&
                            jobCategory.map((jobCategory) => (
                                <Option
                                    key={jobCategory.id}
                                    value={jobCategory.id}
                                >
                                    {jobCategory.jobCategoryName}
                                </Option>
                            ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: "10px" }}
                    label={"Job Skill"}
                    name={"jobSkillName"}
                    rules={[
                        {
                            required: true,
                            message: "please Input Job Skill",
                        },
                    ]}
                >
                    <Input placeholder="React.js" />
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
                        Update Job Skills
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default UpdateJobSkills;