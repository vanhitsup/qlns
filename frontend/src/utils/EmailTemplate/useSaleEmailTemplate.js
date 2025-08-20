import moment from "moment";
import { useSelector } from "react-redux";
import { decodeHtmlEntity } from "../functions";
import useCurrency from "../useCurrency";

export default function useSaleEmailTemplate(sale) {
  const { currencySymbol } = useCurrency() || {};
  const companyInfo = useSelector((state) => state?.setting?.data) || null;
  const currencyLocal = decodeHtmlEntity(currencySymbol);
  const { totalPaidAmount, dueAmount, singleSaleInvoice,totalReturnAmount,instantPaidReturnAmount } = sale || {};
  const {
    id: singleSaleId,
    customer,
    date,
    totalAmount,
    totalDiscountAmount,
    totalTaxAmount,
  } = singleSaleInvoice || {};

  const calculatedTotalAmount = (totalAmount || 0) + (totalDiscountAmount || 0);
  const calculatedGrandTotal =
  (totalAmount || 0) +
  (totalTaxAmount || 0) -
  (totalReturnAmount || 0) +
  (instantPaidReturnAmount || 0);

  const subject = `Your order has been placed. Order ID #${singleSaleId}`;
  const body = `
<div>Dear <strong>${customer?.username}</strong>,</div>
<div>Greetings! We trust this message reaches you in great spirits. We are immensely grateful for the privilege of having you as our esteemed customer.</div>
<br>
<strong>Order Information:</strong><br>
<p>Order ID: ${singleSaleId}</p>
<p>Order Date: ${moment(date).format("ll")}</p>
<br>
<strong>Invoice Details:</strong><br>
Total Amount: ${currencyLocal}${
    totalAmount ? Number(calculatedTotalAmount).toFixed(2) : 0
  } <br>
Discount: ${currencyLocal}${
    totalDiscountAmount ? Number(totalDiscountAmount).toFixed(2) : 0
  } <br>

Total Tax: ${currencyLocal}${
    totalTaxAmount ? Number(totalTaxAmount).toFixed(2) : 0
  } <br>
${totalReturnAmount ? `Return Product Value: ${currencyLocal}${
    totalReturnAmount ? Number(totalReturnAmount).toFixed(2) : 0
  } <br>`:""}

${instantPaidReturnAmount ? `Return Amount: ${currencyLocal}${
  instantPaidReturnAmount ? Number(instantPaidReturnAmount).toFixed(2) : 0
  }<br>`:""}

Grand Total: ${currencyLocal}${
  totalAmount ? Number(calculatedGrandTotal).toFixed(2) : 0
  } <br>
Paid Amount: ${currencyLocal}${
    totalPaidAmount ? Number(totalPaidAmount).toFixed(2) : 0
  }<br>
Due Amount: ${currencyLocal}${
    dueAmount ? Number(dueAmount).toFixed(2) : 0
  }<br>
<br>
<p>Best Regards,</p>
<p>${companyInfo?.companyName}</p>
<p>${companyInfo?.phone}</p>
<p>${companyInfo?.email}</p>`;

  return {
    subject,
    body,
  };
}
