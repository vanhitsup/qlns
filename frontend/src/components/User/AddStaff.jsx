import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Radio,
  Tooltip,
  Upload,
} from "antd";

import { PlusOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { getDistricts, getProvinces, getWards } from "@/api/provinces";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllDepartment } from "../../redux/rtk/features/hrm/department/departmentSlice";
import { loadAllDesignation } from "../../redux/rtk/features/hrm/designation/designationSlice";
import { loadAllEmployeeStatus } from "../../redux/rtk/features/hrm/employeeStatus/employeeStatusSlice";
import { loadAllRole } from "../../redux/rtk/features/hr/role/roleSlice";
import { loadAllShift } from "../../redux/rtk/features/hrm/shift/shiftSlice";
import {
  addStaff,
  loadAllStaff,
} from "../../redux/rtk/features/hrm/user/userSlice";
import ImageUploader from "@/UI/ImageUploader";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import BigDrawer from "../Drawer/BigDrawer";
import AddEmploymentStatus from "../HRM/EmploymentStatus/AddEmploymentStatus";
import AddDepartment from "../HRM/Department/AddDepartment";
import AddShift from "../HRM/Shift/AddShift";
import AddWeeklyHoliday from "../HRM/WeeklyHoliday/AddWeeklyHoliday";
import {
  loadAllWeeklyHoliday,
  loadAllWeeklyHolidayPaginated,
} from "@/redux/rtk/features/hrm/holiday/weeklyHolidaySlice";
import { message } from "antd";

const AddStaff = () => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const { list } = useSelector((state) => state.role);
  const { list: department } = useSelector((state) => state.department);
  const { list: designation } = useSelector((state) => state.designations);
  const { list: employmentStatus } = useSelector(
    (state) => state.employmentStatus
  );
  const { list: shift } = useSelector((state) => state.shift);
  const [fileList, setFileList] = useState([]);

  const { list: weeklyHoliday, loading: weekLoading } = useSelector(
    (state) => state.weeklyHoliday
  );

  const [form] = Form.useForm();
  const QuillEditor = ({ value, onChange, height = 300 }) => {
    const modules = {
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["link"],
        ["clean"],
      ],
    };

    const formats = [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "list",
      "bullet",
      "align",
      "link",
    ];

    return (
      <ReactQuill
        theme="snow"
        value={value || ""}
        onChange={onChange}
        modules={modules}
        formats={formats}
        style={{ height: height - 42 }} 
      />
    );
  };

  // ✅ Build payload in required nested JSON shape
  const onFinish = async (values) => {
    setLoader(true);

    // helper to format DatePicker values
    const fmt = (d) => (d && typeof d?.format === "function" ? d.format("YYYY-MM-DD") : d ?? null);

    // Collect fields for nested groups
    const resumeKeys = [
      "fullNameBirth",
      "gender",
      "otherNames",
      "birthDate",
      "birthProvince",
      "birthDistrict",
      "birthWard",
      "hometownProvince",
      "hometownDistrict",
      "hometownWard",
      "permanentAddress",
      "nationality",
      "ethnicity",
      "religion",
      "personalId",
      "issueDate",
      "issuePlace",
      "bankAccountNumber",
      "bankName",
      "healthCertificate",
      "resume",
      "height",
      "weight",
      "stateTitle",
      "familyBackground",
      "previousOccupation",
      "joinPartyDate",
      "joinOrganizationDate",
      "joinArmyDate",
      "leaveArmyDate",
      "highestRank",
      "policyObject",
      "educationLevelGeneral",
      "workHistory",
      "workUnit",
      "positionTitle",
      "firstRecruitmentDate",
      "currentAgencyJoinDate",
      "arrestHistory",
      "organizationRelations",
      "familyRelations",
      "familyEconomy",
      "leaveDate",
      "retirementDate",
      "staffCode",
      "bloodGroup",
    ];

    const positionSalaryKeys = [
      "positionTitle",
      "positionCode",
      "appointmentStartDate",
      "appointmentEndDate",
      "reappointmentDate",
      "positionAllocation",
      "concurrentPosition",
      "currentPartyPosition",
      "alternatePartyPosition",
      "workPosition",
      "mainAssignedJob",
      "specializedField",
      "longestJob",
      "positionSalary",
      "salaryLevel",
      "salaryCoefficient",
      "salaryStartDate",
      "salaryPercentage",
      "seniorityAllowance",
      "pctnvkDate",
      "positionAllowance",
      "additionalAllowance",
      "otherAllowance",
      "jobPosition",
      "jobCode",
      "salaryAmount",
      "salaryComment",
      "additionalIncome",
    ];

    const educationKeys = [
      "academicTitle",
      "degree",
      "issuingOrganization",
      "educationLevel",
      "attachedFile",
      "politicalTheory",
      "specialized",
      "trainingInstitution",
      "trainingSpecialization",
      "trainingForm",
      "educationDegree",
      "educationStartDate",
      "educationEndDate",
      "trainingContent",
      "managementTrainingInstitution",
      "managementTrainingStartDate",
      "managementTrainingEndDate",
      "securityDefenseTraining",
      "securityDefenseInstitution",
      "securityDefenseCertificate",
      "securityDefenseStartDate",
      "securityDefenseEndDate",
      "itSkills",
      "itTrainingInstitution",
      "itCertificate",
      "itTrainingStartDate",
      "itTrainingEndDate",
      "foreignLanguage",
      "languageTrainingInstitution",
      "languageCertificate",
      "languageTrainingStartDate",
      "languageTrainingEndDate",
    ];

    // Start with top-level simple fields
    const payload = {
      username: values.username ?? null,
      password: values.password ?? null,
      email: values.email ?? null,
      firstName: values.firstName ?? null,
      lastName: values.lastName ?? null,
      phone: values.phone ?? null,
      nationalId: values.nationalId ?? null,
      roleId: values.roleId ?? null,
      departmentId: values.departmentId ?? null,
    };

    // Map employmentStatusId to status name if available, else keep id or null
    try {
      const statusName = employmentStatus?.find((s) => s.id === values.employmentStatusId)?.name;
      payload.status = statusName ? String(statusName).toLowerCase() : null;
    } catch (_) {
      payload.status = null;
    }

    // Build staffResumes: include dotted keys and plain keys moved under this object
    const staffResumes = {};
    // move fields with prefix 'staffResumes.' first
    Object.keys(values)
      .filter((k) => k.startsWith("staffResumes."))
      .forEach((k) => {
        const subKey = k.replace("staffResumes.", "");
        staffResumes[subKey] = values[k];
      });

    // then move defined resumeKeys from top-level values
    resumeKeys.forEach((k) => {
      if (k in values && !(`staffResumes.${k}` in values)) {
        const isDateField = /Date$/i.test(k);
        staffResumes[k] = isDateField ? fmt(values[k]) : values[k];
      } else if (k in staffResumes) {
        // format dates for dotted keys too
        if (/Date$/i.test(k)) staffResumes[k] = fmt(staffResumes[k]);
      }
    });

    // Build staffPositionSalaries
    const staffPositionSalaries = {};
    positionSalaryKeys.forEach((k) => {
      if (k in values) {
        staffPositionSalaries[k] = /Date$/i.test(k) ? fmt(values[k]) : values[k];
      }
    });

    // Build staffEducations
    const staffEducations = {};
    educationKeys.forEach((k) => {
      if (k in values) {
        staffEducations[k] = /Date$/i.test(k) ? fmt(values[k]) : values[k];
      }
    });

    const finalPayload = {
      ...payload,
      staffResumes,
      staffPositionSalaries,
      staffEducations,
    };

    try {
      const resp = await dispatch(addStaff(finalPayload));
      if (resp.payload?.message === "success") {
        message.success("Thêm nhân viên thành công!");
        form.resetFields();
      } else {
        message.error("Có lỗi xảy ra, vui lòng thử lại!");
      }
    } catch (error) {
      message.error("Lỗi hệ thống!");
    } finally {
      setLoader(false);
    }
  };

  const onFinishFailed = () => {};

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const [provinces, setProvinces] = useState([]);

  // ✅ Separate states for birth address
  const [birthDistricts, setBirthDistricts] = useState([]);
  const [birthWards, setBirthWards] = useState([]);

  // ✅ Separate states for hometown address
  const [hometownDistricts, setHometownDistricts] = useState([]);
  const [hometownWards, setHometownWards] = useState([]);

  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isPositionSalaryOpen, setIsPositionSalaryOpen] = useState(false);
  const [isEducationOpen, setIsEducationOpen] = useState(false);

  useEffect(() => {
    dispatch(loadAllRole());
    dispatch(loadAllDepartment());
    dispatch(loadAllDesignation({ query: "all" }));
    dispatch(loadAllShift());

    dispatch(loadAllEmployeeStatus());
    dispatch(loadAllWeeklyHoliday());

    getProvinces().then(setProvinces);
  }, [dispatch]);

  // ✅ Handle birth address changes
  const handleBirthProvinceChange = (value) => {
    setBirthDistricts([]);
    setBirthWards([]);
    form.setFieldsValue({
      birthDistrict: undefined,
      birthWard: undefined,
    });
    if (value) {
      getDistricts(value).then(setBirthDistricts);
    }
  };

  const handleBirthDistrictChange = (value) => {
    setBirthWards([]);
    form.setFieldsValue({ birthWard: undefined });
    if (value) {
      getWards(value).then(setBirthWards);
    }
  };

  // ✅ Handle hometown address changes
  const handleHometownProvinceChange = (value) => {
    setHometownDistricts([]);
    setHometownWards([]);
    form.setFieldsValue({
      hometownDistrict: undefined,
      hometownWard: undefined,
    });
    if (value) {
      getDistricts(value).then(setHometownDistricts);
    }
  };

  const handleHometownDistrictChange = (value) => {
    setHometownWards([]);
    form.setFieldsValue({ hometownWard: undefined });
    if (value) {
      getWards(value).then(setHometownWards);
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  return (
    <>
      <div className="mr-top mt-5 p-5 ant-card " style={{ maxWidth: "100%" }}>
        <div>
          <h1 className="font-bold text-xl flex justify-center mb-5 ">
            THÊM MỚI NHÂN SỰ
          </h1>
        </div>

        <Form
          size="small"
          form={form}
          name="basic"
          labelAlign="left"
          className="staff-form"
          labelWrap
          colon={false}
          labelCol={{
            xs: { span: 24 },
            sm: { span: 8 },
            lg: { span: 8 },
          }}
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 16 },
            lg: { span: 16 },
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* Thông tin chung */}
          <div className="flex items-center justify-center mt-3 mb-3 txt-color">
            <h2 className="text-center mr-2">THÔNG TIN CHUNG</h2>
          </div>

          <Row
            className="staff-form-row"
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
            justify="center"
            align="middle"
          >
            <Col span={12} className="gutter-row form-color">
              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Họ tên đệm"
                name="firstName"
              >
                <Input placeholder="Nguyễn Văn" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Tên"
                name="lastName"
              >
                <Input placeholder="A" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Tên đăng nhập"
                name="username"
              >
                <Input placeholder="nguyenvana" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Mật khẩu"
                name="password"
              >
                <Input placeholder="*******" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Số CCCD"
                name="nationalId"
              >
                <Input placeholder="Nhập số căn cước công dân" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Email"
                name="email"
              >
                <Input placeholder="nguyenvana@example.com" />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Số điện thoại"
                name="phone"
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
              <Form.Item
                label="Phân quyền"
                name={"roleId"}
                style={{ marginBottom: "10px" }}
              >
                <Select
                  loading={!list}
                  size="middle"
                  mode="single"
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  placeholder="Vui lòng chọn"
                >
                  {list &&
                    list.map((role) => (
                      <Option key={role.id} value={role.id}>
                        {role.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item
                name={"departmentId"}
                style={{ marginBottom: "10px" }}
                label={
                  <>
                    Phòng ban
                    <BigDrawer title="new Department">
                      <AddDepartment drawer="true" />
                    </BigDrawer>
                  </>
                }
              >
                <Select
                  loading={!department}
                  placeholder="Select Department"
                  allowClear
                  size={"middle"}
                >
                  {department &&
                    department.map((department) => (
                      <Option key={department.id} value={department.id}>
                        {department.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
              {/* <Form.Item
                name="profileImage"
                label="Ảnh chân dung"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                tooltip="Tải lên 1 ảnh (jpg, png)"
                style={{ marginBottom: "10px" }}
              >
                <Upload
                  listType="picture-card"
                  maxCount={1}
                  beforeUpload={() => false}
                  accept="image/*"
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Tải ảnh</div>
                  </div>
                </Upload>
              </Form.Item>
          
              <Form.Item
                name="otherImage"
                label="Ảnh căn cước công dân, hộ chiếu, thẻ Đảng viên"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                tooltip="Tải nhiều ảnh (jpg, png)"
                style={{ marginBottom: "10px" }}
              >
                <Upload
                  listType="picture-card"
                  multiple
                  beforeUpload={() => false}
                  accept="image/*"
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Tải ảnh</div>
                  </div>
                </Upload>
              </Form.Item> */}
            </Col>
          </Row>

          <div className="flex items-center justify-center mt-3 mb-3 txt-color">
            <h2 className="text-center text-sm mr-2">SƠ YẾU LÝ LỊCH</h2>
            <Tooltip title={isResumeOpen ? "Thu gọn" : "Mở rộng"}>
              <Button
                type="default"
                shape="circle"
                size="middle"
                className="ml-2 !flex !items-center !justify-center !w-7 !h-7 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 shadow-sm hover:shadow transition"
                icon={isResumeOpen ? <UpOutlined /> : <DownOutlined />}
                onClick={() => setIsResumeOpen((prev) => !prev)}
                aria-label={
                  isResumeOpen
                    ? "Thu gọn Sơ yếu lý lịch"
                    : "Mở rộng Sơ yếu lý lịch"
                }
              />
            </Tooltip>
          </div>

          {isResumeOpen && (
            <Row
              className="staff-form-row"
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
              justify="center"
              align="middle"
            >
              {" "}
              {/* Sơ yếu lí lịch */}
              <Col span={12} className="gutter-row">
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Họ và tên khai sinh (in hoa)"
                  name="fullNameBirth"
                >
                  <Input placeholder="NGUYỄN VĂN A" style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Giới tính"
                  name="gender"
                >
                  <Radio.Group>
                    <Radio value="Nam">Nam</Radio>
                    <Radio value="Nữ">Nữ</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Các tên gọi khác"
                  name="otherNames"
                >
                  <Input placeholder="CA" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Ngày sinh"
                  name="birthDate"
                >
                  <DatePicker className="date-picker hr-staffs-date-picker" />
                </Form.Item>
                <Form.Item style={{ marginBottom: "10px" }} label="Nơi sinh">
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    <Form.Item
                      name="birthProvince"
                      style={{ flex: 1, marginBottom: 0 }}
                    >
                      <Select
                        size="middle"
                        style={{ height: 35 }}
                        placeholder="Tỉnh/TP"
                        options={provinces.map((p) => ({
                          value: p.code,
                          label: p.name,
                        }))}
                        onChange={handleBirthProvinceChange}
                        allowClear
                      />
                    </Form.Item>
                    <Form.Item
                      name="birthDistrict"
                      style={{ flex: 1, marginBottom: 0 }}
                    >
                      <Select
                        size="middle"
                        style={{ height: 35 }}
                        placeholder="Quận/Huyện"
                        options={birthDistricts.map((d) => ({
                          value: d.code,
                          label: d.name,
                        }))}
                        onChange={handleBirthDistrictChange}
                        allowClear
                      />
                    </Form.Item>
                    <Form.Item
                      name="birthWard"
                      style={{ flex: 1, marginBottom: 0 }}
                    >
                      <Select
                        size="middle"
                        style={{ height: 35 }}
                        placeholder="Xã/Phường"
                        options={birthWards.map((w) => ({
                          value: w.code,
                          label: w.name,
                        }))}
                        allowClear
                      />
                    </Form.Item>
                  </div>
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Quê quán (xã, phường, tỉnh, TP)"
                >
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    <Form.Item
                      name="hometownProvince"
                      style={{ flex: 1, marginBottom: 0 }}
                    >
                      <Select
                        size="middle"
                        style={{ height: 35 }}
                        placeholder="Tỉnh/TP"
                        options={provinces.map((p) => ({
                          value: p.code,
                          label: p.name,
                        }))}
                        onChange={handleHometownProvinceChange}
                        allowClear
                      />
                    </Form.Item>
                    <Form.Item
                      name="hometownDistrict"
                      style={{ flex: 1, marginBottom: 0 }}
                    >
                      <Select
                        size="middle"
                        style={{ height: 35 }}
                        placeholder="Quận/Huyện"
                        options={hometownDistricts.map((d) => ({
                          value: d.code,
                          label: d.name,
                        }))}
                        onChange={handleHometownDistrictChange}
                        allowClear
                      />
                    </Form.Item>
                    <Form.Item
                      name="hometownWard"
                      style={{ flex: 1, marginBottom: 0 }}
                    >
                      <Select
                        size="middle"
                        style={{ height: 35 }}
                        placeholder="Xã/Phường"
                        options={hometownWards.map((w) => ({
                          value: w.code,
                          label: w.name,
                        }))}
                        allowClear
                      />
                    </Form.Item>
                  </div>
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Địa chỉ thường trú"
                  name="permanentAddress"
                >
                  <Input placeholder="..." />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Quốc tịch"
                  name="nationality"
                >
                  <Input placeholder="Việt Nam" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Dân tộc"
                  name="ethnicity"
                >
                  <Input placeholder="Kinh" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Tôn giáo"
                  name="religion"
                >
                  <Input placeholder="Không" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Số CCCD"
                  name="personalId"
                >
                  <Input placeholder="123456789" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Ngày cấp"
                  name="issueDate"
                >
                  <DatePicker className="date-picker hr-staffs-date-picker" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Nơi cấp"
                  name="issuePlace"
                >
                  <Input placeholder="Việt Nam" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Số TK ngân hàng"
                  name="bankAccountNumber"
                >
                  <Input placeholder="000000" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Ngân hàng"
                  name="bankName"
                >
                  <Input placeholder="MB bank" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Giấy khám sức khỏe"
                  name="healthCertificate"
                >
                  <Upload
                    beforeUpload={() => false}
                    multiple
                    accept="application/pdf,image/*"
                  >
                    <Button icon={<PlusOutlined />}>Import file</Button>
                  </Upload>
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Sơ yếu lý lịch"
                  name="resume"
                >
                  <Input placeholder="Có/không import file" />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Chiều cao (cm)"
                  name="height"
                >
                  <Input placeholder="170" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Cân nặng (kg)"
                  name="weight"
                >
                  <Input placeholder="60" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Danh hiệu nhà nước phong"
                  name="stateTitle"
                >
                  <Input placeholder="Huân chương Sao Vàng" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Thành phần gia đình xuất thân"
                  name="familyBackground"
                >
                  <Input placeholder="Nông dân" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Nghề nghiệp trước đây"
                  name="previousOccupation"
                >
                  <Input placeholder="Giáo viên" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Ngày vào Đảng CSVN"
                  name="joinPartyDate"
                >
                  <DatePicker className="date-picker hr-staffs-date-picker" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Ngày tham gia tổ chức CT-XH"
                  name="joinOrganizationDate"
                >
                  <DatePicker className="date-picker hr-staffs-date-picker" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Ngày nhập ngũ(nếu có)"
                  name="joinArmyDate"
                >
                  <DatePicker className="date-picker hr-staffs-date-picker" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Ngày xuất ngũ(nếu có)"
                  name="leaveArmyDate"
                >
                  <DatePicker className="date-picker hr-staffs-date-picker" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Quân hàm cao nhất (nếu có)"
                  name="highestRank"
                >
                  <Input placeholder="Đại Tướng" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Đối tượng chính sách(nếu có)"
                  name="policyObject"
                >
                  <Input placeholder="Không" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Trình độ giáo dục phổ thông"
                  name="educationLevelGeneral"
                >
                  <Input placeholder="Không" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "50px" }}
                  label="Quá trình công tác"
                  name="workHistory"
                >
                  <QuillEditor height={150} />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Đơn vị công tác (Đảng, chính quyền, đoàn thể, tổ chức)"
                  name="workUnit"
                >
                  <Input placeholder="Không" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Chức danh/chức vụ"
                  name="positionTitle"
                >
                  <Input placeholder="Không" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Ngày được tuyển dụng lần đầu"
                  name="firstRecruitmentDate"
                >
                  <DatePicker className="date-picker hr-staffs-date-picker" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Ngày vào cơ quan hiện đang công tác"
                  name="currentAgencyJoinDate"
                >
                  <DatePicker className="date-picker hr-staffs-date-picker" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "50px" }}
                  label="Khai rõ: bị bắt, bị tù"
                  name="arrestHistory"
                >
                  <QuillEditor height={150} />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "50px" }}
                  label="Tham gia hoặc có quan hệ với các tổ chức chính trị, kinh tế, xã hội..."
                  name="organizationRelations"
                >
                  <QuillEditor height={150} />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "50px" }}
                  label="Mối quan hệ: cha, mẹ, vợ(chồng), các con, anh chị em ruột"
                  name="familyRelations"
                >
                  <QuillEditor height={150} />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "50px" }}
                  label="Hoàn cảnh kinh tế gia đình"
                  name="familyEconomy"
                >
                  <QuillEditor height={150} />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Ngày nghỉ phép"
                  name="leaveDate"
                >
                  <DatePicker className="date-picker hr-staffs-date-picker" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Ngày kết thúc làm việc cơ quan (nghỉ hưu)"
                  name="retirementDate"
                >
                  <DatePicker className="date-picker hr-staffs-date-picker" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Mã số nhân viên"
                  name="staffCode"
                >
                  <Input placeholder="Không" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Nhóm máu"
                  name="bloodGroup"
                >
                  <Select
                    placeholder="Lựa chọn nhóm máu"
                    allowClear
                    mode="single"
                    size="middle"
                    style={{
                      width: "100%",
                    }}
                  >
                    {bloodGroups.map((bloodGroup) => (
                      <Option key={bloodGroup} value={bloodGroup}>
                        {bloodGroup}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name={"employmentStatusId"}
                  style={{ marginBottom: "10px" }}
                  label={
                    <>
                      Trạng thái hoạt động
                      <BigDrawer title="new Employee Status">
                        <AddEmploymentStatus drawer="true" />
                      </BigDrawer>
                    </>
                  }
                >
                  <Select
                    placeholder="Select Status"
                    allowClear
                    size={"middle"}
                  >
                    {employmentStatus &&
                      employmentStatus.map((employmentStatus) => (
                        <Option
                          key={employmentStatus.id}
                          value={employmentStatus.id}
                        >
                          {employmentStatus.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name={"departmentId"}
                  style={{ marginBottom: "10px" }}
                  label={
                    <>
                      Phòng ban
                      <BigDrawer title="new Department">
                        <AddDepartment drawer="true" />
                      </BigDrawer>
                    </>
                  }
                >
                  <Select
                    loading={!department}
                    placeholder="Select Department"
                    allowClear
                    size={"middle"}
                  >
                    {department &&
                      department.map((department) => (
                        <Option key={department.id} value={department.id}>
                          {department.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Chức vụ"
                  name={"rolePosition"}
                  style={{ marginBottom: "10px" }}
                >
                  <Select
                    loading={!list}
                    size="middle"
                    mode="single"
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    placeholder="Vui lòng chọn"
                  >
                    {list &&
                      list.map((role) => (
                        <Option key={role.id} value={role.id}>
                          {role.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Chức vụ hiện tại"
                  name="currentPosition"
                >
                  <Input placeholder="Giáo viên" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Ngạch/chức danh hiện tại"
                  name="currentRank"
                >
                  <Input placeholder="Giáo viên" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Loại hợp đồng(nếu có)"
                  name="contractType"
                >
                  <Input placeholder="Giáo viên" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Ngày vào làm việc"
                  name="workStartDate"
                >
                  <DatePicker className="date-picker hr-staffs-date-picker" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Loại hình"
                  name="employmentType"
                >
                  <Input placeholder="Giáo viên" />
                </Form.Item>
              </Col>
            </Row>
          )}

          <Row
            className="staff-form-row"
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
            justify="center"
            align="middle"
          >
            {" "}
            <Col span={12} className="gutter-row">
              <div className="flex items-center justify-center mt-3 mb-3 txt-color">
                <h2 className="text-center text-sm mr-2">
                  THÔNG TIN VỀ CHỨC DANH & MỨC LƯƠNG
                </h2>
                <Tooltip title={isPositionSalaryOpen ? "Thu gọn" : "Mở rộng"}>
                  <Button
                    type="default"
                    shape="circle"
                    size="middle"
                    className="ml-2 !flex !items-center !justify-center !w-7 !h-7 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 shadow-sm hover:shadow transition"
                    icon={
                      isPositionSalaryOpen ? <UpOutlined /> : <DownOutlined />
                    }
                    onClick={() => setIsPositionSalaryOpen((prev) => !prev)}
                    aria-label={
                      isPositionSalaryOpen
                        ? "Thu gọn Thông tin chức danh & mức lương"
                        : "Mở rộng Thông tin chức danh & mức lương"
                    }
                  />
                </Tooltip>
              </div>

              {isPositionSalaryOpen && (
                <>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Ngạch/chức danh"
                    name="positionTitle"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Mã số (nếu có)"
                    name="positionCode"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Ngày được bổ nhiệm/ngày phê chuẩn"
                    name="appointmentStartDate"
                  >
                    <DatePicker className="date-picker hr-staffs-date-picker" />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Thời hạn bổ nhiệm"
                    name="appointmentEndDate"
                  >
                    <DatePicker className="date-picker hr-staffs-date-picker" />
                  </Form.Item>

                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Ngày được bổ nhiệm lại/phê chuẩn nhiệm kỳ tiếp theo"
                    name="reappointmentDate"
                  >
                    <DatePicker className="date-picker hr-staffs-date-picker" />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Được quy hoạnh chức danh"
                    name="positionAllocation"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Chức vụ, chức vụ kiêm nhiệm"
                    name="concurrentPosition"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Chức vụ Đảng hiện tại"
                    name="currentPartyPosition"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Chức vụ Đảng kiêm nhiệm"
                    name="alternatePartyPosition"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Vị trí công tác"
                    name="workPosition"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>

                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Công việc chính được giao"
                    name="mainAssignedJob"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>

                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Sở trường công tác"
                    name="specializedField"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Công việc làm lâu nhất"
                    name="longestJob"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Lương vị trí"
                    name="positionSalary"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Bậc lương"
                    name="salaryLevel"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Hệ số lương"
                    name="salaryCoefficient"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Ngày hưởng lương"
                    name="salaryStartDate"
                  >
                    <DatePicker className="date-picker hr-staffs-date-picker" />
                  </Form.Item>

                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Phần trăm hưởng (%)"
                    name="salaryPercentage"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Phụ cấp thâm niên vượt khung(%)"
                    name="seniorityAllowance"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Ngày hưởng PCTNVK"
                    name="pctnvkDate"
                  >
                    <DatePicker className="date-picker hr-staffs-date-picker" />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Phụ cấp chức vụ"
                    name="positionAllowance"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Phụ cấp kiêm nhiệm"
                    name="additionalAllowance"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Phụ cấp khác"
                    name="otherAllowance"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Vị trí việc làm"
                    name="jobPosition"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>

                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Mã số"
                    name="jobCode"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>

                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Lương theo mức tiền(VNĐ)"
                    name="salaryAmount"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>

                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Ghi chú về mức lương"
                    name="salaryComment"
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Thu nhập tăng thêm"
                    name="additionalIncome"
                  >
                    <Input />
                  </Form.Item>
                </>
              )}
            </Col>
          </Row>
          <Row
            className="staff-form-row"
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
            justify="center"
            align="middle"
          >
            {" "}
            <Col span={12} className="gutter-row">
              <div className="flex items-center justify-center mt-3 mb-3 txt-color">
                <h2 className="text-center text-sm mr-2">THÔNG TIN GIÁO DỤC</h2>
                <Tooltip title={isEducationOpen ? "Thu gọn" : "Mở rộng"}>
                  <Button
                    type="default"
                    shape="circle"
                    size="middle"
                    className="ml-2 !flex !items-center !justify-center !w-7 !h-7 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 shadow-sm hover:shadow transition"
                    icon={isEducationOpen ? <UpOutlined /> : <DownOutlined />}
                    onClick={() => setIsEducationOpen((prev) => !prev)}
                    aria-label={
                      isEducationOpen
                        ? "Thu gọn Thông tin giáo dục"
                        : "Mở rộng Thông tin giáo dục"
                    }
                  />
                </Tooltip>
              </div>

              {isEducationOpen && (
                <>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Học hàm"
                    name="academicTitle"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Bằng tốt nghiệp"
                    name="degree"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Cơ quan, tổ chức cấp"
                    name="issuingOrganization"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Trình độ học vấn"
                    name="educationLevel"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Hồ sơ đính kèm ( import)"
                    name="attachedFile"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Lí luận chính trị"
                    name="politicalTheory"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Chuyên môn (Từ trung cấp trở lên cả trong nước và ngoài nước)"
                    name="specialized"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Tên cơ sở đào tạo"
                    name="trainingInstitution"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Chuyên ngành đào tạo"
                    name="trainingSpecialization"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Hình thức đào tạo"
                    name="trainingForm"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Văn bằng trình độ"
                    name="educationDegree"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Ngày bắt đầu"
                    name="educationStartDate"
                  >
                    <DatePicker className="date-picker hr-staffs-date-picker" />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Ngày kết thúc"
                    name="educationEndDate"
                  >
                    <DatePicker className="date-picker hr-staffs-date-picker" />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Bồi dưỡng quản lý nhà nước/chức danh nghề nghiệp/nghiệp vụ chuyên ngành"
                    name="trainingContent"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Tên cơ sở đào tạo"
                    name="managementTrainingInstitution"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Ngày bắt đầu"
                    name="managementTrainingStartDate"
                  >
                    <DatePicker className="date-picker hr-staffs-date-picker" />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Ngày kết thúc"
                    name="managementTrainingEndDate"
                  >
                    <DatePicker className="date-picker hr-staffs-date-picker" />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Bồi dưỡng kiến thức an ninh, quốc phòng"
                    name="securityDefenseTraining"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Tên cơ sở đào tạo"
                    name="securityDefenseInstitution"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Bằng/chứng chỉ được cấp"
                    name="securityDefenseCertificate"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Ngày bắt đầu"
                    name="securityDefenseStartDate"
                  >
                    <DatePicker className="date-picker hr-staffs-date-picker" />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Ngày kết thúc"
                    name="securityDefenseEndDate"
                  >
                    <DatePicker className="date-picker hr-staffs-date-picker" />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Tin học"
                    name="itSkills"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Tên cơ sở đào tạo"
                    name="itTrainingInstitution"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Bằng/chứng chỉ được cấp"
                    name="itCertificate"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Ngày bắt đầu"
                    name="itTrainingStartDate"
                  >
                    <DatePicker className="date-picker hr-staffs-date-picker" />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Ngày kết thúc"
                    name="itTrainingEndDate"
                  >
                    <DatePicker className="date-picker hr-staffs-date-picker" />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Ngoại ngữ/tiếng dân tộc"
                    name="foreignLanguage"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Tên cơ sở đào tạo"
                    name="languageTrainingInstitution"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Bằng/chứng chỉ được cấp"
                    name="languageCertificate"
                  >
                    <Input placeholder="" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Ngày bắt đầu"
                    name="languageTrainingStartDate"
                  >
                    <DatePicker className="date-picker hr-staffs-date-picker" />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Ngày kết thúc"
                    name="languageTrainingEndDate"
                  >
                    <DatePicker className="date-picker hr-staffs-date-picker" />
                  </Form.Item>
                </>
              )}
            </Col>
          </Row>
          <Form.Item
            style={{ marginBottom: "10px", marginTop: "10px" }}
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                className="mt-5"
                size="large"
                type="primary"
                htmlType="submit"
                shape="round"
                loading={loader}
                style={{ minWidth: "200px", maxWidth: "300px" }}
              >
                Thêm Mới Nhân Viên
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddStaff;
