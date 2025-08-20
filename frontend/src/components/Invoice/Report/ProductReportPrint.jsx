import Button from "@/UI/Button";
import { stringShorter } from "@/utils/functions";
import invoiceGenerator from "@/utils/invoiceGenerator";
import useCurrency from "@/utils/useCurrency";
import moment from "moment";
import { useSelector } from "react-redux";

export default function ProductReportPrint({
  data,
  info,
  title,
  type,
  btnName,
}) {
  const { currencyName } = useCurrency() || {};
  const companyInfo = useSelector((state) => state?.setting?.data) || null;

  const bottomLeftContent = [];

  const bottomRightContent = [
    {
      label: "Total Product Quantity",
      value: `${
        info?.totalProductQuantity
          ? Number(info.totalProductQuantity).toFixed(2)
          : ""
      }`,
    },
    {
      label: "Total Purchase Price",
      value: `${
        info?.totalPurchasePrice
          ? Number(info.totalPurchasePrice).toFixed(2)
          : ""
      }`,
    },
    {
      label: "Total Sale Price",
      value: `${
        info?.totalSalePrice ? Number(info.totalSalePrice).toFixed(2) : ""
      }`,
    },
  ];
  const tableHead = [
    "SL",
    "Name",
    "SKU",
    "Brand ",
    "SubCategory",
    "UoM",
    "Store",
    "QTY",
    "ReOrder QTY",
    "Purchase Price",
    "Sale Price",
  ];
  const tableBody = data?.map((item, index) => [
    `${index + 1}`,
    stringShorter(item?.name, 75),
    item?.sku,
    item?.productGroup.productBrand?.name,
    item?.productGroup.subCategory?.name,
    item?.productGroup.uom?.name,
    item?.stockInfo?.map((item) => item?.store?.name).join("\n"),
    item?.stockInfo?.map((item) => item?.productQuantity).join("\n"),
    item?.stockInfo?.map((item) => item?.reorderQuantity).join("\n"),
    item?.stockInfo
      ?.map((item) =>
        item?.productPurchasePrice ? item?.productPurchasePrice : 0
      )
      .join("\n"),
    item?.stockInfo
      ?.map((item) => (item?.productSalePrice ? item?.productSalePrice : 0))
      .join("\n"),
  ]);

  const customerInfo = [];
  const TopRightInfo = [
    {
      value: `Report Date: ${moment().format("YYYY-MM-DD")}`,
    },
    {
      value: `Currency: ${currencyName}`,
    },
  ];
  const settings = {
    jsPDF: {
      orientation: "landscape",
    },
    tableFontSize: 8,
    infoTopFontSize: 10,
    bottomRightFontSize: 10,
    bottomLeftFontSize: 8,
    footerFontSize: 10,
    bottomMargin: 20,
  };
  return (
    <div className='flex gap-2'>
      <Button
        className='bg-primary flex  justify-center items-center px-4 py-2 text-white rounded'
        onClick={() =>
          invoiceGenerator(type, {
            title,
            TopRightInfo,
            companyInfo,
            customerInfo,
            bottomLeftContent,
            bottomRightContent,
            tableBody,
            tableHead,
            settings,
          })
        }
      >
        {btnName}
      </Button>
    </div>
  );
}
