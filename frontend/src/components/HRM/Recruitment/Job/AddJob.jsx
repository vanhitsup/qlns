import Button from "@/UI/Button";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import { loadAllJobType } from "@/redux/rtk/features/hrm/JobType/jobTypeSlice";
import { addJob, loadAllJobPaginated } from "@/redux/rtk/features/hrm/job/jobSlice";
import { loadAllJobCategory } from "@/redux/rtk/features/hrm/jobCategory/jobCategorySlice";
import { loadAllJobLocation } from "@/redux/rtk/features/hrm/jobLocation/jobLocationSlice";
import { loadAllJobSkills } from "@/redux/rtk/features/hrm/jobSkills/jobSkillsSlice";
import { loadAllJobWorkExperience } from "@/redux/rtk/features/hrm/jobWorkExperience/jobWorkExperienceSlice";
import { DatePicker, Form, Input, InputNumber, Radio, Row, Select } from "antd";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";

const AddJob = () => {
    const { Option } = Select;
    const dispatch =useDispatch()
    const [loader, setLoader] =  useState(false);
    const [form] = Form.useForm();
    const [rangeValue, setRangeValue] = useState("exactSalary");
    const [jobCategorySelected, setJobCategorySelected] = useState(null);
    const jobCategoryHandler = (value) => {
        setJobCategorySelected(value);
    };


    const {list:jobLocationList, loading:jobLocationLoading} = useSelector(state => state.jobLocation);
    const {list:jobWorkExperienceList,loading:jobWorkExperienceLoading} = useSelector(state => state.jobWorkExperience);
    const {list:jobTypeList,loading:jobTypeLoading} = useSelector(state => state.jobType);
    const {list:jobCategoryList, loading:jobCategoryLoading} = useSelector(state => state.jobCategory);
    const {list:jobSkillsList, loading:jobSkillsLoading} = useSelector(state => state.jobSkills);


   
    const onFinish = async (values) => {
        setLoader(true)
        try {
            values.jobPaySystem = rangeValue;
            const resp = await dispatch(addJob(values));
            if(resp.payload.message === "success"){
                dispatch(loadAllJobPaginated({
                    page: 1,
                    count: 10,
                    status: 'true',
                  }))
            }
        setLoader(false)    
        } catch (error) {
            
        }
    };

    const onFinishFailed = () => {};
    const payBy = ["monthly", "hourly", "daily", "yearly"];

    const onChange = (e) => {
        setRangeValue(e.target.value);
    };

    // Quill modules to add features like toolbar, image upload, etc.
    const textEditorModule = {
        toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline"],
            ["link"],
            [{ color: [] }, { background: [] }],
            ["clean"],
        ],
    };

    // Quill formats to specify allowed styles
    const textEditorFormats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "color",
        "background",
    ];
    useEffect(()=>{
        dispatch(loadAllJobCategory())
        dispatch(loadAllJobLocation())
        dispatch(loadAllJobSkills())
        dispatch(loadAllJobType())
        dispatch(loadAllJobWorkExperience())
    },[dispatch])
    return (
        <>
            <UserPrivateComponent permission={"create-job"}>
                <div
                    className="mr-top mt-5 p-5 ant-card "
                    style={{ maxWidth: "100%" }}
                >
                    <Form
                        size="small"
                        form={form}
                        name="basic"
                        layout="vertical"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <h2 className="text-center text-2xl mt-3 mb-3 txt-color font-bold ">
                            Job Information
                        </h2>
                        
                            
                            <div>
                                <Form.Item
                                    style={{
                                        marginBottom: "12px",
                                    }}
                                    className="w-full"
                                    label="Job Title"
                                    name="jobTitle"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input Job Title!",
                                        },
                                    ]}
                                >
                                    <Input
                                       
                                        placeholder="React.js Developer"
                                    />
                                </Form.Item>
                            </div>

                            <div  className="flex gap-5 ">
                                <Form.Item
                                    style={{ marginBottom: "12px" }}
                                    className="w-full"
                                    label="Start Date"
                                    name="startTime"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input Start Date!",
                                        },
                                    ]}
                                >
                                    <DatePicker className="date-picker hr-staffs-date-picker" />
                                </Form.Item>

                                <Form.Item
                                    style={{ marginBottom: "12px" }}
                                    className="w-full"
                                    label="End Date"
                                    name="endTime"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input End Date!",
                                        },
                                    ]}
                                >
                                    <DatePicker className="date-picker hr-staffs-date-picker" />
                                </Form.Item>
 </div>
 <div  className="flex gap-5 ">
                                <Form.Item
                                className="w-full"
                                    style={{ marginBottom: "12px" }}
                                    label="Job Location"
                                    name="jobLocationId"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input Job Location!",
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Dhaka"
                                        allowClear
                                        loading={jobLocationLoading}
                                        mode="single"
                                        size="middle"
                                        style={{
                                            width: "100%",
                                        }}
                                    >
                                        {jobLocationList &&
                                            jobLocationList.map((location) => (
                                                <Option
                                                    key={location.id}
                                                    value={location.id}
                                                >
                                                    {location.jobLocation},{" "}
                                                    {location.countryName}
                                                </Option>
                                            ))}
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                className="w-full"
                                    style={{ marginBottom: "12px" }}
                                    label="Experience"
                                    name="jobWorkExperienceId"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input Job Work Experience!",
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="1-2 years"
                                        allowClear
                                        loading={jobWorkExperienceLoading}
                                        mode="single"
                                        size="middle"
                                        style={{
                                            width: "100%",
                                        }}
                                    >
                                        {jobWorkExperienceList &&
                                            jobWorkExperienceList.map(
                                                (item) => (
                                                    <Option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.workExperience}
                                                    </Option>
                                                )
                                            )}
                                    </Select>
                                </Form.Item>
                            </div>

                            <div className="flex gap-5">
                                <Form.Item
                                    className="w-full"
                                    style={{ marginBottom: "12px" }}
                                    label="Job Type"
                                    name="jobTypeId"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input Job Type!",
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Full Time"
                                        allowClear
                                        loading={jobTypeLoading}
                                        mode="single"
                                        size="middle"
                                        style={{
                                            width: "100%",
                                        }}
                                    >
                                        {jobTypeList &&
                                            jobTypeList.map((item) => (
                                                <Option
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    {item.jobTypeName}
                                                </Option>
                                            ))}
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                className="w-full"
                                    style={{ marginBottom: "12px" }}
                                    label="Job Category"
                                    name="jobCategoryId"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input Job Category!",
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Engineering"
                                        allowClear
                                        onChange={jobCategoryHandler}
                                        loading={jobCategoryLoading}
                                        mode="single"
                                        size="middle"
                                        style={{
                                            width: "100%",
                                        }}
                                    >
                                        {jobCategoryList &&
                                            jobCategoryList.map((item) => (
                                                <Option
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    {item.jobCategoryName}
                                                </Option>
                                            ))}
                                    </Select>
                                </Form.Item>
                            </div> 
                            <div className="flex gap-5">
                                <Form.Item
                                    className="w-full"
                                    style={{ marginBottom: "12px" }}
                                    label="Job Skill"
                                    name="jobSkillId"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input Job Skill!",
                                        },
                                    ]}
                                >
                                    <Select
                                        mode="multiple"
                                        loading={jobSkillsLoading}
                                        style={{
                                            width: "100%",
                                        }}
                                        placeholder="select Skills"
                                        optionLabelProp="children"
                                    >
                                        {jobSkillsList &&
                                            jobSkillsList.map((item) => (
                                                <Option
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    {item.jobSkillName}
                                                </Option>
                                            ))}
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    className="w-full"
                                    style={{ marginBottom: "12px" }}
                                    label="Total Position"
                                    name="totalPosition"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input Total Position!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="please input total position" />
                                </Form.Item>
                            </div>
                            <div>
                            <Form.Item
                                    className="w-full"
                                    style={{ marginBottom: "12px" }}
                                    label="Pay By"
                                    name="jobPayBy"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input Pay By!",
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Monthly"
                                        allowClear
                                        mode="single"
                                        size="middle"
                                        style={{
                                            width: "100%",
                                        }}
                                    >
                                        {payBy.map((item) => (
                                            <Option className="capitalize" key={item} value={item}>
                                                {item}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>
                            <div >
                                <Radio.Group
                                    onChange={onChange}
                                    value={rangeValue}
                                >
                                    <Radio value={"exactSalary"}>
                                        Exact Salary
                                    </Radio>
                                    <Radio value={"rangeSalary"}>
                                        Range Salary
                                    </Radio>
                                </Radio.Group>
                            </div>
                       
                        {rangeValue === "exactSalary" ? (                  
                            <div>
                                <Form.Item
                                    style={{ marginBottom: "12px" }}
                                    label="Salary"
                                    name="exactSalary"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input Exact Salary!",
                                        },
                                    ]}
                                >
                                    <InputNumber placeholder="00" />
                                </Form.Item>
                            </div>
                        ) : (
                            <>

                                <div className="flex gap-5">
                                    <Form.Item
                                    className="w-full"
                                        style={{ marginBottom: "12px" }}
                                        label="Minimum"
                                        name="startingSalary"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input Minimum Salary!",
                                            },
                                        ]}
                                    >
                                        <InputNumber placeholder="00" />
                                    </Form.Item>
                            
                                    <Form.Item
                                    className="w-full"
                                        style={{ marginBottom: "12px" }}
                                        label="Maximum"
                                        name="maximumSalary"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input Maximum Salary!",
                                            },
                                        ]}
                                    >
                                        <InputNumber placeholder="00" />
                                    </Form.Item>
                                </div>
                    
                            </>
                        )}

                        <div>
                            <Form.Item
                                style={{
                                    marginBottom: "25px",
                                }}
                                label="Job Requirement"
                                name="jobRequirement"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input Job Requirement!",
                                    },
                                ]}
                            >
                                <ReactQuill
                                    theme="snow"
                                    modules={textEditorModule}
                                    formats={textEditorFormats}
                                />
                            </Form.Item>
                     
                            <Form.Item
                                style={{
                                    marginBottom: "25px",
                                }}
                                label="Job Description"
                                name="jobDescription"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input Job Description!",
                                    },
                                ]}
                            >
                                <ReactQuill
                                    theme="snow"
                                    modules={textEditorModule}
                                    formats={textEditorFormats}
                                />
                            </Form.Item>
                        </div>
                        <Form.Item
                            style={{ marginBottom: "12px", marginTop: "12px" }}
                        >
                            <Button
                                className="mt-5"
                                size="large"
                                color="primary"
                                type="primary"
                                htmlType="submit"
                                shape="round"
                                loading={loader}
                            >
                                Add New Job
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </UserPrivateComponent>
        </>
    );
};

export default AddJob;