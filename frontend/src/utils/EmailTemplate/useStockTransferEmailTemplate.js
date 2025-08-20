import moment from "moment";
import { useSelector } from "react-redux";
import { decodeHtmlEntity } from "../functions";
import useCurrency from "../useCurrency";

export default function useStockTransferEmailTemplate(stockTransfer) {
  const { currencySymbol } = useCurrency() || {};
  const companyInfo = useSelector((state) => state?.setting?.data) || null;
  const currencyLocal = decodeHtmlEntity(currencySymbol);
  const { id, date, totalPurchaseAmount, stockCount, totalQuantity } =
    stockTransfer || {};

  const subject = `Stock Transfer ID #${id}`;
  const body = `
<div>Dear <strong>Manager</strong>,</div>
<div>Greetings! We trust this message reaches you in great spirits.</div>
<br>
<strong>Stock transfer Information:</strong><br>
<p>Invoice ID: ${id}</p>
<p>Place Date: ${moment(date).format("ll")}</p>
<br>
<strong>Stock transfer details:</strong><br>
Total Transferred Amount: ${currencyLocal} ${
    totalPurchaseAmount ? Number(totalPurchaseAmount).toFixed(2) : 0
  } <br>
Total Unique Stock: ${stockCount || 0} <br>
Total Quantity: ${totalQuantity || 0} <br>

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
