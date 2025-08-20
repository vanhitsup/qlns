import { PlusOutlined } from "@ant-design/icons";
import { Drawer, Layout } from "antd";
import { useState } from "react";

const BigDrawer = ({ children, btnTitle, title, className, width }) => {
  const { Content } = Layout;
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <button
        className={`mx-1 flex justify-center items-center bg-[#2890FF] hover:bg-[#79b1ed] rounded p-1 gap-1 text-white ${
          className ? className : ""
        }`}
        type='button'
        onClick={showDrawer}
      >
        <PlusOutlined className='text-[10px] flex items-center' />
        {btnTitle}
      </button>
      <Drawer
        title={`Create ${title}`}
        width={window.innerWidth <= 768 ? "100%" : width ? `${width}%` : "40%"}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <Content>{children}</Content>
      </Drawer>
    </>
  );
};
export default BigDrawer;
