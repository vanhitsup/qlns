import { addLeavePolicy, loadAllLeavePolicyPaginated, loadSingleLeavePolicy, updateLeavePolicy } from '@/redux/rtk/features/hrm/leavePolicy/leavePolicySlice';
import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function UpdateLeavePolicy({leavePolicy}) {
    const [loader, setLoader] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { id } = useParams("id");

    const onFinish = async(values)=>{
        setLoader(false)
        try{
            const resp = await dispatch(updateLeavePolicy({id:leavePolicy.id,values:values})) 
            if(resp.payload.message === "success"){
                dispatch(loadSingleLeavePolicy(id))

            }
            setLoader(false)
        }catch(err){

        }
    }
  return (
    <div>
        <Form
      style={{ marginBottom: "40px" }}
      form={form}
      eventKey='department-form'
      name='basic'
      layout='vertical'
      className='mx-4'
      onFinish={onFinish}
      autoComplete='off'
      initialValues={{...leavePolicy}}
    >
      <div>
        <Form.Item
          style={{ marginBottom: "10px" }}
          label='Name'
          name='name'
          rules={[
            {
              required: true,
              message: "Please input your leave-policy name!",
            },
          ]}
        >
          <Input placeholder='Policy 10-12' />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          label='Paid Leave '
          name='paidLeaveCount'
          rules={[
            {
              required: true,
              message: "Please input your paid leave!",
            },
          ]}
        >
          <Input placeholder='20' />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          label='Unpaid Leave '
          name='unpaidLeaveCount'
          rules={[
            {
              required: true,
              message: "Please input your unpaid Leave !",
            },
          ]}
        >
          <Input placeholder='10' />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          className='flex justify-center'
        >
          <Button
            type='primary'
            size='large'
            htmlType='submit'
            block
            loading={loader}
          >
            Update Policy
          </Button>
        </Form.Item>
      </div>
    </Form>
    </div>
  )
}
