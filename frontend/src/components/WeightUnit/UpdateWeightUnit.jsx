import Button from "@/UI/Button";
import {
  loadALLWeightUnit,
  updateWeightUnit,
} from "@/redux/rtk/features/weightUnit/weightUnitSlice";
import { Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UpdateWeightUnit({ handleCancel }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { edit } = useSelector((state) => state.weightUnit);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const resp = await dispatch(updateWeightUnit({ id: edit.id, values }));

      if (resp.payload.message === "success") {
        setLoading(false);
        form.resetFields();
        dispatch(loadALLWeightUnit());
        handleCancel();
      }
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    form.setFieldsValue(edit);
  }, [edit, form]);
  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        style={{ marginLeft: "40px", marginRight: "40px" }}
        onFinish={onFinish}
        onFinishFailed={() => {}}
        labelAlign="left"
      >
        <Form.Item
          style={{ marginBottom: "10px" }}
          label="Name"
          name={"name"}
          rules={[
            {
              required: true,
              message: "Please input weight unit name!",
            },
          ]}
        >
          <Input size="small" placeholder="e.g. kg" />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          className="flex justify-center mt-[24px]"
        >
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            shape="round"
          >
            Update Weight Unit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
