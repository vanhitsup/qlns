import moment from "moment";
import { useSelector } from "react-redux";
import { decodeHtmlEntity } from "../functions";
import useCurrency from "../useCurrency";

export default function useQuoteEmailTemplate(quote) {
  const { currencySymbol } = useCurrency() || {};
  const companyInfo = useSelector((state) => state?.setting?.data) || null;
  const currencyLocal = decodeHtmlEntity(currencySymbol);

  const subject = `Your Quote is Ready!`;
  const body = `
<div>Dear <strong>${quote?.quoteOwner?.username}</strong>,</div>
<div>Greetings! We trust this message reaches you in great spirits. We are immensely grateful for the privilege of having you as our esteemed customer.</div>
<br>
<strong>Quote Information:</strong><br>
<p>Quote ID: ${quote?.id}</p>
<p>Quote Name: ${quote?.quoteName}</p>
<p>Quote Date: ${moment(quote?.quoteDate).format("ll")}</p>
<p>Quote Expiration Date: ${moment(quote?.expirationDate).format("ll")}</p>
<br>
<strong>Invoice Details:</strong><br>
Total Amount: ${currencyLocal}${
    quote?.totalAmount ? Number(quote?.totalAmount).toFixed(2) : 0
  } <br>
Discount: ${currencyLocal}${
    quote?.discount ? Number(quote?.discount).toFixed(2) : 0
  } <br>

<p>Best Regards,</p>
<p>${companyInfo?.companyName}</p>
<p>${companyInfo?.phone}</p>
<p>${companyInfo?.email}</p>`;

  return {
    subject,
    body,
  };
}
