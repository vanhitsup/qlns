/* eslint-disable react/no-unknown-property */
import { loadSingleLeave, updateLeave } from "@/redux/rtk/features/hrm/leave/leaveSlice";
import { Button, DatePicker, Drawer, Form, Input, Radio } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ReviewApplication = ({ data }) => {
  const { id } = useParams("id");
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [status, setStatus] = useState(null);
  const [initialValues, setInitialValues] = useState({});
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();



  useEffect(() => {
    setInitialValues({
      ...data,
      userId: userId,
      status: status,
      acceptLeaveFrom: dayjs(data?.leaveFrom),
      acceptLeaveTo: dayjs(data?.leaveTo),
    });
  }, [data,userId,status]);

  const onFinish = async (values) => {
    setLoader(true)
    try{
    const FormData = {
      ...values,
    };

    const resp = await dispatch(updateLeave({ id: id, values: FormData }))
    if(resp.payload.message ==="success"){
      dispatch(loadSingleLeave(id));
    }
    setLoader(false)

   }catch(err){
      console.log(err)
   }
  };
  

  return (
    <>
     
          <Form
            rootClassName='list-inside list-none border-2 border-inherit rounded p-5'
            form={form}
            rootStyle={{ marginBottom: "40px" }}
            name='basic'
            initialValues={initialValues}
            layout="vertical"
            onFinish={onFinish}
            autoComplete='off'
          >
            <div>
              <Form.Item
                rootStyle={{ marginBottom: "10px" }}
                label='Accept From'
                name='acceptLeaveFrom'
                rules={[
                  {
                    required: true,
                    message: "Please input Date !",
                  },
                ]}
              >
                <DatePicker format={"DD-MM-YYYY"} />
              </Form.Item>

              <Form.Item
                rootStyle={{ marginBottom: "10px" }}
                label='Accept To'
                name='acceptLeaveTo'
                rules={[
                  {
                    required: true,
                    message: "Please input Date!",
                  },
                ]}
              >
                <DatePicker format={"DD-MM-YYYY"} />
              </Form.Item>

              <Form.Item
                rootStyle={{ marginBottom: "10px" }}
                label='Comment'
                name='reviewComment'
              >
                <Input name='reviewComment' />
              </Form.Item>

              {status === null && (
                // eslint-disable-next-line react/no-unknown-property
                <p rootClassName='text-red-500 text-center mb-3'>
                  Please select status
                </p>
              )}

              <Form.Item
                rootStyle={{ marginBottom: "10px" }}
                label='Select Status'
                name='status'
                rules={[
                  {
                    required: true,
                    message: "Please input Status!",
                  },
                ]}
              >
                <Radio.Group
                  buttonStyle='solid'
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <Radio.Button value='ACCEPTED'>ACCEPTED</Radio.Button>
                  <Radio.Button value='REJECTED'>REJECTED</Radio.Button>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                rootStyle={{ marginBottom: "10px" }}
                wrapperCol={{
                  offset: 7,
                  span: 12,
                }}
              >
                <Button
                  type='primary'
                  size='middle'
                  htmlType='submit'
                  block
                  disabled={status === null}
                  loading={loader}
                >
                  Review Leave
                </Button>
              </Form.Item>
            </div>
          </Form>
       
    </>
  );
};
export default ReviewApplication;