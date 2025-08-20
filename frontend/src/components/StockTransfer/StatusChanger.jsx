import { Form, Modal, Select } from "antd";

import {
  loadSingleStockTransfer,
  updateTransferStatus,
} from "@/redux/rtk/features/stockTransfer/stockTransferSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BtnLoader from "../Loader/BtnLoader";

const StatusChanger = ({ stockTransferId, initialStatus }) => {
  const { Option } = Select;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(false);
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = async (value) => {
    setLoading(true);
    const resp = await dispatch(
      updateTransferStatus({
        stockTransferId,
        transferStatus: value,
      })
    );

    if (resp.payload.message === "success") {
      dispatch(loadSingleStockTransfer(stockTransferId));
      setIsModalOpen(false);
    }
    setLoading(false);
  };

  return (
    <>
      <div onClick={showModal}>Status</div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Form layout='vertical'>
          <h1 className='text-lg text-center font-semibold text-gray-600'>
            {" "}
            Order ID : {stockTransferId}{" "}
          </h1>
          <Form.Item
            label='Update Status'
            initialValue={initialStatus}
            name={"status"}
          >
            <Select
              placeholder='Select Status'
              style={{ width: "100%" }}
              onChange={handleChange}
            >
              <Option value='ACCEPTED'>Accept</Option>
              <Option value='PENDING'>Pending</Option>
              <Option value='CANCELLED'>Cancel</Option>
            </Select>
          </Form.Item>
        </Form>
        <Form.Item>{loading && <BtnLoader />}</Form.Item>
      </Modal>
    </>
  );
};
export default StatusChanger;
