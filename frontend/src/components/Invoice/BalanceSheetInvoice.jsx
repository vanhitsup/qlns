import Button from "@/UI/Button";
import accountInvoiceGenerator from "@/utils/accountInvoiceGenerator";
import useCurrency from "@/utils/useCurrency";
import "jspdf-autotable";
import { useSelector } from "react-redux";

export default function BalanceSheetInvoice({ data, title, store }) {
  const { currencyName } = useCurrency() || {};
  const companyInfo = useSelector((state) => state?.setting?.data) || null;

  const bottomLeftContent = [];
  const bottomRightContent = [];

  const tableHead = [
    { header: "Account", dataKey: "subAccount" },
    { header: "Amount", dataKey: "balance" },
  ];

  const assetsAccount =
    data?.assets?.map((asset) => ({
      subAccount: asset.subAccount,
      balance: asset.balance,
    })) || [];
  const liabilitiesAccount =
    data?.liabilities?.map((liability) => ({
      subAccount: liability.subAccount,
      balance: liability.balance,
    })) || [];
  const equityAccount =
    data?.equity?.map((singleEquity) => ({
      subAccount: singleEquity.subAccount,
      balance: singleEquity.balance,
    })) || [];

  const tableBody = [
    { subAccount: "Assets" },
    ...assetsAccount,
    { subAccount: "Total", balance: data?.totalAsset.toFixed(3) },
    { subAccount: "Liabilities" },
    ...liabilitiesAccount,
    { subAccount: "Total", balance: data?.totalLiability.toFixed(3) },
    { subAccount: "Equity" },
    ...equityAccount,
    { subAccount: "Total", balance: data?.totalEquity.toFixed(3) },
    {
      subAccount: "Total Liabilities and Equity",
      balance: (data?.totalEquity + data?.totalLiability).toFixed(3),
    },
  ];

  const customerInfo = [
    {
      value: `Date: ${new Date().toLocaleDateString()}`,
    },
    store
      ? {
          value: `Store: ${store}`,
        }
      : {},
    {
      value: `Currency: ${currencyName}`,
    },
  ];
  const TopRightInfo = [];
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
  return (
    <div className='flex gap-2'>
      <Button
        color='gray'
        onClick={() =>
          accountInvoiceGenerator("print", {
            title,
            TopRightInfo,
            companyInfo,
            customerInfo,
            bottomLeftContent,
            bottomRightContent,
            tableBody,
            tableHead,
            settings,
            leftBottomSecondColumnX: 45,
          })
        }
      >
        Print
      </Button>
    </div>
  );
}
