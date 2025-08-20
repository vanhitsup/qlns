import { getSetting } from "@/redux/rtk/features/setting/settingSlice";
import invoiceGenerator from "@/utils/invoiceGenerator";
import numberToWords from "@/utils/numberToWords";
import useCurrency from "@/utils/useCurrency";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function NewSaleReturnInvoice({ data, title }) {
  const { currencyName } = useCurrency() || {};
  const companyInfo = useSelector((state) => state?.setting?.data) || null;
  const dispatch = useDispatch();
  const customerInfo = [
    {
      value: `Customer: ${
        data?.saleInvoice?.customer?.username
          ? data?.saleInvoice?.customer?.username
          : "-"
      }`,
    },
    {
      value: `Sale Invoice Id: ${
        data?.saleInvoiceId ? data?.saleInvoiceId : "-"
      }`,
    },
  ];

  const TopRightInfo = [
    {
      value: `Invoice No: ${data?.id ? data?.id : "-"}`,
    },
    {
      value: `Invoice Date: ${moment(data?.date).format("YYYY-MM-DD")}`,
    },
    {
      value: `Currency: ${currencyName}`,
    },
  ];
  const numberInText = numberToWords(
    Math.round(data.totalAmount + (data.tax ? data.tax : 0))
  );

  const bottomLeftContent = [
    {
      label: "IN WORDS: ",
      value: `${numberInText.toUpperCase()} ${currencyName}` || "",
    },
    {
      label: "Terms And Conditions: ",
      value: data.termsAndConditions ? data.termsAndConditions : "",
    },
    { label: "Notes: ", value: data.note ? data.note : "" },
  ];

  const bottomRightContent = [
    {
      label: "Total:",
      value: `${data.totalAmount ? data.totalAmount.toFixed(2) : 0}`,
    },
    {
      label: "Tax Amount:",
      value: `${data.tax ? data.tax.toFixed(2) : 0}`,
    },
    {
      label: "Ground Total:",
      value: `${(data.totalAmount + (data.tax ? data.tax : 0)).toFixed(2)}`,
    },
  ];

  const tableHead = [
    "SL",
    "Product Description",
    "Quantity",
    "Sale Price",
    "Total Price",
    "Total Tax",
  ];

  const tableBody = data.returnSaleInvoiceProduct.map((item, index) => [
    index + 1,
    item.product.name,
    item.productQuantity,
    `${item.productUnitSalePrice.toFixed(2)}`,
    `${item.productUnitSalePrice * item.productQuantity}`,
    `${item.taxAmount.toFixed(2)}`,
  ]);

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
    <div className="">
      <button
        className="bg-primary flex justify-center items-center px-4 py-[10px] text-white rounded"
        onClick={() =>
          invoiceGenerator("print", {
            title,
            TopRightInfo,
            companyInfo,
            customerInfo,
            bottomLeftContent,
            bottomRightContent,
            tableBody,
            tableHead,
            settings,
            leftBottomSecondColumnX: 32,
          })
        }
      >
        Print Invoice
      </button>
    </div>
  );
}
