import moment from "moment";
import { useSelector } from "react-redux";
import { decodeHtmlEntity } from "../functions";
import useCurrency from "../useCurrency";

export default function usePurchaseEmailTemplate(purchase) {
  const companyInfo = useSelector((state) => state?.setting?.data) || null;
  const { currencySymbol } = useCurrency() || {};
  const currencyLocal = decodeHtmlEntity(currencySymbol);

  const {
    status,
    totalPaidAmount,
    totalReturnAmount,
    instantPaidReturnAmount,
    dueAmount,
    singlePurchaseInvoice,
    returnPurchaseInvoice,
    transactions,
  } = purchase || {};

  const {
    totalAmount,
    totalTax,
    purchaseInvoiceProduct,
    store,
    supplier,
    note,
    createdAt,
    id: purchaseId,
  } = singlePurchaseInvoice || {};

  const calculatedGrandTotal =
    (totalAmount || 0) +
    (totalTax || 0) +
    (instantPaidReturnAmount || 0) -
    (totalReturnAmount || 0);


  const subject = `Your order has been received. Order ID #${purchaseId} `;
  const body = `<div>
        <p>Dear <strong>${singlePurchaseInvoice?.supplier?.name}</strong>,</p>
        <p>Greetings! We trust this message reaches you in great spirits. We are immensely grateful for the privilege of having you as our esteemed supplier.</p>
    </div>
<br>
    <div class="order-info">
        <strong>Order Information:</strong><br>
        Order ID: ${purchaseId}<br>
        Order Date: ${moment(singlePurchaseInvoice?.date).format("ll")}
    </div>
<br>
    <div class="invoice-details">
        <strong>Invoice Details:</strong><br>
        Total Amount: ${currencyLocal}${
    totalAmount
      ? Number(totalAmount).toFixed(2)
      : 0
  }<br>
        Total Tax: ${currencyLocal}${
    totalTax
      ? Number(totalTax).toFixed(2)
      : 0
  }<br>
  ${ totalReturnAmount ? (`Return Product Value: ${currencyLocal}${ totalReturnAmount
      ? Number(totalReturnAmount).toFixed(2)
      : 0
  }<br>`):""}
  ${instantPaidReturnAmount ? (`Return Amount: ${currencyLocal}${ instantPaidReturnAmount
      ? Number(instantPaidReturnAmount).toFixed(2)
      : 0
  }<br>`):""}
  Grand Total: ${currencyLocal}${
    totalAmount
      ? Number(calculatedGrandTotal).toFixed(2)
      : 0
  }<br>
        Paid Amount: ${currencyLocal}${
    totalPaidAmount ? Number(totalPaidAmount).toFixed(2) : 0
  }<br>
        Due Amount: ${currencyLocal}${
    dueAmount ? Number(dueAmount).toFixed(2) : 0
  }
    </div>
<br>
    <div class="company-info">
        Best Regards,<br>
        <strong>${companyInfo?.companyName}</strong><br>
        ${companyInfo?.phone}<br>
        ${companyInfo?.email}
    </div>`;

  return { subject, body };
}
