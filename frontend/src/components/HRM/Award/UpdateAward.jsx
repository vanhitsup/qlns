
import { loadAllAwardPaginated, loadSingleAward, updateAward } from '@/redux/rtk/features/hrm/award/awardSlice';
import { Button, Form, Input } from 'antd';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function UpdateAward({award}) {
    const [form] = Form.useForm();
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const { id } = useParams();


    const onFinish = async(values)=>{
        setLoader(true);
        try{
            const resp = await dispatch(updateAward({id:award.id,values:values})) 
            if(resp.payload.message == "success"){
                dispatch(loadAllAwardPaginated({
                    page: 1,
                    count: 10,
                    status: 'true',
                  }))
                  dispatch(loadSingleAward(id))

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
    initialValues={{...award}}
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
          Update Award
        </Button>
      </Form.Item>
    </div>
  </Form></div>
  )
}
