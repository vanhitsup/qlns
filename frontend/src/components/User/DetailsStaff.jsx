import { Link, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUser,
  loadSingleStaff,
} from "../../redux/rtk/features/hrm/user/userSlice";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import BtnEditSvg from "../UI/Button/btnEditSvg";
import StaffDetailForm from "./StaffDetailForm";

const DetailStaff = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(loadSingleStaff(id));
    return () => {
      dispatch(clearUser());
    };
  }, [dispatch, id]);

  return (
    <div>
      {loading ? (
        <div className="mt-10">
          <Loader />
        </div>
      ) : user ? (
        <div>
          {/* Header với thông tin cơ bản và nút Edit */}
          <section>
            <div className="flex justify-between ant-card rounded h-auto mb-5">
              <div className="flex justify-start">
                <div className="flex justify-center py-8 px-4 mt-4 ml-4">
                  <div className="flex flex-col items-around">
                    <h4 className="text-2xl txt-color-2 mb-1">
                      Thông tin chi tiết nhân viên: <span className="font-bold">{user.fullName}</span>
                    </h4>
                    
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-start py-8 px-4">
                <UserPrivateComponent permission="update-user">
                  <button className="mr-2 mt-2">
                    <Link to={`/admin/staff/${id}/update`}>
                      <BtnEditSvg size={30} />
                    </Link>
                  </button>
                </UserPrivateComponent>
              </div>
            </div>
          </section>

          {/* Form chi tiết nhân viên */}
          <StaffDetailForm user={user} />
        </div>
      ) : (
        <div className="mt-10 text-center">
          <p className="text-lg text-gray-600">Không tìm thấy thông tin nhân viên</p>
          <p className="text-sm text-gray-500">ID: {id}</p>
        </div>
      )}
    </div>
  );
};

export default DetailStaff;
