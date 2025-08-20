import Button from "@/UI/Button";
import accountInvoiceGenerator from "@/utils/accountInvoiceGenerator";
import useCurrency from "@/utils/useCurrency";
import "jspdf-autotable";
import { useDispatch, useSelector } from "react-redux";

export default function IncomeStatementInvoice({ data, title , store}) {
  const { currencyName } = useCurrency() || {};
  const companyInfo = useSelector((state) => state?.setting?.data) || null;
  const dispatch = useDispatch();

  const bottomLeftContent = [];
  const bottomRightContent = [];

  const tableHead = [
    { header: "Account", dataKey: "subAccount" },
    { header: "Amount", dataKey: "balance" },
  ];

  const revenueAccount =
    data?.revenue?.map((singleRevenue) => ({
      subAccount: singleRevenue.subAccount,
      balance: singleRevenue.balance,
    })) || [];
  const expenseAccount =
    data?.expense?.map((singleExpense) => ({
      subAccount: singleExpense.subAccount,
      balance: singleExpense.balance,
    })) || [];
  const equityAccount =
    data?.equity?.map((singleEquity) => ({
      subAccount: singleEquity.subAccount,
      balance: singleEquity.balance,
    })) || [];

  const tableBody = [
    { subAccount: "Revenue" },
    ...revenueAccount,
    { subAccount: "Total", balance: data?.totalRevenue.toFixed(3) },
    { subAccount: "Expense" },
    ...expenseAccount,
    { subAccount: "Total", balance: data?.totalExpense.toFixed(3) },

    { subAccount: "Profit", balance: data?.profit.toFixed(3) },
  ];

  //   const tableBody = [...debitsAccount, ...creditAccount];

  // Map over the combined array to extract required fields

  //   tableBody.push({
  //     subAccount: "Total",
  //     debitBalance: data.totalDebit.toFixed(3),
  //     creditBalance: data.totalCredit.toFixed(3),
  //   });
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
    <div className="flex gap-2">
      <Button
        color="gray"
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
