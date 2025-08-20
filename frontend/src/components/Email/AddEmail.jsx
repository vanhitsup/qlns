import {
  addEmail,
  loadAllEmailPaginated,
} from "@/redux/rtk/features/email/emailSlice";
import { CaretRightOutlined } from "@ant-design/icons";
import { Button, Collapse, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import TagInput from "../CommonUi/TagInput";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import { loadAllEmailConfig } from "./../../redux/rtk/features/EmailConfig/EmailConfigSlice";
import { loadAllStaff } from "../../redux/rtk/features/hrm/user/userSlice";

export default function AddEmail({ onClose, createAs }) {
  const [cc, setCc] = useState([]);
  const [bcc, setBcc] = useState([]);
  const [body, setBody] = useState("");

  const textEditorModule = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      ["link", "image"],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  };

  const textEditorFormats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "background",
  ];
  // selector

  const { list: staffList, loading: staffLoading } = useSelector(
    (state) => state.users
  );

  const { loading: emailLoading } = useSelector((state) => state.email);

  const { list: emailConfigList } = useSelector((state) => state.emailConfig);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllStaff({ query: "all" }));
    dispatch(loadAllEmailConfig({}));
  }, [dispatch]);

  const onFinish = async (values) => {
    const formData = {
      ...values,
      emailOwnerId: parseInt(values.emailOwnerId),
      companyId: parseInt(values.companyId),
      opportunityId: parseInt(values.opportunityId),
      contactId: parseInt(values.contactId),
      quoteId: parseInt(values.quoteId),
      cc,
      bcc,
      body,
    };

    const resp = await dispatch(addEmail(formData));
    if (resp.payload.message === "success") {
      form.resetFields();
      if (createAs?.name) {
        dispatch(createAs.singleLoadThunk(createAs.value));
      } else {
        dispatch(loadAllEmailPaginated({}));
      }

      onClose();
    }
  };

  const onCancel = () => {
    form.resetFields();
    onClose();
  };

  const emailHandler = (val) => {
    setBody(val);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center mt-5">
      <UserPrivateComponent permission="create-email">
        <Form
          className="w-4/5"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          colon={false}
          layout="vertical"
          form={form}
          initialValues={
            createAs
              ? {
                  [createAs?.name]: createAs?.value,
                }
              : {}
          }>
          <Form.Item
            style={{ width: "100%" }}
            label="From"
            name="emailConfigName"
            tooltip="This is a required field"
            rules={[{ required: true, message: "From Email is Required." }]}>
            <Select style={{ width: "100%" }} placeholder="From Email">
              {emailConfigList?.map((item) => (
                <Select.Option
                  key={item.emailConfigName}
                  value={item.emailConfigName}>
                  {item.emailUser}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            style={{ width: "100%" }}
            label="To"
            name="receiverEmail"
            tooltip="This is a required field"
            rules={[
              { required: true, message: "Receiver Email is Required." },
            ]}>
            <Input placeholder="Receiver Email" />
          </Form.Item>
          <Form.Item
            style={{ width: "100%" }}
            label="Subject"
            name="subject"
            tooltip="This is a required field"
            rules={[{ required: true, message: "Subject is Required." }]}>
            <Input placeholder="Subject" />
          </Form.Item>
          <Collapse
            bordered={false}
            defaultActiveKey={["1"]}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            className="site-collapse-custom-collapse mb-4">
            <Collapse.Panel header="CC & BCC" key="1">
              <TagInput label={"CC"} tags={cc} setTags={setCc} />

              <TagInput label={"BCC"} tags={bcc} setTags={setBcc} />
            </Collapse.Panel>
          </Collapse>

          <Form.Item style={{ marginBottom: "25px" }} label="Body" name="body">
            <ReactQuill
              value={body}
              onChange={emailHandler}
              modules={textEditorModule}
              formats={textEditorFormats}
            />
          </Form.Item>
          <Form.Item
            label="Email owner"
            name={"emailOwnerId"}
            tooltip="This is a required field"
            rules={[{ required: true, message: "Owner is Required." }]}>
            <Select
              style={{ width: "100%" }}
              loading={staffLoading}
              allowClear
              showSearch
              placeholder="Select note owner name">
              {staffList?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item?.firstName} {item?.lastName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="">
            <div className="flex items-center gap-2">
              <Button
                size={"large"}
                htmlType="submit"
                type="primary"
                loading={emailLoading}>
                Create
              </Button>
              <Button
                className="text-white"
                size={"large"}
                htmlType="submit"
                type="danger"
                onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </Form.Item>
        </Form>
      </UserPrivateComponent>
    </div>
  );
}
