import { Drawer } from "antd";
import { useDispatch } from "react-redux";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";

export default function UpdateDrawer({ title, width, permission, children, open, setClose }) {
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(setClose());
  };

  return (
    <>
      <UserPrivateComponent permission={permission}>
        <Drawer
          width={
            window.innerWidth <= 768 ? "100%" : width ? `${width}%` : "45%"
          }
          title={`${title}`}
          placement='right'
          onClose={onClose}
          open={open}
        >
          <div className='px-5 pt-5'> {children}</div>
        </Drawer>
      </UserPrivateComponent>
    </>
  );
}
