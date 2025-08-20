import { getSetting } from "@/redux/rtk/features/setting/settingSlice";
import invoiceGenerator from "@/utils/invoiceGenerator";
import numberToWords from "@/utils/numberToWords";
import useCurrency from "@/utils/useCurrency";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function NewQuotationInvoice({ data, title }) {
  const { currencyName } = useCurrency() || {};
  const companyInfo = useSelector((state) => state?.setting?.data) || null;
  const dispatch = useDispatch();

  const numberInText = numberToWords(
    Math.round(data.totalAmount - data.discount)
  );

  const bottomLeftContent = [
    {
      label: "Total In Words: ",
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
      label: "Discount: (-)",
      value: `${data.discount ? data.discount : 0}`,
    },
    {
      label: "Total:",
      value: `${data.totalAmount - (data.discount ? data.discount : 0)}`,
    },
  ];

  const tableHead = ["SI", "Items", "Quantity", "Price", "Total"];

  const tableBody = data.quoteProduct.map((item) => [
    item.id,
    item.product.name,
    item.productQuantity,
    `${item.unitPrice}`,
    `${item.unitPrice * item.productQuantity}`,
  ]);

  const customerInfo = [
    {
      value: `Quotation Owner: ${data?.quoteOwner?.username}`,
    },
    {
      value: `Expiration Date: ${moment(data?.expirationDate).format(
        "YYYY-MM-DD"
      )}`,
    },
  ];
  const TopRightInfo = [
    {
      value: `Quotation Name: ${data?.quoteName}`,
    },
    {
      value: `Quotation Date: ${moment(data?.quoteDate).format("YYYY-MM-DD")}`,
    },
    {
      value: `Currency: ${currencyName}`,
    },
  ];
  const settings = {
    jsPDF: {
      // orientation: "landscape"
    },
    tableFontSize: 10,
    infoTopFontSize: 10,
    bottomRightFontSize: 12,
    bottomLeftFontSize: 8,
    footerFontSize: 10,
  };
  useEffect(() => {
    !companyInfo && dispatch(getSetting());
  }, [dispatch, companyInfo]);
  return (
    <div className=''>
      <button
        className='bg-primary flex justify-center items-center px-4 py-2 text-white rounded'
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
            leftBottomSecondColumnX: 55,
          })
        }
      >
        Print
      </button>
    </div>
  );
}
