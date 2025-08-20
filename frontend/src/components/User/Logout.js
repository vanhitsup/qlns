import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "@/redux/rtk/features/hrm/user/userSlice";

function Logout(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logOut());
  }, [dispatch]);
}
export default Logout;
