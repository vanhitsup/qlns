import Button from "@/UI/Button";
import accountInvoiceGenerator from "@/utils/accountInvoiceGenerator";
import useCurrency from "@/utils/useCurrency";
import "jspdf-autotable";
import { useSelector } from "react-redux";

export default function TrailBalanceInvoice({ data, title, store }) {
  const { currencyName } = useCurrency() || {};
  const companyInfo = useSelector((state) => state?.setting?.data) || null;

  const bottomLeftContent = [];
  const bottomRightContent = [];

  const tableHead = [
    { header: "Account", dataKey: "subAccount" },
    { header: "Debit", dataKey: "debitBalance" },
    { header: "Credit", dataKey: "creditBalance" },
  ];

  const debitsAccount = data?.debits.map((debit) => ({
    subAccount: debit.subAccount,
    debitBalance: debit.balance,
  }));
  const creditAccount = data?.credits.map((credit) => ({
    subAccount: credit.subAccount,
    creditBalance: credit.balance,
  }));
  // Concatenate debits and credits arrays
  const tableBody = [...debitsAccount, ...creditAccount];

  // Map over the combined array to extract required fields

  tableBody.push({
    subAccount: "Total",
    debitBalance: data.totalDebit.toFixed(3),
    creditBalance: data.totalCredit.toFixed(3),
  });
  const customerInfo = [
    {
      value: `Date: ${new Date().toLocaleDateString()}`,
    },
    { value: store ? `Store: ${store}` : "" },
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
