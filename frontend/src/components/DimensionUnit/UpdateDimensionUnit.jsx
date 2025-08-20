import Button from "@/UI/Button";
import {
  loadALLDimensionUnit,
  updateDimensionUnit,
} from "@/redux/rtk/features/dimensionUnit/dimensionUnitSlice";
import { Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UpdateDimensionUnit({ handleCancel }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { edit } = useSelector((state) => state.dimensionUnit);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const resp = await dispatch(updateDimensionUnit({ id: edit.id, values }));

      if (resp.payload.message === "success") {
        setLoading(false);
        form.resetFields();
        dispatch(loadALLDimensionUnit());
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
              message: "Please input dimension unit name!",
            },
          ]}
        >
          <Input size="small" placeholder="e.g. square" />
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
            Update Dimension Unit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
