

import { loadAllWeeklyHolidayPaginated, updateWeeklyHoliday } from "@/redux/rtk/features/hrm/holiday/weeklyHolidaySlice";
import { Button, Form, Input, Select } from "antd";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const UpdateWeeklyHoliday = ({handleCancel}) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [loader,setLoader] = useState(false);
    const {weeklyHoliday} = useSelector(state=>state.weeklyHoliday);
   
    const onFinish = async (values) => {
        setLoader(true);
        try{
            const resp = await dispatch(updateWeeklyHoliday({id:weeklyHoliday.id, values:values}));
            if(resp.payload.message ==="success"){
                handleCancel();
                dispatch(loadAllWeeklyHolidayPaginated({
                    page: 1,
                    count: 10,
                    status: "true",
                  }))
            }
        setLoader(false);
        }catch(err){
            console.log(err)
        }
        
    };
    
    useEffect(() => {
        form.setFieldValue("name", weeklyHoliday.name);
        form.setFieldValue("startDay", weeklyHoliday.startDay);
        form.setFieldValue("endDay", weeklyHoliday.endDay);
      }, [form, weeklyHoliday]);
    return (
        <Form
            style={{ marginBottom: "40px" }}
            form={form}
            eventKey="department-form"
            name="basic"
            className="mx-4"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
        >
            <div>
                <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input name!",
                        },
                    ]}
                >
                    <Input placeholder="Saturday-Friday" />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Start Day"
                    name="startDay"
                    rules={[
                        {
                            required: true,
                            message: "Please input start day!",
                        },
                    ]}
                >
                    <Select placeholder="Select Start Day">
                        <Select.Option value="Saturday">Saturday</Select.Option>
                        <Select.Option value="Sunday">Sunday</Select.Option>
                        <Select.Option value="Monday">Monday</Select.Option>
                        <Select.Option value="Tuesday">Tuesday</Select.Option>
                        <Select.Option value="Wednesday">
                            Wednesday
                        </Select.Option>
                        <Select.Option value="Thursday">Thursday</Select.Option>
                        <Select.Option value="Friday">Friday</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="End Day"
                    name="endDay"
                    rules={[
                        {
                            required: true,
                            message: "Please input End day!",
                        },
                    ]}
                >
                    <Select placeholder="Select Start Day">
                        <Select.Option value="Saturday">Saturday</Select.Option>
                        <Select.Option value="Sunday">Sunday</Select.Option>
                        <Select.Option value="Monday">Monday</Select.Option>
                        <Select.Option value="Tuesday">Tuesday</Select.Option>
                        <Select.Option value="Wednesday">
                            Wednesday
                        </Select.Option>
                        <Select.Option value="Thursday">Thursday</Select.Option>
                        <Select.Option value="Friday">Friday</Select.Option>
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
                        Update Weekly Holiday
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default UpdateWeeklyHoliday;