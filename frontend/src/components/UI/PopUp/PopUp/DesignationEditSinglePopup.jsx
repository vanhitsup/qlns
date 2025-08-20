import { Modal } from "antd";
import { useState } from "react";
import BtnEditSvg from "../../Button/btnEditSvg";
import DesignationAddSinglePopup from "./DesignationAddSinglePopup";

const DesignationEditSinglePopup = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  

  return (
    <>
      <button onClick={showModal} className='mr-2'>
        <BtnEditSvg size={20} />
      </button>
      <Modal
        title={`Edit Designation ${data?.id}`}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <DesignationAddSinglePopup
          edit={true}
          data={data}
          onCancel={handleCancel}
        />
      </Modal>
    </>
  );
};
export default DesignationEditSinglePopup;
