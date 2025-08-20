import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadMainAccount,
  loadUpdateAccount,
} from "../../redux/rtk/features/account/accountSlice";

const UpdateAccount = ({ account, id }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();

  const accounts = useSelector((state) => state?.accounts?.mainAccount) || null;

  useEffect(() => {
    dispatch(loadMainAccount());
  }, [dispatch]);

  const onFinish = async (values) => {
    await dispatch(loadUpdateAccount({ id, values }));

    setLoading(false);
    setOpen(false);
  };

  const onFinishFailed = (errorInfo) => {
    setLoading(false);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={showModal} size='small'>
        Update Account
      </Button>
      <Modal
        open={open}
        title=''
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name='basic'
          layout='vertical'
          className='sm:mx-10'
          initialValues={account}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            style={{ marginBottom: "10px" }}
            name='name'
            label='Name'
            rules={[
              {
                required: true,
                message: "Please input debit account!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            name='accountId'
            label='Account Type'
            rules={[
              {
                required: true,
                message: "Please input debit account!",
              },
            ]}
          >
            <Select
              loading={!accounts}
              showSearch
              placeholder='Select Account Type'
              optionFilterProp='children'
              filterOption={(input, option) => option.children.includes(input)}
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              {accounts &&
                accounts.map((acc) => (
                  <Select.Option key={acc.id} value={acc.id}>
                    {acc.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item style={{ marginBottom: "10px" }}>
            <Button
              block
              type='primary'
              htmlType='submit'
              shape='round'
              loading={loading}
              onClick={() => setLoading(true)}
            >
              Update Account
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateAccount;
