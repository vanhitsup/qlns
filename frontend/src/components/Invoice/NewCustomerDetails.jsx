
import Button from "@/UI/Button";
import { getSetting } from "@/redux/rtk/features/setting/settingSlice";
import invoiceGenerator from "@/utils/invoiceGenerator";
import useCurrency from "@/utils/useCurrency";
import "jspdf-autotable";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function NewCustomerDetails({ data, title }) {
  const { currencyName } = useCurrency() || {};
  const companyInfo = useSelector((state) => state?.setting?.data) || null;
  const dispatch = useDispatch();

  const bottomLeftContent = [
   
  ];
  const bottomRightContent = [
    {
      label: "Total Amount",
      value: ` ${data.totalAmount.toFixed(2)}`,
    },
    {
      label: "Paid Amount",
      value: ` ${data.totalPaidAmount.toFixed(2)}`,
    },
   
     {
      label: "Return Amount",
      value: `${data.totalReturnAmount.toFixed(2)
      }`,
    },
     {
      label: "Due Amount",
      value: `${data.dueAmount.toFixed(2)
      }`,
    },
    
  ];

  const tableHead = ["SL", "Invoice", "Date", "Amount", "Paid","Due","Profit" ,"Sale Person"];

  const tableBody = data?.saleInvoice?.map(
    (item, index) => [
      index + 1,
      item.id,
      moment(item.date).format('ll'),
      item.totalAmount,
      item.paidAmount,
      item.dueAmount,
      item.profit,
      `${item.user.firstName} ${item.user.lastName}`
    ]
  );
  const customerInfo = [
    {
      value: `Customer: ${data?.username ? data.username : "N/A"}`,
    },
    {
      value: `Phone: ${data?.phone ? data.phone : "N/A"}`,
    },
    {
      value: `Email: ${data?.email ? data.email : "N/A"}`,
    },
   
  ];
  const TopRightInfo = [
   
    {
      value: `Address: ${data?.address ? data.address : "N/A"}`,
    },
   
  ];
  const settings = {
    jsPDF: {
      // orientation: "landscape"
    },
    tableFontSize: 10,
    infoTopFontSize: 10,
    bottomRightFontSize: 10,
    bottomLeftFontSize: 8,
    footerFontSize: 10,
  };
  useEffect(() => {
    !companyInfo && dispatch(getSetting());
  }, [dispatch, companyInfo]);

  return (
    <div className=''>
      <Button
        color='primary'
        onClick={() =>
          invoiceGenerator("print", {
            title,
            TopRightInfo,
            customerInfo,
            companyInfo,
            bottomLeftContent,
            bottomRightContent,
            tableBody,
            tableHead,
            settings,
            leftBottomSecondColumnX: 55,
          })
        }
      >
        Print
      </Button>
    </div>
  );
}

