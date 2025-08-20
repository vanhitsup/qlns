import { SolutionOutlined } from "@ant-design/icons";
import { Card, Typography } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

import moment from "moment";
import {
  clearTransaction,
  loadTransaction,
} from "../../redux/rtk/features/transaction/transactionSlice";

//PopUp

const DetailTransaction = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  //dispatch
  const dispatch = useDispatch();
  const payment = useSelector((state) => state.transactions.transaction);

  //Delete Supplier
  const onDelete = () => {
    try {
      // dispatch(deleteSupplierPayment(id));

      setVisible(false);
      return navigate("/admin/payment");
    } catch (error) {}
  };
  // Delete Supplier PopUp
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  useEffect(() => {
    dispatch(loadTransaction(id));
    return () => {
      dispatch(clearTransaction());
    };
  }, [id, dispatch]);

  return (
    <div>
      <div className='my-[40px]'>
        {payment ? (
          <Fragment key={payment.id}>
            <Card bordered={false} className='card-custom'>
              <div
                className='card-header d-flex justify-content-between mb-2'
                style={{ padding: 0 }}
              >
                <h5>
                  <SolutionOutlined />
                  <span className='ml-[20px]'>
                    ID : {payment.id} | {payment.date}
                  </span>
                </h5>
              </div>
              <div>
                <p>
                  <Typography.Text className='font-semibold'>
                    Date :
                  </Typography.Text>{" "}
                  {moment(payment.date).format("YYYY-MM-DD")}
                </p>

                <p>
                  <Typography.Text strong>Amount :</Typography.Text>{" "}
                  {payment.amount}
                </p>

                <p>
                  <Typography.Text strong>Particulars :</Typography.Text>{" "}
                  {payment.particulars}
                </p>
                <p>
                  <Typography.Text strong>Type :</Typography.Text>{" "}
                  {payment.type}
                </p>
              </div>
            </Card>
          </Fragment>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default DetailTransaction;
