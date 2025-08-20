import ImageUploader from "@/UI/ImageUploader";
import { Button, Card, Col, Form, Input, Row, Select, Typography } from "antd";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { loadAllCurrency } from "../../redux/rtk/features/eCommerce/currency/currencySlice";
import {
  getSetting,
  updateSetting,
} from "../../redux/rtk/features/setting/settingSlice";
import Loader from "../Loader/Loader";
// import { textEditorFormats, textEditorModule } from "../Product/AddProduct";
//Update Invoice API REQ
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

const AddDetails = () => {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);
  const [footer, setFooter] = useState("");
  const { data, loading: loader } =
    useSelector((state) => state?.setting) || null;
  const { list, loading } = useSelector((state) => state?.currency) || null;

  const onFinish = async (values) => {
    //convert values to formData to send to server
    try {
      const data = {
        ...values,
        footer: footer || "",
        logo: fileList[0]?.id || null,
      };

      const resp = await dispatch(updateSetting(data));
      if (resp.payload.message === "success") {
        toast.success("Company Updated Successfully");
        dispatch(getSetting());
      }
    } catch (error) {}
  };

  useEffect(() => {
    dispatch(loadAllCurrency());
  }, [dispatch]);

  const handelImageChange = (fileList) => {
    setFileList(fileList);
  };

  const footerHandler = (val) => {
    setFooter(val);
  };

  useEffect(() => {
    if (data) {
      setFooter(data.footer ? data.footer : "");
      if (data.logo) {
        setFileList([
          {
            id: getLastPathSegment(data.logo),
          },
        ]);
      }
    }
  }, [data]);

  return (
    <Fragment>
      <Row className="mr-top" justify="center">
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={16}
          xl={16}
          className="border rounded column-design">
          <Card bordered={false}>
            <Title level={4} className="m-2 text-center mb-4">
              Company Setting
            </Title>
            {data ? (
              <Form
                initialValues={{
                  ...data,
                }}
                form={form}
                name="basic"
                labelCol={{
                  span: 7,
                }}
                labelWrap
                wrapperCol={{
                  span: 16,
                }}
                onFinish={onFinish}
                autoComplete="off">
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  fields={[{ name: "Company Name" }]}
                  label="Company Name"
                  name="companyName"
                  rules={[
                    {
                      required: true,
                      message: "Please input Company name!",
                    },
                  ]}>
                  <Input />
                </Form.Item>
                {/* <Form.Item
                  style={{ marginBottom: "10px" }}
                  fields={[{ name: "Company Name" }]}
                  label='Dashboard Type'
                  name='dashboardType'
                  rules={[
                    {
                      required: true,
                      message: "Please input dashboardType!",
                    },
                  ]}
                >
                  <Select>
                    <Select.Option key={"Both"} value={"both"}>
                      Both
                    </Select.Option>
                    <Select.Option key={"e-commerce"} value={"e-commerce"}>
                      E-Commerce
                    </Select.Option>
                    <Select.Option key={"inventory"} value={"inventory"}>
                      Inventory
                    </Select.Option>
                  </Select>
                </Form.Item> */}
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  fields={[{ name: "Tagline" }]}
                  label="Tagline"
                  name="tagLine"
                  rules={[
                    {
                      required: true,
                      message: "Please input Tagline!",
                    },
                  ]}>
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Address"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Please input Address!",
                    },
                  ]}>
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Phone Number"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input Phone Number!",
                    },
                  ]}>
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Email Address"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input Email Address!",
                    },
                  ]}>
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Currency"
                  name="currencyId"
                  rules={[
                    {
                      required: true,
                      message: "Please input Currency!",
                    },
                  ]}>
                  <Select label="Currency" name="currencyId" loading={loading}>
                    {list?.map((item, index) => (
                      <Select.Option value={item.id} key={item.id}>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: item.currencySymbol,
                          }}></span>{" "}
                        &#160;
                        <span>{item.currencyName}</span>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Website"
                  name="website"
                  rules={[
                    {
                      required: true,
                      message: "Please input Website!",
                    },
                  ]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="BIN"
                  tooltip="Business Identification Number"
                  name="bin">
                  <Input placeholder="Please input BIN" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Mushak"
                  name="mushak">
                  <Input placeholder="Please input mushak" />
                </Form.Item>
                <Form.Item
                  label="Upload Logo"
                  valuePropName="fileList"
                  tooltip="Required image size 180x70 px & transparent png format">
                  <ImageUploader
                    images={fileList}
                    setImages={handelImageChange}
                    filter={{ image: "image" }}
                  />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "40px" }}
                  label="Footer"
                  name="footer"
                  className="z-30"
                  rules={[
                    {
                      required: true,
                      message: "Please input Footer!",
                    },
                  ]}>
                  <ReactQuill
                    value={footer}
                    onChange={footerHandler}
                    modules={textEditorModule}
                    formats={textEditorFormats}
                  />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  className="flex justify-center mt-[24px]">
                  <Button
                    type="primary"
                    disabled={loading}
                    htmlType="submit"
                    shape="round"
                    loading={loader}>
                    Update Details
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <Loader />
            )}
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AddDetails;

function getLastPathSegment(url) {
  if (!url) return null;
  const split = url.split("/");
  return split[split.length - 1];
}
