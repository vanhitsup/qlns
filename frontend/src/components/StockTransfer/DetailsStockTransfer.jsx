/* eslint-disable react-refresh/only-export-components */
import Button from "@/UI/Button";
import Card from "@/UI/Card";
import List from "@/UI/List";
import Menu from "@/UI/Menu";
import Tabs, { Tab } from "@/UI/Tabs";
import {
  clearStockTransfer,
  loadSingleStockTransfer,
} from "@/redux/rtk/features/stockTransfer/stockTransferSlice";
import useStockTransferEmailTemplate from "@/utils/EmailTemplate/useStockTransferEmailTemplate";
import { Popover, Tag } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegPaperPlane } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import StockTransferInvoice from "../Invoice/StockTransferInvoice";
import Loader from "../Loader/Loader";
import ProductList from "./ProductList";
import SendStockTransfer from "./SendStockTransfer";
import StatusChanger from "./StatusChanger";
import TransactionList from "./TransactionList";

export default function DetailsStockTransfer() {
  const { id } = useParams();
  const [sendEmail, setSendEmail] = useState(false);

  const dispatch = useDispatch();
  const { stockTransfer } = useSelector((state) => state?.stockTransfer);
  const { subject, body } = useStockTransferEmailTemplate(stockTransfer);

  const {
    storeFrom,
    storeTo,
    stockCount,
    totalQuantity,
    totalPurchaseAmount,
    allTransaction,
    stockTransferProduct,
    createdAt,
    transferStatus,
    transferBy,
    note,
  } = stockTransfer || {};

  useEffect(() => {
    dispatch(loadSingleStockTransfer(id));
    return () => {
      dispatch(clearStockTransfer());
    };
  }, [id, dispatch]);

  return (
    <>
      {stockTransfer ? (
        <>
          <div className="flex gap-2 md:gap-4">
            <Card className="w-2/3" bodyClass={"p-0"}>
              <div className="flex justify-between mx-2 py-2 border-b items-center">
                <div className="flex gap-3">
                  <div className={"text-end "}>
                    <StockTransferInvoice
                      stockTransfer={stockTransfer}
                      title={"Stock Transfer Invoice"}
                    />
                  </div>
                  <Button
                    className="flex-row-reverse"
                    color="gray"
                    icon={<FaRegPaperPlane size={15} />}
                    onClick={() => setSendEmail(true)}>
                    Send
                  </Button>

                  <Popover
                    content={
                      <Menu
                        items={[
                          {
                            key: "status",
                            label: (
                              <StatusChanger
                                stockTransferId={stockTransfer.id}
                                initialStatus={transferStatus}
                              />
                            ),
                          },
                        ]}
                      />
                    }
                    placement="bottomRight"
                    arrow={false}
                    trigger="click">
                    <Button
                      color={"gray"}
                      icon={<BsThreeDotsVertical size={15} />}
                      className="  px-3"></Button>
                  </Popover>
                </div>
              </div>
              {sendEmail ? (
                <div>
                  <SendStockTransfer
                    body={body}
                    subject={subject}
                    setSendEmail={setSendEmail}
                    email={storeTo?.email}
                    invoice={stockTransfer}
                  />
                </div>
              ) : (
                <Tabs className="mt-4">
                  <Tab label="Products">
                    <ProductList list={stockTransferProduct} />
                  </Tab>
                  <Tab label="Transactions">
                    <TransactionList list={allTransaction} />
                  </Tab>
                </Tabs>
              )}
            </Card>
            <div className="w-1/3 flex flex-col gap-2 md:gap-4">
              <Card
                title={
                  <div className="flex items-center">
                    <span className="font-normal">
                      Invoice No{" "}
                      <span className="font-semibold">#{stockTransfer.id}</span>
                    </span>
                  </div>
                }>
                <>
                  <List
                    labelClassName="w-[40%]"
                    list={[
                      {
                        label: "Invoice Date",
                        value: moment(createdAt).format("ll"),
                      },
                      {
                        label: "Transfer Status",
                        value: (
                          <Tag
                            color={
                              transferStatus === "ACCEPTED"
                                ? "success"
                                : "orange"
                            }>
                            {transferStatus}
                          </Tag>
                        ),
                      },
                      {
                        label: "Transferred By",
                        value: transferBy ? (
                          <Link to={`/admin/staff/${transferBy.userId}`}>
                            {`${transferBy.username}`}
                          </Link>
                        ) : (
                          "N/A"
                        ),
                      },
                    ]}
                  />
                </>
              </Card>
              <Card title="Other Information">
                <List
                  labelClassName="w-[40%]"
                  list={[
                    {
                      label: "From Store",
                      value: storeFrom?.name,
                    },
                    {
                      label: "To Store",
                      value: storeTo?.name,
                    },

                    {
                      label: "Total Quantity",
                      value: totalQuantity,
                    },
                    {
                      label: "Total Unique Stock",
                      value: stockCount,
                    },
                    {
                      label: "Total Transfer Amount",
                      value: totalPurchaseAmount,
                    },
                  ]}
                />
              </Card>

              {note && (
                <Card>
                  <List
                    labelClassName="w-[40%] font-bold"
                    list={[
                      {
                        label: "Note",
                        value: note,
                        className: "flex-col gap-1",
                      },
                    ]}
                  />
                </Card>
              )}
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
