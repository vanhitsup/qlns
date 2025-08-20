import { decodeHtmlEntity, stringShorter } from "@/utils/functions";
import useCurrency from "@/utils/useCurrency";
import moment from "moment";
import { Fragment, forwardRef, useRef } from "react";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import "./posPrint.css";

const PrintToPdf = forwardRef(({ data, invoiceData }, ref) => {
  const { currencySymbol } = useCurrency();
  const currencyLocal = decodeHtmlEntity(currencySymbol);
  const {
    singleSaleInvoice,
    instantPaidReturnAmount,
    totalReturnAmount,
    totalPaidAmount,
    dueAmount,
  } = data || {};

  const grandTotal = Number(
    (singleSaleInvoice.totalAmount || 0) +
      (singleSaleInvoice?.totalTaxAmount || 0) -
      (totalReturnAmount || 0) +
      (instantPaidReturnAmount || 0)
  );

  const paymentData = [
    {
      title: "Total Amount",
      value:
        singleSaleInvoice.totalAmount + singleSaleInvoice?.totalDiscountAmount,
    },
    {
      title: "Discount (-)",
      value: singleSaleInvoice.totalDiscountAmount,
    },
    {
      title: "Total Tax (+)",
      value: singleSaleInvoice.totalTaxAmount,
    },
    {
      title: "Return Product Value (-)",
      value: totalReturnAmount,
      hidden: totalReturnAmount === 0 ? true : false,
    },
    {
      title: "Return Amount (+)",
      value: instantPaidReturnAmount,
      hidden: instantPaidReturnAmount === 0 ? true : false,
    },
    {
      title: "Grand Total",
      value: grandTotal,
    },
    {
      title: "Paid Amount (-)",
      value: totalPaidAmount || 0,
    },
    {
      title: "Due",
      value: dueAmount,
    },
  ];

  return (
    <Fragment>
      <div ref={ref} className='pos'>
        <div className='font-Inconsolata text-black text-[12px] font-[500]'>
          <div className='text-xs text-center'>
            <h3 className='font-bold text-xl'>{invoiceData?.companyName}</h3>
            <div className=''>{invoiceData?.tagLine}</div>
            <div className=''>{invoiceData?.address}</div>

            <div className='phone'>{invoiceData?.phone}</div>
            <div className='email'>{invoiceData?.email}</div>
            <div className='website'>{invoiceData?.website} </div>
            {invoiceData?.bin && (
              <div className=''>
                <div>BIN: {invoiceData?.bin}</div>
              </div>
            )}
            {invoiceData?.mushak && (
              <div className=''>
                <div>Musak: {invoiceData?.mushak}</div>
              </div>
            )}
            <div>
              BILL NO: {singleSaleInvoice?.saleInvoiceProduct[0].invoiceId}
            </div>
            <div>
              DATE: {moment(singleSaleInvoice?.date).format("YYYY-MM-DD")}
            </div>
          </div>

          <table className='w-full table mt-4'>
            <tr className='header text-left'>
              <th className='text-[12px]'>Item Name</th>{" "}
              <th className='text-[12px] whitespace-nowrap'>
                Rate <span className='text-[10px]'>({currencyLocal})</span>
              </th>{" "}
              <th className='text-[12px] pl-2'>Qty</th>
              <th className='text-[12px] pl-1 text-right whitespace-nowrap'>
                Amount <span className='text-[10px]'>({currencyLocal})</span>
              </th>
            </tr>

            {singleSaleInvoice &&
              singleSaleInvoice.saleInvoiceProduct.map((d) => (
                <tr key={d.id} className='data text-left'>
                  <td className='text-[12px] whitespace-normal tracking-wide align-top'>
                    {stringShorter(d.product.name, 50)}
                  </td>
                  <td className='text-[12px] whitespace-nowrap tracking-wide align-top'>
                    {d.productUnitSalePrice}
                  </td>
                  <td className='text-[12px] whitespace-nowrap tracking-wide pl-2 align-top'>
                    {d.productQuantity}
                  </td>
                  <td className='text-[12px] whitespace-nowrap tracking-wide pl-1 text-right align-top'>
                    {d.productQuantity * d.productUnitSalePrice}
                  </td>
                </tr>
              ))}
          </table>
          <div className='w-full border-b border-black'></div>
          <div className='w-full flex justify-end items-end'>
            <div className='w-[60%]'>
              {paymentData.map((data, index) => {
                if (data.hidden) {
                  return null;
                }
                return (
                  <div key={index} className='flex justify-between gap-4'>
                    <div className='text-left'>
                      <span className='text-[12px]'>{data.title}:</span>
                    </div>
                    <div className='text-right'>
                      <span className='text-[12px]'>{data.value}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {singleSaleInvoice?.termsAndConditions && (
            <div className='text-center mt-4'>
              <p className=''>
                <span className='text-sm'>Terms and Conditions:</span>{" "}
                {singleSaleInvoice.termsAndConditions}
              </p>
            </div>
          )}
          <div
            className='text-center text-[12px] mt-2 border-b border-black'
            dangerouslySetInnerHTML={{ __html: invoiceData?.footer }}
          />
          <div className='text-center text-[12px]'>
            Powered by Omega Solution | +8801820215555
          </div>
        </div>
      </div>
    </Fragment>
  );
});

PrintToPdf.displayName = "printToPdf";

const PosPrint = ({ data }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const invoiceData = useSelector((state) => state?.setting?.data) || null;

  return (
    <div>
      <div className='hidden'>
        <PrintToPdf ref={componentRef} data={data} invoiceData={invoiceData} />
      </div>
      {invoiceData && <div onClick={handlePrint}>POS Print</div>}
    </div>
  );
};

export default PosPrint;
