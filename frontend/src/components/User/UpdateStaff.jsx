import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
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
import { useParams, useNavigate } from "react-router-dom";
import { loadAllDepartment } from "../../redux/rtk/features/hrm/department/departmentSlice";
import { loadAllDesignation } from "../../redux/rtk/features/hrm/designation/designationSlice";
import { loadAllEmployeeStatus } from "../../redux/rtk/features/hrm/employeeStatus/employeeStatusSlice";
import { loadAllRole } from "../../redux/rtk/features/hr/role/roleSlice";
import { loadAllShift } from "../../redux/rtk/features/hrm/shift/shiftSlice";
import {
  loadSingleStaff,
  updateStaff,
} from "../../redux/rtk/features/hrm/user/userSlice";
import ImageUploader from "@/UI/ImageUploader";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import BigDrawer from "../Drawer/BigDrawer";
import AddDepartment from "../HRM/Department/AddDepartment";
import {
  loadAllWeeklyHoliday,
} from "@/redux/rtk/features/hrm/holiday/weeklyHolidaySlice";
import { message } from "antd";
import dayjs from "dayjs";

const UpdateStaff = () => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(true);
  const { list } = useSelector((state) => state.role);
  const { list: department } = useSelector((state) => state.department);
  const { list: designation } = useSelector((state) => state.designations);
  const { list: employmentStatus } = useSelector(
    (state) => state.employmentStatus
  );
  const { list: shift } = useSelector((state) => state.shift);
  const { user, loading: userLoading } = useSelector((state) => state.users);
  const [fileList, setFileList] = useState([]);

  const { list: weeklyHoliday, loading: weekLoading } = useSelector(
    (state) => state.weeklyHoliday
  );

  const [form] = Form.useForm();

  // Define constants and state variables
  const DATE_DISPLAY_FORMAT = "DD-MM-YYYY";
  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const [provinces, setProvinces] = useState([]);
  const [birthDistricts, setBirthDistricts] = useState([]);
  const [birthWards, setBirthWards] = useState([]);
  const [hometownDistricts, setHometownDistricts] = useState([]);
  const [hometownWards, setHometownWards] = useState([]);

  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isPositionSalaryOpen, setIsPositionSalaryOpen] = useState(false);
  const [isEducationOpen, setIsEducationOpen] = useState(false);

  // QuillEditor component
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

  // Load staff data when component mounts
  useEffect(() => {
    if (id) {
      dispatch(loadSingleStaff(id));
    }
  }, [id, dispatch]);

  // Set form values when user data is loaded
  useEffect(() => {
    if (user && !userLoading) {
      setLoading(false);

      try {
        const toStr = (v) => (v === 0 ? "0" : v ? String(v) : undefined);
        const formValues = {
          fullName: user.fullName || "",
          email: user.email || "",
          phone: user.phone || "",
          username: user.username || "",
          // password: "", // Don't pre-fill password
          nationalId: user.nationalId || "",
          note: user.note || "",
          roleId: user.roleId || "",
          departmentId: user.departmentId || "",
          profileImage: user.profileImage
            ? [
                {
                  uid: "-1",
                  name: "profile-image",
                  status: "done",
                  url: user.profileImage,
                },
              ]
            : [],
          nationalIdImage: user.nationalIdImage
            ? [
                {
                  uid: "-2",
                  name: "national-id-image",
                  status: "done",
                  url: user.nationalIdImage,
                },
              ]
            : [],

          // Staff Resume fields
          fullNameBirth: user.staffResume?.fullNameBirth || "",
          gender: user.staffResume?.gender || "",
          otherNames: user.staffResume?.otherNames || "",
          birthDate: user.staffResume?.birthDate
            ? dayjs(user.staffResume.birthDate)
            : null,
          birthProvince: toStr(user.staffResume?.birthProvince) || undefined,
          birthDistrict: toStr(user.staffResume?.birthDistrict) || undefined,
          birthWard: toStr(user.staffResume?.birthWard) || undefined,
          hometownProvince:
            toStr(user.staffResume?.hometownProvince) || undefined,
          hometownDistrict:
            toStr(user.staffResume?.hometownDistrict) || undefined,
          hometownWard: toStr(user.staffResume?.hometownWard) || undefined,
          permanentAddress: user.staffResume?.permanentAddress || "",
          nationality: user.staffResume?.nationality || "",
          ethnicity: user.staffResume?.ethnicity || "",
          religion: user.staffResume?.religion || "",
          personalId: user.staffResume?.personalId || "",
          issueDate: user.staffResume?.issueDate
            ? dayjs(user.staffResume.issueDate)
            : null,
          issuePlace: user.staffResume?.issuePlace || "",
          bankAccountNumber: user.staffResume?.bankAccountNumber || "",
          bankName: user.staffResume?.bankName || "",
          healthCertificate: user.staffResume?.healthCertificate || [],
          resume: user.staffResume?.resume || [],
          height: user.staffResume?.height || "",
          weight: user.staffResume?.weight || "",
          stateTitle: user.staffResume?.stateTitle || "",
          familyBackground: user.staffResume?.familyBackground || "",
          previousOccupation: user.staffResume?.previousOccupation || "",
          joinPartyDate: user.staffResume?.joinPartyDate
            ? dayjs(user.staffResume.joinPartyDate)
            : null,
          partyCardNumber: user.staffResume?.partyCardNumber || "",
          joinPartyDateOficial: user.staffResume?.joinPartyDateOficial
            ? dayjs(user.staffResume.joinPartyDateOficial)
            : null,
          partyPosition: user.staffResume?.partyPosition || "",
          leavePartyDate: user.staffResume?.leavePartyDate
            ? dayjs(user.staffResume.leavePartyDate)
            : null,
          birthDateParty: user.staffResume?.birthDateParty
            ? dayjs(user.staffResume.birthDateParty)
            : null,
          partyCell: user.staffResume?.partyCell || "",
          joinPartyDate2nd: user.staffResume?.joinPartyDate2nd
            ? dayjs(user.staffResume.joinPartyDate2nd)
            : null,
          joinOrganizationDate: user.staffResume?.joinOrganizationDate
            ? dayjs(user.staffResume.joinOrganizationDate)
            : null,
          joinArmyDate: user.staffResume?.joinArmyDate
            ? dayjs(user.staffResume.joinArmyDate)
            : null,
          leaveArmyDate: user.staffResume?.leaveArmyDate
            ? dayjs(user.staffResume.leaveArmyDate)
            : null,
          highestRank: user.staffResume?.highestRank || "",
          policyObject: user.staffResume?.policyObject || "",
          educationLevelGeneral: user.staffResume?.educationLevelGeneral || "",
          workHistory: user.staffResume?.workHistory || "",
          workUnit: user.staffResume?.workUnit || "",
          firstRecruitmentDate: user.staffResume?.firstRecruitmentDate
            ? dayjs(user.staffResume.firstRecruitmentDate)
            : null,
          currentAgencyJoinDate: user.staffResume?.currentAgencyJoinDate
            ? dayjs(user.staffResume.currentAgencyJoinDate)
            : null,
          arrestHistory: user.staffResume?.arrestHistory || "",
          organizationRelations: user.staffResume?.organizationRelations || "",
          familyRelations: user.staffResume?.familyRelations || "",
          familyEconomy: user.staffResume?.familyEconomy || "",
          bloodGroup: user.staffResume?.bloodGroup || "",
          leaveDate: user.staffResume?.leaveDate
            ? dayjs(user.staffResume.leaveDate)
            : null,
          retirementDate: user.staffResume?.retirementDate
            ? dayjs(user.staffResume.retirementDate)
            : null,
          staffCode: user.staffResume?.staffCode || "",
          rolePosition: user.staffResume?.rolePosition || "",
          currentPosition: user.staffResume?.currentPosition || "",
          currentRank: user.staffResume?.currentRank || "",
          contractType: user.staffResume?.contractType || "",
          workStartDate: user.staffResume?.workStartDate
            ? dayjs(user.staffResume.workStartDate)
            : null,
          employmentType: user.staffResume?.employmentType || "",
          // Position & Salary fields
          positionCode: user.staffPositionSalary?.positionCode || "",
          appointmentStartDate: user.staffPositionSalary?.appointmentStartDate
            ? dayjs(user.staffPositionSalary.appointmentStartDate)
            : null,
          appointmentEndDate: user.staffPositionSalary?.appointmentEndDate
            ? dayjs(user.staffPositionSalary.appointmentEndDate)
            : null,
          reappointmentDate: user.staffPositionSalary?.reappointmentDate
            ? dayjs(user.staffPositionSalary.reappointmentDate)
            : null,
          positionAllocation:
            user.staffPositionSalary?.positionAllocation || "",
          concurrentPosition:
            user.staffPositionSalary?.concurrentPosition || "",
          currentPartyPosition:
            user.staffPositionSalary?.currentPartyPosition || "",
          alternatePartyPosition:
            user.staffPositionSalary?.alternatePartyPosition || "",
          workPosition: user.staffPositionSalary?.workPosition || "",
          mainAssignedJob: user.staffPositionSalary?.mainAssignedJob || "",
          specializedField: user.staffPositionSalary?.specializedField || "",
          longestJob: user.staffPositionSalary?.longestJob || "",
          positionSalary: user.staffPositionSalary?.positionSalary || "",
          salaryLevel: user.staffPositionSalary?.salaryLevel || "",
          salaryCoefficient: user.staffPositionSalary?.salaryCoefficient || "",
          salaryStartDate: user.staffPositionSalary?.salaryStartDate
            ? dayjs(user.staffPositionSalary.salaryStartDate)
            : null,
          salaryPercentage: user.staffPositionSalary?.salaryPercentage || "",
          seniorityAllowance:
            user.staffPositionSalary?.seniorityAllowance || "",
          pctnvkDate: user.staffPositionSalary?.pctnvkDate
            ? dayjs(user.staffPositionSalary.pctnvkDate)
            : null,
          positionAllowance: user.staffPositionSalary?.positionAllowance || "",
          additionalAllowance:
            user.staffPositionSalary?.additionalAllowance || "",
          otherAllowance: user.staffPositionSalary?.otherAllowance || "",
          jobPosition: user.staffPositionSalary?.jobPosition || "",
          jobCode: user.staffPositionSalary?.jobCode || "",
          salaryAmount: user.staffPositionSalary?.salaryAmount || "",
          salaryComment: user.staffPositionSalary?.salaryComment || "",
          additionalIncome: user.staffPositionSalary?.additionalIncome || "",
          positionTitle: user.staffPositionSalary?.positionTitle || "",
          // Education fields
          academicTitle: user.staffEducation?.academicTitle || "",
          degree: user.staffEducation?.degree || "",
          issuingOrganization: user.staffEducation?.issuingOrganization || "",
          educationLevel: user.staffEducation?.educationLevel || "",
          attachedFile: user.staffEducation?.attachedFile || [],
          politicalTheory: user.staffEducation?.politicalTheory || "",
          specialized: user.staffEducation?.specialized || "",
          trainingInstitution: user.staffEducation?.trainingInstitution || "",
          trainingSpecialization:
            user.staffEducation?.trainingSpecialization || "",
          trainingForm: user.staffEducation?.trainingForm || "",
          educationDegree: user.staffEducation?.educationDegree || "",
          educationStartDate: user.staffEducation?.educationStartDate
            ? dayjs(user.staffEducation.educationStartDate)
            : null,
          educationEndDate: user.staffEducation?.educationEndDate
            ? dayjs(user.staffEducation.educationEndDate)
            : null,
          trainingContent: user.staffEducation?.trainingContent || "",
          managementTrainingInstitution:
            user.staffEducation?.managementTrainingInstitution || "",
          managementTrainingStartDate: user.staffEducation
            ?.managementTrainingStartDate
            ? dayjs(user.staffEducation.managementTrainingStartDate)
            : null,
          managementTrainingEndDate: user.staffEducation
            ?.managementTrainingEndDate
            ? dayjs(user.staffEducation.managementTrainingEndDate)
            : null,
          securityDefenseTraining:
            user.staffEducation?.securityDefenseTraining || "",
          securityDefenseInstitution:
            user.staffEducation?.securityDefenseInstitution || "",
          securityDefenseCertificate:
            user.staffEducation?.securityDefenseCertificate || [],
          securityDefenseStartDate: user.staffEducation
            ?.securityDefenseStartDate
            ? dayjs(user.staffEducation.securityDefenseStartDate)
            : null,
          securityDefenseEndDate: user.staffEducation?.securityDefenseEndDate
            ? dayjs(user.staffEducation.securityDefenseEndDate)
            : null,
          itSkills: user.staffEducation?.itSkills || "",
          itTrainingInstitution:
            user.staffEducation?.itTrainingInstitution || "",
          itCertificate: user.staffEducation?.itCertificate || [],
          itTrainingStartDate: user.staffEducation?.itTrainingStartDate
            ? dayjs(user.staffEducation.itTrainingStartDate)
            : null,
          itTrainingEndDate: user.staffEducation?.itTrainingEndDate
            ? dayjs(user.staffEducation.itTrainingEndDate)
            : null,
          foreignLanguage: user.staffEducation?.foreignLanguage || "",
          languageTrainingInstitution:
            user.staffEducation?.languageTrainingInstitution || "",
          languageCertificate: user.staffEducation?.languageCertificate || [],
          languageTrainingStartDate: user.staffEducation
            ?.languageTrainingStartDate
            ? dayjs(user.staffEducation.languageTrainingStartDate)
            : null,
          languageTrainingEndDate: user.staffEducation?.languageTrainingEndDate
            ? dayjs(user.staffEducation.languageTrainingEndDate)
            : null,
        };

        form.setFieldsValue(formValues);

        // Load districts and wards if provinces are set
        const bp = toStr(user.staffResume?.birthProvince);
        const bd = toStr(user.staffResume?.birthDistrict);
        const hp = toStr(user.staffResume?.hometownProvince);
        const hd = toStr(user.staffResume?.hometownDistrict);

        if (bp) {
          getDistricts(bp).then(setBirthDistricts);
          if (bd) {
            getWards(bd).then(setBirthWards);
          }
        }

        if (hp) {
          getDistricts(hp).then(setHometownDistricts);
          if (hd) {
            getWards(hd).then(setHometownWards);
          }
        }
      } catch (error) {
        console.error("Error setting form values:", error);
        setLoading(false);
      }
    } else if (!userLoading) {
      setLoading(false);
    }
  }, [user, userLoading, form]);

  // Load initial data
  useEffect(() => {
    dispatch(loadAllDepartment());
    dispatch(loadAllDesignation());
    dispatch(loadAllEmployeeStatus());
    dispatch(loadAllRole());
    dispatch(loadAllShift());
    dispatch(loadAllWeeklyHoliday());
  }, [dispatch]);

  // Load provinces data
  useEffect(() => {
    getProvinces().then(setProvinces);
  }, [dispatch]);

  // Handler functions
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

  // Show loading while data is being fetched
  if (loading || userLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu nhân viên...</p>
          <p className="text-sm text-gray-500">ID: {id}</p>
        </div>
      </div>
    );
  }

  // Show error if no user data
  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-600">
            Không tìm thấy thông tin nhân viên
          </h3>
          <Button onClick={() => navigate("/admin/staff")} className="mt-4">
            Quay lại danh sách
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mr-top mt-5 p-5 ant-card " style={{ maxWidth: "100%" }}>
        <div>
          <h1 className="font-bold text-xl flex justify-center mb-5 ">
            CẬP NHẬT THÔNG TIN NHÂN SỰ
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
          onFinish={async (values) => {
            setLoader(true);
            try {
              // helper format dayjs or native date to YYYY-MM-DD
              const fmt = (d) => {
                if (!d) return null;
                if (typeof d?.format === "function")
                  return d.format("YYYY-MM-DD");
                if (d instanceof Date && !isNaN(d)) {
                  const pad = (n) => String(n).padStart(2, "0");
                  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
                    d.getDate()
                  )}`;
                }
                return d; // primitive string (assume already correct)
              };

              // Các field ngày không theo hậu tố Date
              const specialDateFields = new Set([
                "joinPartyDate2nd",
                "joinPartyDateOficial",
                "birthDateParty",
              ]);

              const isDateKey = (k, v) => {
                if (/Date$/i.test(k)) return true;
                if (specialDateFields.has(k)) return true;
                if (
                  v &&
                  typeof v === "object" &&
                  typeof v.format === "function"
                )
                  return true;
                return false;
              };

              // Danh sách key giống với AddStaff.jsx để build payload lồng
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
                "partyCardNumber",
                "joinPartyDateOficial",
                "partyPosition",
                "leavePartyDate",
                "birthDateParty",
                "partyCell",
                "joinPartyDate2nd",
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
                "rolePosition",
                "currentPosition",
                "currentRank",
                "contractType",
                "workStartDate",
                "employmentType",
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

              // Build top-level payload. Chỉ gửi file nếu có file mới (originFileObj)
              const profileFiles = Array.isArray(values.profileImage)
                ? values.profileImage
                    .filter((f) => f?.originFileObj)
                    .map((f) => f.originFileObj)
                : [];
              const nationalIdFiles = Array.isArray(values.nationalIdImage)
                ? values.nationalIdImage
                    .filter((f) => f?.originFileObj)
                    .map((f) => f.originFileObj)
                : [];

              const payload = {
                username: values.username ?? null,
                email: values.email ?? null,
                fullName: values.fullName ?? null,
                note: values.note ?? null,
                phone: values.phone ?? null,
                nationalId: values.nationalId ?? null,
                roleId: values.roleId ?? null,
                departmentId: values.departmentId ?? null,
                ...(profileFiles.length > 0
                  ? { profileImage: profileFiles[0] }
                  : {}),
                ...(nationalIdFiles.length > 0
                  ? { nationalIdImage: nationalIdFiles }
                  : {}),
              };

              // staffResumes
              const staffResumes = {};
              resumeKeys.forEach((k) => {
                if (k in values) {
                  const isFileField = ["healthCertificate", "resume"].includes(
                    k
                  );
                  const val = values[k];
                  if (isFileField && Array.isArray(val)) {
                    const newFiles = val
                      .filter((f) => f?.originFileObj)
                      .map((f) => f.originFileObj);
                    if (newFiles.length > 0) staffResumes[k] = newFiles; // chỉ gửi khi có file mới
                  } else if (isDateKey(k, val)) {
                    staffResumes[k] = fmt(val);
                  } else {
                    staffResumes[k] = val;
                  }
                }
              });

              // staffPositionSalaries
              const staffPositionSalaries = {};
              positionSalaryKeys.forEach((k) => {
                if (k in values) {
                  const v = values[k];
                  staffPositionSalaries[k] = isDateKey(k, v) ? fmt(v) : v;
                }
              });

              // staffEducations
              const staffEducations = {};
              educationKeys.forEach((k) => {
                if (k in values) {
                  const isFileField = [
                    "attachedFile",
                    "securityDefenseCertificate",
                    "itCertificate",
                    "languageCertificate",
                  ].includes(k);
                  const val = values[k];
                  if (isFileField && Array.isArray(val)) {
                    const newFiles = val
                      .filter((f) => f?.originFileObj)
                      .map((f) => f.originFileObj);
                    if (newFiles.length > 0) staffEducations[k] = newFiles;
                  } else if (isDateKey(k, val)) {
                    staffEducations[k] = fmt(val);
                  } else {
                    staffEducations[k] = val;
                  }
                }
              });

              const finalPayload = {
                ...payload,
                staffResumes,
                staffPositionSalaries,
                staffEducations,
              };

              const resp = await dispatch(
                updateStaff({ id, values: finalPayload })
              );
              if (resp.payload?.message === "success") {
                message.success("Cập nhật nhân viên thành công!");
                navigate("/admin/staff");
              } else {
                message.error("Có lỗi xảy ra, vui lòng thử lại!");
              }
            } catch (error) {
              message.error("Lỗi hệ thống!");
            } finally {
              setLoader(false);
            }
          }}
          onFinishFailed={() => {}}
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
                label="Họ và tên"
                name="fullName"
              >
                <Input placeholder="Nguyễn Văn A" />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Tên đăng nhập quản trị hệ thống"
                name="username"
              >
                <Input placeholder="nguyenvana" />
              </Form.Item>

              {/* <Form.Item
                style={{ marginBottom: "10px" }}
                label="Mật khẩu"
                name="password"
              >
                <Input type="password" placeholder="*******" />
              </Form.Item> */}

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
                label="Số điện thoại đăng kí CCCD"
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

              <Form.Item
                name="profileImage"
                label="Ảnh chân dung"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                  if (Array.isArray(e)) {
                    return e;
                  }
                  return e?.fileList;
                }}
                tooltip="Tải lên 1 ảnh (jpg, png)"
                style={{ marginBottom: "10px" }}
              >
                <Upload
                  listType="picture-card"
                  maxCount={1}
                  multiple
                  beforeUpload={() => false}
                  accept="application/pdf,image/*"
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Tải ảnh</div>
                  </div>
                </Upload>
              </Form.Item>

              <Form.Item
                name="nationalIdImage"
                label="Ảnh căn cước công dân 2 mặt"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                  if (Array.isArray(e)) {
                    return e;
                  }
                  return e?.fileList;
                }}
                tooltip="Tải lên 1 ảnh (jpg, png)"
                style={{ marginBottom: "10px" }}
              >
                <Upload
                  listType="picture-card"
                  maxCount={1}
                  multiple
                  beforeUpload={() => false}
                  accept="application/pdf,image/*"
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Tải ảnh</div>
                  </div>
                </Upload>
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Ghi chú"
                name="note"
              >
                <Input.TextArea placeholder="Ghi chú" rows={3} />
              </Form.Item>
            </Col>
          </Row>

          {/* Sơ yếu lý lịch section */}
          <div className="flex items-center justify-center mt-3 mb-3 txt-color">
            <h2 className="text-center text-sm mr-2">SƠ YẾU LÝ LỊCH</h2>
            <Tooltip title={isResumeOpen ? "Thu gọn" : "Mở rộng"}>
              <Button
                type="default"
                shape="circle"
                size="middle"
                className="ml-2 !flex !items-center !justify-center !w-7 !h-7 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 shadow-sm hover:shadow transition"
                icon={isResumeOpen ? <UpOutlined /> : <DownOutlined />}
                onClick={() => {
                  setIsResumeOpen((prev) => !prev);
                }}
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
                  <DatePicker
                    format={DATE_DISPLAY_FORMAT}
                    className="date-picker hr-staffs-date-picker"
                  />
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
                          value: String(p.code),
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
                          value: String(d.code),
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
                          value: String(w.code),
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
                          value: String(p.code),
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
                          value: String(d.code),
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
                          value: String(w.code),
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
                  <DatePicker
                    format={DATE_DISPLAY_FORMAT}
                    className="date-picker hr-staffs-date-picker"
                  />
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
                  getValueFromEvent={(e) => {
                    if (Array.isArray(e)) {
                      return e;
                    }
                    return e?.fileList;
                  }}
                  valuePropName="fileList"
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
                  getValueFromEvent={(e) => {
                    if (Array.isArray(e)) {
                      return e;
                    }
                    return e?.fileList;
                  }}
                  valuePropName="fileList"
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
                  <DatePicker
                    format={DATE_DISPLAY_FORMAT}
                    className="date-picker hr-staffs-date-picker"
                  />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Số thẻ Đảng viên"
                  name="partyCardNumber"
                >
                  <Input placeholder="123456789" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Ngày vào Đảng CSVN (chính thức)"
                  name="joinPartyDateOficial"
                >
                  <DatePicker
                    format={DATE_DISPLAY_FORMAT}
                    className="date-picker hr-staffs-date-picker"
                  />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Chức vụ Đảng"
                  name="partyPosition"
                >
                  <Input placeholder="Bí thư" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Ngày ra khỏi Đảng"
                  name="leavePartyDate"
                >
                  <DatePicker
                    format={DATE_DISPLAY_FORMAT}
                    className="date-picker hr-staffs-date-picker"
                  />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Ngày sinh kê theo lý lịch Đảng"
                  name="birthDateParty"
                >
                  <DatePicker
                    format={DATE_DISPLAY_FORMAT}
                    className="date-picker hr-staffs-date-picker"
                  />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Chi bộ sinh hoạt Đảng"
                  name="partyCell"
                >
                  <Input placeholder="Chi bộ 1" />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Ngày kết nạp Đảng lần 2"
                  name="joinPartyDate2nd"
                >
                  <DatePicker
                    format={DATE_DISPLAY_FORMAT}
                    className="date-picker hr-staffs-date-picker"
                  />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Ngày tham gia tổ chức CT-XH"
                  name="joinOrganizationDate"
                >
                  <DatePicker
                    format={DATE_DISPLAY_FORMAT}
                    className="date-picker hr-staffs-date-picker"
                  />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Ngày nhập ngũ(nếu có)"
                  name="joinArmyDate"
                >
                  <DatePicker
                    format={DATE_DISPLAY_FORMAT}
                    className="date-picker hr-staffs-date-picker"
                  />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Ngày xuất ngũ(nếu có)"
                  name="leaveArmyDate"
                >
                  <DatePicker
                    format={DATE_DISPLAY_FORMAT}
                    className="date-picker hr-staffs-date-picker"
                  />
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
                  <DatePicker
                    format={DATE_DISPLAY_FORMAT}
                    className="date-picker hr-staffs-date-picker"
                  />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Ngày vào cơ quan hiện đang công tác"
                  name="currentAgencyJoinDate"
                >
                  <DatePicker
                    format={DATE_DISPLAY_FORMAT}
                    className="date-picker hr-staffs-date-picker"
                  />
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
                  <DatePicker
                    format={DATE_DISPLAY_FORMAT}
                    className="date-picker hr-staffs-date-picker"
                  />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Ngày kết thúc làm việc cơ quan (nghỉ hưu)"
                  name="retirementDate"
                >
                  <DatePicker
                    format={DATE_DISPLAY_FORMAT}
                    className="date-picker hr-staffs-date-picker"
                  />
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
                {/* <Form.Item
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
                                </Form.Item> */}
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

          {/* Thông tin chức danh & mức lương section */}
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
                    onClick={() => {
                      setIsPositionSalaryOpen((prev) => !prev);
                    }}
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
                    <DatePicker
                      format={DATE_DISPLAY_FORMAT}
                      className="date-picker hr-staffs-date-picker"
                    />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Thời hạn bổ nhiệm"
                    name="appointmentEndDate"
                  >
                    <DatePicker
                      format={DATE_DISPLAY_FORMAT}
                      className="date-picker hr-staffs-date-picker"
                    />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Ngày được bổ nhiệm lại/phê chuẩn nhiệm kỳ tiếp theo"
                    name="reappointmentDate"
                  >
                    <DatePicker
                      format={DATE_DISPLAY_FORMAT}
                      className="date-picker hr-staffs-date-picker"
                    />
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
                    <DatePicker
                      format={DATE_DISPLAY_FORMAT}
                      className="date-picker hr-staffs-date-picker"
                    />
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
                    <DatePicker
                      format={DATE_DISPLAY_FORMAT}
                      className="date-picker hr-staffs-date-picker"
                    />
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

          {/* Thông tin giáo dục section */}
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
                    onClick={() => {
                      setIsEducationOpen((prev) => !prev);
                    }}
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
                    getValueFromEvent={(e) => {
                      if (Array.isArray(e)) {
                        return e;
                      }
                      return e?.fileList;
                    }}
                    valuePropName="fileList"
                  >
                    <Upload
                      beforeUpload={() => false}
                      multiple
                      accept="application/pdf,image/*,.doc,.docx,.xls,.xlsx"
                    >
                      <Button icon={<PlusOutlined />}>Import file</Button>
                    </Upload>
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
                    <DatePicker
                      format={DATE_DISPLAY_FORMAT}
                      className="date-picker hr-staffs-date-picker"
                    />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Ngày kết thúc"
                    name="educationEndDate"
                  >
                    <DatePicker
                      format={DATE_DISPLAY_FORMAT}
                      className="date-picker hr-staffs-date-picker"
                    />
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
                    <DatePicker
                      format={DATE_DISPLAY_FORMAT}
                      className="date-picker hr-staffs-date-picker"
                    />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Ngày kết thúc"
                    name="managementTrainingEndDate"
                  >
                    <DatePicker
                      format={DATE_DISPLAY_FORMAT}
                      className="date-picker hr-staffs-date-picker"
                    />
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
                    getValueFromEvent={(e) => {
                      if (Array.isArray(e)) {
                        return e;
                      }
                      return e?.fileList;
                    }}
                    valuePropName="fileList"
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
                    getValueFromEvent={normFile}
                    valuePropName="fileList"
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
                    getValueFromEvent={normFile}
                    valuePropName="fileList"
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
                Cập Nhật Nhân Viên
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default UpdateStaff;
