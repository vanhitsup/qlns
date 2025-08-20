
import { loadSingleJobInterview, updateJobInterview } from '@/redux/rtk/features/hrm/jobInterview/jobInterviewSlice';
import { Button, Form, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

export default function ReviewInterview({data}) {
    const [form] = Form.useForm();
    const [loader, setLoader] = useState(false)
    const dispatch = useDispatch();

    const onFinish= async(values)=>{
        setLoader(true);
        try{
            const resp = await dispatch(updateJobInterview({id:data?.id,values:{...values,jobApplicationId:data.jobApplicationId}}))
            if(resp.payload.message === "success"){
                dispatch(loadSingleJobInterview(data.id))
            }
         setLoader(false)   
        }catch(err){
            
        }

    }


    useEffect(() => {
        data && form.setFieldValue("interviewStatus", data.interviewStatus);
      }, [data, form]);
  return (
    <div>
        <Form
            style={{ marginBottom: "40px" }}
            form={form}
            eventKey={"jobApplicationReview-form"}
            name="basic"
            className="mx-4"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
        >
            <div>
                <div className="flex justify-center my-4">
                    <ul className="list-inside list-none w-full uppercase">
                        <li className="text-sm text-gray-600/60 font-semibold py-2 px-4 bg-gray-400/10 mb-1.5 rounded  flex justify-start">
                            Candidate Name :{" "}
                            <p className="ml-2 text-sm text-gray-800/80">
                                {data?.jobApplication.name}{" "}
                            </p>
                        </li>
                        <li className="text-sm text-gray-600/60 font-semibold py-2 px-4 bg-gray-400/10 mb-1.5 rounded  flex justify-start">
                            Applied For :{" "}
                            <p className="ml-2 text-sm text-gray-800/80">
                                {data?.jobApplication.job.jobTitle}{" "}
                            </p>
                        </li>
                    </ul>
                </div>
                <Form.Item
                    style={{ marginBottom: "10px" }}
                    label={"Interview Status"}
                    name={"interviewStatus"}
                    rules={[
                        {
                            required: true,
                            message: "please Select interview Status",
                        },
                    ]}
                >
                    <Select
                        size="middle"
                        mode="single"
                        allowClear
                        style={{
                            width: "100%",
                        }}
                        placeholder="Please select interview Status"
                    >
                        
                        <Select.Option key={"PENDING"} value={"PENDING"}>
                        </Select.Option>
                        <Select.Option key={"INTERVIEWED"} value={"INTERVIEWED"}>
                        </Select.Option>
                         
                    </Select>
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
                        Review
                    </Button>
                </Form.Item>
            </div>
        </Form>
    </div>
  )
}
