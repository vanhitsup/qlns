import { getSetting } from "@/redux/rtk/features/setting/settingSlice";
import useCurrency from "@/utils/useCurrency";
import "jspdf-autotable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import invoiceGenerator from "@/utils/invoiceGenerator";
import moment from "moment";
import numberToWords from "@/utils/numberToWords";
import { decodeHtmlEntity } from "@/utils/functions";
import { FaFileDownload } from "react-icons/fa";


export default function NewEcomOrderInvoice({ data, orderStatus, title }) {
  const { currencySymbol, currencyName } = useCurrency() || {};
  const companyInfo = useSelector((state) => state?.setting?.data) || null;
  const dispatch = useDispatch();
  const numberInText = numberToWords(
    Math.round((data.singleCartOrder.totalAmount || 0) +( data.singleCartOrder.totalTaxAmount ||0))
  );

  const currencyLocal = decodeHtmlEntity(currencySymbol);

  const bottomLeftContent = [
    {
      label: "IN WORDS: ",
      value: `${numberInText.toUpperCase()} ${currencyName}` || "",
    },
    {
      label: "Terms And Conditions: ",
      value: data.singleCartOrder.termsAndConditions
        ? data.singleCartOrder.termsAndConditions
        : "",
    },
    { label: "Notes: ", value: data.note ? data.note : "" },
  ];

  const bottomRightContent = [
    {
      label: "Total:",
      value: ` ${data.singleCartOrder.totalAmount.toFixed(2)}`,
    },
    {
      label: "Discount:",
      value: ` ${data.singleCartOrder.totalDiscountAmount.toFixed(2)}`,
    },
    data.totalReturnAmount && {
      label: "Return Product Value:",
      value: ` ${data.totalReturnAmount.toFixed(2)}`,
    },
    data.instantPaidReturnAmount && {
      label: "Return Amount:",
      value: ` ${data.instantPaidReturnAmount.toFixed(2)}`,
    },
   
    {
      label: "Total Tax:",
      value: ` ${
        data.singleCartOrder.totalTaxAmount
          ? data.singleCartOrder.totalTaxAmount.toFixed(2)
          : "0.00"
      }`,
    },
    {
      label: "Paid:",
      value: ` ${data.singleCartOrder.paidAmount.toFixed(2)}`,
    },
    {
      label: "Due:",
      value: ` ${data.singleCartOrder.dueAmount.toFixed(2)}`,
    },
  ];
  const tableHead = [
    "SI",
    "Product Name",
    "Quantity",
    "Price",
    "Discount",
    "Amount",
    "Tax"
  ];
  const tableBody = data.singleCartOrder.cartOrderProduct.map((item, index) => [
    index + 1,
    item.product.name,
    item.productQuantity,
    `${item.productUnitSalePrice}`,
    `${item.productDiscount}`,
    `${
      item.productUnitSalePrice * item.productQuantity - item.productDiscount
    }`,
    `${item.taxAmount}`,
  ]);

  const customerInfo = [
   
    {
      value: `Customer Name: ${data?.singleCartOrder?.customer.username}`,
    },
    {
      value: `Contact No: ${data?.singleCartOrder?.customer.phone}`,
    },
  ];
  const TopRightInfo = [
    {
      value: `Order Id: ${data?.singleCartOrder?.id}`,
    },
    {
      value: `Order Date: ${moment(data?.singleCartOrder?.date).format(
        "YYYY-MM-DD"
      )}`,
    },
    {
      value: `Currency: ${currencyName}`,
    },
    // {
    //   value: `TRX ID: ${data?.singleCartOrder?.manualPayment[0]?.customerTransactionId}`,
    // },
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
    <div className="flex gap-2">
      {companyInfo && (
        <button
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
              leftBottomSecondColunmX: 48,
            })
          }
          className={` flex items-center gap-2 bg-green-100 p-2 rounded cursor-pointer font-medium `}
        >
          <FaFileDownload
            className={`text-green-500`}
            size={20}
          />
          <span>Invoice</span>
        </button>
      )}
    </div>
  );
}
