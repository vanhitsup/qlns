import { getSetting } from "@/redux/rtk/features/setting/settingSlice";
import invoiceGenerator from "@/utils/invoiceGenerator";
import numberToWords from "@/utils/numberToWords";
import useCurrency from "@/utils/useCurrency";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function NewPurchaseReturnInvoice({ data, title }) {
  const { currencyName } = useCurrency() || {};
  const companyInfo = useSelector((state) => state?.setting?.data) || null;
  const dispatch = useDispatch();

  const TopRightInfo = [
    {
      value: ` Invoice No: ${data?.id}`,
    },
    {
      value: `Invoice Date: ${moment(data?.date).format("YYYY-MM-DD")}`,
    },
    {
      value: `Currency: ${currencyName}`,
    },
  ];
  const numberInText = numberToWords(
    Math.round(data?.totalAmount + (data?.tax ? data?.tax : 0))
  );

  const bottomLeftContent = [
    {
      label: "IN WORDS: ",
      value: `${numberInText.toUpperCase()} ${currencyName}` || "",
    },
    {
      label: "Terms And Conditions: ",
      value: data?.termsAndConditions ? data.termsAndConditions.toUpperCase() : "",
    },
    { label: "NOTES: ", value: data?.note ? data?.note.toUpperCase() : "" },
  ];
  const bottomRightContent = [
    {
      label: "Total:",
      value: `${data?.totalAmount - (data?.discount ? data?.discount : 0)}`,
    },
    {
      label: "Tax Amount:",
      value: `${data?.tax ? data?.tax : 0}`,
    },
    {
      label: "Grand Total:",
      value: `${data?.totalAmount + (data?.tax ? data?.tax : 0)}`,
    },
  ];

  const tableHead = [
    "SI",
    "Product Description",
    "Quantity",
    "Purchase Price",
    "Total Price",
    "Total Tax",
  ];

  const tableBody = data?.returnPurchaseInvoiceProduct?.map((item) => [
    item.id,
    item.product.name,
    item.productQuantity,
    `${item.productUnitPurchasePrice}`,
    `${item.productFinalAmount * item.productQuantity}`,
    `${item.tax}`,
  ]);

  const customerInfo = [
    {
      value: `Supplier: ${data?.purchaseInvoice?.supplier?.name}`,
    },
    {
      value: `Purchase Invoice Id: ${data?.purchaseInvoiceId}`,
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
    <div className="">
      <button
        className="bg-primary flex justify-center items-center px-4 py-[9px] text-white rounded"
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
