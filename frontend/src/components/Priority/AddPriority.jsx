import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPriority,
  loadAllPriority,
  updatePriority,
} from "@/redux/rtk/features/priority/prioritySlice";

export default function AddPriority({ edit }) {
  const [form] = Form.useForm();
  const { loading } = useSelector((state) => state.priority);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const resp = await dispatch(
      edit?.id ? updatePriority({ id: edit?.id, values }) : addPriority(values),
    );
    if (resp.payload.message === "success") {
      dispatch(loadAllPriority());
      if (!edit?.id) {
        form.resetFields();
      }
    }
  };

  useEffect(() => {
    if (edit?.id) {
      form.setFieldsValue(edit?.values);
    }
  }, [edit, form]);

  return (
    <div className="flex justify-center mt-5">
      <Form
        className="w-4/5"
        onFinish={onFinish}
        colon={false}
        layout="vertical"
        form={form}
      >
        <Form.Item
          style={{ width: "350px" }}
          label="Priority Name"
          name="name"
          tooltip="This is a required field"
          rules={[{ required: true, message: "This is a required field." }]}
        >
          <Input placeholder="Priority name" />
        </Form.Item>

        <Form.Item label="">
          <div className="flex items-center gap-2">
            <Button
              size={"large"}
              htmlType="submit"
              type="primary"
              loading={loading}
            >
              {edit?.id ? "Update" : "Create"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
