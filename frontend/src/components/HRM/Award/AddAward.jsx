import { addAward, loadAllAwardPaginated } from '@/redux/rtk/features/hrm/award/awardSlice';
import { Button, Form, Input } from 'antd';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

export default function AddAward() {
    const [form] = Form.useForm();
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    

    const onFinish = async(values)=>{
        setLoader(true);
        try{
            const resp = await dispatch(addAward(values)) 
            if(resp.payload.message == "success"){
                form.resetFields();
                dispatch(loadAllAwardPaginated({
                    page: 1,
                    count: 10,
                    status: 'true',
                  }))
            }
            setLoader(false);
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div>  <Form
    style={{ marginBottom: "40px" }}
    form={form}
    eventKey='department-form'
    name='basic'
    className='mx-4'
    layout='vertical'
    onFinish={onFinish}
    autoComplete='off'
  >
    <div>
      <Form.Item
        style={{ marginBottom: "10px" }}
        label='Name'
        name='name'
        rules={[
          {
            required: true,
            message: "Please input your award name!",
          },
        ]}
      >
        <Input placeholder='Employee Of The Month' />
      </Form.Item>

      <Form.Item
        style={{ marginBottom: "20px" }}
        label='Description'
        name='description'
        rules={[
          {
            required: true,
            message: "Please input your award description!",
          },
        ]}
      >
        <Input placeholder='Employee Who Performed Well' />
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
          Add Award
        </Button>
      </Form.Item>
    </div>
  </Form></div>
  )
}
