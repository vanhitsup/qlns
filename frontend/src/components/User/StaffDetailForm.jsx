import {
  Col,
  DatePicker,
  Input,
  Row,
  Select,
  Radio,
  Upload,
  Button,
  Tooltip,
} from "antd";
import { PlusOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { getDistricts, getProvinces, getWards } from "@/api/provinces";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loadAllDepartment } from "../../redux/rtk/features/hrm/department/departmentSlice";
import { loadAllDesignation } from "../../redux/rtk/features/hrm/designation/designationSlice";
import { loadAllEmployeeStatus } from "../../redux/rtk/features/hrm/employeeStatus/employeeStatusSlice";
import { loadAllRole } from "../../redux/rtk/features/hr/role/roleSlice";
import { loadAllShift } from "../../redux/rtk/features/hrm/shift/shiftSlice";
import { useDispatch } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dayjs from "dayjs";

const StaffDetailForm = ({ user }) => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.role);
  const { list: department } = useSelector((state) => state.department);

  const { list: designation } = useSelector((state) => state.designations);
  const { list: employmentStatus } = useSelector(
    (state) => state.employmentStatus
  );
  const { list: shift } = useSelector((state) => state.shift);

  // Định dạng hiển thị trên UI (dd-mm-yy)
  const DATE_DISPLAY_FORMAT = "DD-MM-YYYY";

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const [provinces, setProvinces] = useState([]);

  // Separate states for birth address
  const [birthDistricts, setBirthDistricts] = useState([]);
  const [birthWards, setBirthWards] = useState([]);

  // Separate states for hometown address
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

    getProvinces().then(setProvinces);
  }, [dispatch]);

  // Load address data when user data is available
  useEffect(() => {
    // Helper to coerce codes to strings and pad to an expected length
    const padCode = (val, len) => {
      if (val === null || val === undefined) return "";
      const s = String(val).trim();
      if (!/^[0-9]+$/.test(s)) return s; // non-numeric, return as-is
      return len ? s.padStart(len, "0") : s;
    };

    // Provinces typically have 2-digit codes; districts 3-digit
    const birthProvinceCode = padCode(user?.staffResume?.birthProvince, 2);
    const birthDistrictCode = padCode(user?.staffResume?.birthDistrict, 3);
    const hometownProvinceCode = padCode(
      user?.staffResume?.hometownProvince,
      2
    );
    const hometownDistrictCode = padCode(
      user?.staffResume?.hometownDistrict,
      3
    );

    if (birthProvinceCode) {
      getDistricts(birthProvinceCode).then(setBirthDistricts);
    }
    if (birthDistrictCode) {
      getWards(birthDistrictCode).then(setBirthWards);
    }
    if (hometownProvinceCode) {
      getDistricts(hometownProvinceCode).then(setHometownDistricts);
    }
    if (hometownDistrictCode) {
      getWards(hometownDistrictCode).then(setHometownWards);
    }
  }, [user]);

  // Helper function to format date for display
  const formatDate = (dateString) => {
    if (!dateString) return null;
    return dayjs(dateString);
  };

  // Helper function to get display value
  const getDisplayValue = (value, defaultValue = "") => {
    return value || defaultValue;
  };

  // Helper function to get select option label
  const getSelectLabel = (list, value, key = "name") => {
    if (!list || !value) return "";
    const item = list.find((item) => item.id === value);
    return item ? item[key] : "";
  };

  // Helper function to get province/district/ward name with robust code matching
  const getAddressName = (list, code) => {
    if (!list || !code) return "";
    const inferLen = () => {
      const sample = list.find(
        (i) => i && i.code !== undefined && i.code !== null
      );
      return sample ? String(sample.code).length : undefined;
    };
    const len = inferLen();
    const norm = (v) => {
      const s = String(v).trim();
      if (!/^[0-9]+$/.test(s)) return s;
      return len ? s.padStart(len, "0") : s;
    };
    const target = norm(code);
    const item = list.find((it) => norm(it.code) === target);
    return item ? item.name : "";
  };

  const QuillDisplay = ({ content }) => {
    if (!content)
      return (
        <div className="border border-gray-200 rounded p-3 bg-gray-50 min-h-[100px]"></div>
      );
    return (
      <div
        className="ql-editor border border-gray-200 rounded p-3 bg-gray-50"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  };

  const DateDisplay = ({ dateString, format = DATE_DISPLAY_FORMAT }) => {
    if (!dateString) {
      return (
        <Input
          value=""
          readOnly
          className="bg-gray-50"
          style={{ width: "100%" }}
          placeholder=""
        />
      );
    }
    return (
      <DatePicker
        value={formatDate(dateString)}
        format={format}
        readOnly
        className="bg-gray-50"
        style={{ width: "100%" }}
      />
    );
  };

  const ImageDisplay = ({ imageUrl, alt = "Image" }) => {
    if (!imageUrl) {
      return (
        <div className="text-center py-4 border border-gray-200 rounded bg-gray-50 min-h-[120px] flex items-center justify-center">
          <div className="text-gray-400 text-sm">Ảnh chưa được tải lên</div>
        </div>
      );
    }

    // Xử lý URL ảnh - có thể là string hoặc object
    let finalImageUrl = imageUrl;
    if (typeof imageUrl === "object" && imageUrl.url) {
      finalImageUrl = imageUrl.url;
    } else if (typeof imageUrl === "object" && imageUrl.path) {
      finalImageUrl = imageUrl.path;
    }

    // Thêm base URL nếu cần
    if (finalImageUrl && !finalImageUrl.startsWith("http")) {
      finalImageUrl = `${
        import.meta.env.VITE_APP_API || "http://localhost:8000"
      }/storage/${finalImageUrl}`;
    }

    return (
      <div className="text-center">
        <img
          src={finalImageUrl}
          alt={alt}
          className="max-w-full h-auto max-h-48 border border-gray-200 rounded"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "block";
          }}
        />
        <div
          style={{ display: "none" }}
          className="text-center py-4 border border-gray-200 rounded bg-gray-50"
        >
          <p className="text-gray-500">Không thể tải ảnh</p>
        </div>
      </div>
    );
  };

  const FileDisplay = ({ files, label = "File" }) => {
    if (!files || files.length === 0) {
      return (
        <div className="text-center py-4 border border-gray-200 rounded bg-gray-50 min-h-[80px] flex items-center justify-center">
          <div className="text-gray-400 text-sm">Chưa có file đính kèm</div>
        </div>
      );
    }

    // Xử lý files - có thể là array hoặc single file
    const fileList = Array.isArray(files) ? files : [files];

    return (
      <div className="space-y-2">
        {fileList.map((file, index) => {
          // Xử lý URL file
          let fileUrl = file;
          let fileName = `File ${index + 1}`;

          if (typeof file === "object") {
            fileUrl = file.url || file.path || file;
            fileName = file.name || file.original_name || `File ${index + 1}`;
          }

          // Thêm base URL nếu cần
          if (fileUrl && !fileUrl.startsWith("http")) {
            fileUrl = `${
              import.meta.env.VITE_APP_API || "http://localhost:8000"
            }/storage/${fileUrl}`;
          }

          return (
            <div
              key={index}
              className="flex items-center justify-between p-2 border border-gray-200 rounded bg-gray-50"
            >
              <span className="text-sm text-gray-700 truncate flex-1 mr-2">
                {fileName}
              </span>
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 text-sm whitespace-nowrap"
              >
                Xem
              </a>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="mr-top mt-5 p-5 ant-card" style={{ maxWidth: "100%" }}>
      <div>
        <h1 className="font-bold text-xl flex justify-center mb-5">
          THÔNG TIN CHI TIẾT NHÂN VIÊN
        </h1>
      </div>

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
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Họ và tên:</label>
            <Input
              value={getDisplayValue(user?.fullName)}
              readOnly
              className="bg-gray-50"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              Tên đăng nhập:
            </label>
            <Input
              value={getDisplayValue(user?.username)}
              readOnly
              className="bg-gray-50"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Số CCCD:</label>
            <Input
              value={getDisplayValue(user?.nationalId)}
              readOnly
              className="bg-gray-50"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Email:</label>
            <Input
              value={getDisplayValue(user?.email)}
              readOnly
              className="bg-gray-50"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              Số điện thoại:
            </label>
            <Input
              value={getDisplayValue(user?.phone)}
              readOnly
              className="bg-gray-50"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              Phân quyền:
            </label>
            <Input
              value={getSelectLabel(list, user?.roleId)}
              readOnly
              className="bg-gray-50"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Phòng ban:</label>
            <Input
              value={getSelectLabel(department, user?.departmentId)}
              readOnly
              className="bg-gray-50"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Ghi chú:</label>
            <Input.TextArea
              value={getDisplayValue(user?.note)}
              readOnly
              className="bg-gray-50"
              rows={3}
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              Ảnh chân dung:
            </label>
            <ImageDisplay imageUrl={user?.profileImage} alt="Ảnh chân dung" />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              Ảnh căn cước công dân 2 mặt:
            </label>
            <FileDisplay files={user?.nationalIdImage} label="Ảnh căn cước" />
          </div>
        </Col>
      </Row>

      {/* Sơ yếu lý lịch */}
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
          />
        </Tooltip>
      </div>

      {isResumeOpen && user?.staffResume && (
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
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Họ và tên khai sinh:
              </label>
              <Input
                value={getDisplayValue(user.staffResume.fullNameBirth)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Giới tính:
              </label>
              <Input
                value={getDisplayValue(user.staffResume.gender)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Các tên gọi khác:
              </label>
              <Input
                value={getDisplayValue(user.staffResume.otherNames)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngày sinh:
              </label>
              <DateDisplay dateString={user?.staffResume?.birthDate} />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Nơi sinh:
              </label>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                <Input
                  value={getAddressName(
                    provinces,
                    user.staffResume.birthProvince
                  )}
                  readOnly
                  className="bg-gray-50 flex-1"
                  placeholder="Tỉnh/TP"
                />
                <Input
                  value={getAddressName(
                    birthDistricts,
                    user.staffResume.birthDistrict
                  )}
                  readOnly
                  className="bg-gray-50 flex-1"
                  placeholder="Quận/Huyện"
                />
                <Input
                  value={getAddressName(birthWards, user.staffResume.birthWard)}
                  readOnly
                  className="bg-gray-50 flex-1"
                  placeholder="Xã/Phường"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Quê quán:
              </label>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                <Input
                  value={getAddressName(
                    provinces,
                    user.staffResume.hometownProvince
                  )}
                  readOnly
                  className="bg-gray-50 flex-1"
                  placeholder="Tỉnh/TP"
                />
                <Input
                  value={getAddressName(
                    hometownDistricts,
                    user.staffResume.hometownDistrict
                  )}
                  readOnly
                  className="bg-gray-50 flex-1"
                  placeholder="Quận/Huyện"
                />
                <Input
                  value={getAddressName(
                    hometownWards,
                    user.staffResume.hometownWard
                  )}
                  readOnly
                  className="bg-gray-50 flex-1"
                  placeholder="Xã/Phường"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Địa chỉ thường trú:
              </label>
              <Input
                value={getDisplayValue(user.staffResume.permanentAddress)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Quốc tịch:
              </label>
              <Input
                value={getDisplayValue(user.staffResume.nationality)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Dân tộc:</label>
              <Input
                value={getDisplayValue(user.staffResume.ethnicity)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Tôn giáo:
              </label>
              <Input
                value={getDisplayValue(user.staffResume.religion)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Số CCCD:</label>
              <Input
                value={getDisplayValue(user.staffResume.personalId)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngày cấp:
              </label>
              <DateDisplay dateString={user?.staffResume?.issueDate} />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Nơi cấp:</label>
              <Input
                value={getDisplayValue(user.staffResume.issuePlace)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Số TK ngân hàng:
              </label>
              <Input
                value={getDisplayValue(user.staffResume.bankAccountNumber)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngân hàng:
              </label>
              <Input
                value={getDisplayValue(user.staffResume.bankName)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Giấy khám sức khỏe:
              </label>
              <FileDisplay
                files={user?.staffResume?.healthCertificate}
                label="Giấy khám sức khỏe"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Hồ sơ lý lịch:
              </label>
              <FileDisplay
                files={user?.staffResume?.resume}
                label="Hồ sơ lý lịch"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Chiều cao (cm):
              </label>
              <Input
                value={getDisplayValue(user.staffResume.height)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Cân nặng (kg):
              </label>
              <Input
                value={getDisplayValue(user.staffResume.weight)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngày vào Đảng CSVN:
              </label>
              <DateDisplay dateString={user?.staffResume?.joinPartyDate} />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Số thẻ Đảng viên:
              </label>
              <Input
                value={getDisplayValue(user.staffResume.partyCardNumber)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngày vào Đảng CSVN (chính thức):
              </label>
              <DateDisplay
                dateString={user?.staffResume?.joinPartyDateOficial}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Chức vụ Đảng:
              </label>
              <Input
                value={getDisplayValue(user?.staffResume?.partyPosition)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngày ra khỏi Đảng:
              </label>
              <DateDisplay dateString={user?.staffResume?.leavePartyDate} />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngày sinh kê theo lý lịch Đảng:
              </label>
              <DateDisplay dateString={user?.staffResume?.birthDateParty} />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Chi bộ sinh hoạt Đảng:
              </label>
              <Input
                value={getDisplayValue(user?.staffResume?.partyCell)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngày kết nạp Đảng lần 2:
              </label>
              <DateDisplay dateString={user?.staffResume?.joinPartyDate2nd} />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngày tham gia tổ chức CT-XH:
              </label>
              <DateDisplay
                dateString={user?.staffResume?.joinOrganizationDate}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngày nhập ngũ (nếu có):
              </label>
              <DateDisplay dateString={user?.staffResume?.joinArmyDate} />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngày xuất ngũ (nếu có):
              </label>
              <DateDisplay dateString={user?.staffResume?.leaveArmyDate} />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Quân hàm cao nhất (nếu có):
              </label>
              <Input
                value={getDisplayValue(user?.staffResume?.highestRank)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Đối tượng chính sách (nếu có):
              </label>
              <Input
                value={getDisplayValue(user?.staffResume?.policyObject)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Trình độ giáo dục phổ thông:
              </label>
              <Input
                value={getDisplayValue(
                  user?.staffResume?.educationLevelGeneral
                )}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Quá trình công tác:
              </label>
              <QuillDisplay content={user.staffResume.workHistory} />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Đơn vị công tác (Đảng, chính quyền, đoàn thể, tổ chức):
              </label>
              <Input
                value={getDisplayValue(user?.staffResume?.workUnit)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Chức danh/chức vụ:
              </label>
              <Input
                value={getDisplayValue(user?.staffResume?.positionTitle)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            {/* keep positionTitle then recruitment dates before other job status fields */}

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngày được tuyển dụng lần đầu:
              </label>
              <DateDisplay
                dateString={user?.staffResume?.firstRecruitmentDate}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngày vào cơ quan hiện đang công tác:
              </label>
              <DateDisplay
                dateString={user?.staffResume?.currentAgencyJoinDate}
              />
            </div>

            {/* Will move workStartDate and employmentType lower */}

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Khai rõ: bị bắt, bị tù:
              </label>
              <QuillDisplay content={user?.staffResume?.arrestHistory} />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Tham gia hoặc có quan hệ với các tổ chức chính trị, kinh tế, xã
                hội...:
              </label>
              <QuillDisplay
                content={user?.staffResume?.organizationRelations}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Mối quan hệ gia đình:
              </label>
              <QuillDisplay content={user.staffResume.familyRelations} />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Hoàn cảnh kinh tế gia đình:
              </label>
              <QuillDisplay content={user.staffResume.familyEconomy} />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngày nghỉ phép:
              </label>
              <DateDisplay dateString={user?.staffResume?.leaveDate} />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngày kết thúc làm việc cơ quan (nghỉ hưu):
              </label>
              <DateDisplay dateString={user?.staffResume?.retirementDate} />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Mã số nhân viên:
              </label>
              <Input
                value={getDisplayValue(user?.staffResume?.staffCode)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            {/* Move blood group near the end */}
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Nhóm máu:
              </label>
              <Input
                value={getDisplayValue(user.staffResume.bloodGroup)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            {/* Finally append currentPosition, currentRank, contractType, workStartDate, employmentType */}
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Chức vụ hiện tại:
              </label>
              <Input
                value={getDisplayValue(user?.staffResume?.currentPosition)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngạch/chức danh hiện tại:
              </label>
              <Input
                value={getDisplayValue(user?.staffResume?.currentRank)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Loại hợp đồng (nếu có):
              </label>
              <Input
                value={getDisplayValue(user?.staffResume?.contractType)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngày vào làm việc:
              </label>
              <DateDisplay dateString={user?.staffResume?.workStartDate} />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Loại hình:
              </label>
              <Input
                value={getDisplayValue(user?.staffResume?.employmentType)}
                readOnly
                className="bg-gray-50"
              />
            </div>
          </Col>
        </Row>
      )}

      {/* Thông tin về chức danh & mức lương */}
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
            icon={isPositionSalaryOpen ? <UpOutlined /> : <DownOutlined />}
            onClick={() => setIsPositionSalaryOpen((prev) => !prev)}
          />
        </Tooltip>
      </div>

      {isPositionSalaryOpen && (
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
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngạch/chức danh:
              </label>
              <Input
                value={getDisplayValue(
                  user?.staffPositionSalary?.positionTitle
                )}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Mã số:</label>
              <Input
                value={getDisplayValue(user?.staffPositionSalary?.positionCode)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngày được bổ nhiệm:
              </label>
              <DateDisplay
                dateString={user?.staffPositionSalary?.appointmentStartDate}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Thời hạn bổ nhiệm:
              </label>
              <DateDisplay
                dateString={user?.staffPositionSalary?.appointmentEndDate}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Lương vị trí:
              </label>
              <Input
                value={getDisplayValue(
                  user?.staffPositionSalary?.positionSalary
                )}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Bậc lương:
              </label>
              <Input
                value={getDisplayValue(user?.staffPositionSalary?.salaryLevel)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Hệ số lương:
              </label>
              <Input
                value={getDisplayValue(
                  user?.staffPositionSalary?.salaryCoefficient
                )}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngày hưởng lương:
              </label>
              <DateDisplay
                dateString={user?.staffPositionSalary?.salaryStartDate}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngày được bổ nhiệm lại/phê chuẩn nhiệm kỳ tiếp theo:
              </label>
              <DateDisplay
                dateString={user?.staffPositionSalary?.reappointmentDate}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Được quy hoạnh chức danh:
              </label>
              <Input
                value={getDisplayValue(
                  user?.staffPositionSalary?.positionAllocation
                )}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Chức vụ, chức vụ kiêm nhiệm:
              </label>
              <Input
                value={getDisplayValue(
                  user?.staffPositionSalary?.concurrentPosition
                )}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Chức vụ Đảng hiện tại:
              </label>
              <Input
                value={getDisplayValue(
                  user?.staffPositionSalary?.currentPartyPosition
                )}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Chức vụ Đảng kiêm nhiệm:
              </label>
              <Input
                value={getDisplayValue(
                  user?.staffPositionSalary?.alternatePartyPosition
                )}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Vị trí công tác:
              </label>
              <Input
                value={getDisplayValue(user?.staffPositionSalary?.workPosition)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Công việc chính được giao:
              </label>
              <Input
                value={getDisplayValue(
                  user?.staffPositionSalary?.mainAssignedJob
                )}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Sở trường công tác:
              </label>
              <Input
                value={getDisplayValue(
                  user?.staffPositionSalary?.specializedField
                )}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Công việc làm lâu nhất:
              </label>
              <Input
                value={getDisplayValue(user?.staffPositionSalary?.longestJob)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Phần trăm hưởng (%):
              </label>
              <Input
                value={getDisplayValue(
                  user?.staffPositionSalary?.salaryPercentage
                )}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Phụ cấp thâm niên vượt khung(%):
              </label>
              <Input
                value={getDisplayValue(
                  user?.staffPositionSalary?.seniorityAllowance
                )}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngày hưởng PCTNVK:
              </label>
              <DateDisplay dateString={user?.staffPositionSalary?.pctnvkDate} />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Phụ cấp chức vụ:
              </label>
              <Input
                value={getDisplayValue(
                  user?.staffPositionSalary?.positionAllowance
                )}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Phụ cấp kiêm nhiệm:
              </label>
              <Input
                value={getDisplayValue(
                  user?.staffPositionSalary?.additionalAllowance
                )}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Phụ cấp khác:
              </label>
              <Input
                value={getDisplayValue(
                  user?.staffPositionSalary?.otherAllowance
                )}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Vị trí việc làm:
              </label>
              <Input
                value={getDisplayValue(user?.staffPositionSalary?.jobPosition)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Mã số:</label>
              <Input
                value={getDisplayValue(user?.staffPositionSalary?.jobCode)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Lương theo mức tiền (VNĐ):
              </label>
              <Input
                value={getDisplayValue(user?.staffPositionSalary?.salaryAmount)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ghi chú về mức lương:
              </label>
              <Input
                value={getDisplayValue(
                  user?.staffPositionSalary?.salaryComment
                )}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Thu nhập tăng thêm:
              </label>
              <Input
                value={getDisplayValue(
                  user?.staffPositionSalary?.additionalIncome
                )}
                readOnly
                className="bg-gray-50"
              />
            </div>
          </Col>
        </Row>
      )}

      {/* Thông tin giáo dục */}
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
          />
        </Tooltip>
      </div>

      {isEducationOpen && (
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
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Học hàm:</label>
              <Input
                value={getDisplayValue(user?.staffEducation?.academicTitle)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Bằng tốt nghiệp:
              </label>
              <Input
                value={getDisplayValue(user?.staffEducation?.degree)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Cơ quan, tổ chức cấp:
              </label>
              <Input
                value={getDisplayValue(
                  user?.staffEducation?.issuingOrganization
                )}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Trình độ học vấn:
              </label>
              <Input
                value={getDisplayValue(user?.staffEducation?.educationLevel)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Lí luận chính trị:
              </label>
              <Input
                value={getDisplayValue(user?.staffEducation?.politicalTheory)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Chuyên môn:
              </label>
              <Input
                value={getDisplayValue(user?.staffEducation?.specialized)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Tên cơ sở đào tạo:
              </label>
              <Input
                value={getDisplayValue(
                  user?.staffEducation?.trainingInstitution
                )}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Chuyên ngành đào tạo:
              </label>
              <Input
                value={getDisplayValue(
                  user?.staffEducation?.trainingSpecialization
                )}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngày bắt đầu:
              </label>
              <DateDisplay
                dateString={user?.staffEducation?.educationStartDate}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngày kết thúc:
              </label>
              <DateDisplay
                dateString={user?.staffEducation?.educationEndDate}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Hình thức đào tạo:
              </label>
              <Input
                value={getDisplayValue(user?.staffEducation?.trainingForm)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Văn bằng trình độ:
              </label>
              <Input
                value={getDisplayValue(user?.staffEducation?.educationDegree)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Bồi dưỡng quản lý nhà nước/chức danh nghề nghiệp/nghiệp vụ
                chuyên ngành:
              </label>
              <Input
                value={getDisplayValue(user?.staffEducation?.trainingContent)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Tên cơ sở đào tạo (Quản lý):
              </label>
              <Input
                value={getDisplayValue(
                  user?.staffEducation?.managementTrainingInstitution
                )}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngày bắt đầu (Quản lý):
              </label>
              <DateDisplay
                dateString={user?.staffEducation?.managementTrainingStartDate}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngày kết thúc (Quản lý):
              </label>
              <DateDisplay
                dateString={user?.staffEducation?.managementTrainingEndDate}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Bồi dưỡng kiến thức an ninh, quốc phòng:
              </label>
              <Input
                value={getDisplayValue(
                  user?.staffEducation?.securityDefenseTraining
                )}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Tên cơ sở đào tạo (An ninh):
              </label>
              <Input
                value={getDisplayValue(
                  user?.staffEducation?.securityDefenseInstitution
                )}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngày bắt đầu (An ninh):
              </label>
              <DateDisplay
                dateString={user?.staffEducation?.securityDefenseStartDate}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngày kết thúc (An ninh):
              </label>
              <DateDisplay
                dateString={user?.staffEducation?.securityDefenseEndDate}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Tin học:</label>
              <Input
                value={getDisplayValue(user?.staffEducation?.itSkills)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Tên cơ sở đào tạo (Tin học):
              </label>
              <Input
                value={getDisplayValue(
                  user?.staffEducation?.itTrainingInstitution
                )}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngày bắt đầu (Tin học):
              </label>
              <DateDisplay
                dateString={user?.staffEducation?.itTrainingStartDate}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngày kết thúc (Tin học):
              </label>
              <DateDisplay
                dateString={user?.staffEducation?.itTrainingEndDate}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngoại ngữ:
              </label>
              <Input
                value={getDisplayValue(user?.staffEducation?.foreignLanguage)}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Tên cơ sở đào tạo (Ngoại ngữ):
              </label>
              <Input
                value={getDisplayValue(
                  user?.staffEducation?.languageTrainingInstitution
                )}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngày bắt đầu (Ngoại ngữ):
              </label>
              <DateDisplay
                dateString={user?.staffEducation?.languageTrainingStartDate}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ngày kết thúc (Ngoại ngữ):
              </label>
              <DateDisplay
                dateString={user?.staffEducation?.languageTrainingEndDate}
              />
            </div>

            {/* Move attached file higher to match AddStaff ordering */}
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Hồ sơ đính kèm (import):
              </label>
              <FileDisplay
                files={user?.staffEducation?.attachedFile}
                label="Hồ sơ đính kèm"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Bằng/chứng chỉ an ninh quốc phòng:
              </label>
              <FileDisplay
                files={user?.staffEducation?.securityDefenseCertificate}
                label="Bằng/chứng chỉ an ninh"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Bằng/chứng chỉ tin học:
              </label>
              <FileDisplay
                files={user?.staffEducation?.itCertificate}
                label="Bằng/chứng chỉ tin học"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Bằng/chứng chỉ ngoại ngữ:
              </label>
              <FileDisplay
                files={user?.staffEducation?.languageCertificate}
                label="Bằng/chứng chỉ ngoại ngữ"
              />
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default StaffDetailForm;
