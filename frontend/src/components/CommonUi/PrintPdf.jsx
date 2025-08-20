import { getSetting } from "@/redux/rtk/features/setting/settingSlice";
import tablePDFGenerator from "@/utils/tablePDFGenerator";
import "jspdf-autotable";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PrintPDF({ title, columns, list }) {
  const companyInfo = useSelector((state) => state?.setting?.data) || null;
  const dispatch = useDispatch();
  const tableHead = columns
    ?.filter((data) => !data.csvOff)
    .map((column) => {
      return {
        header: column.title,
        dataKey: column.title,
      };
    });

  const newList = list.map((item) => {
    const data = {};
    columns.forEach((column) => {
      if (column.csvOff) return null;
      if (column.renderCsv && typeof column.renderCsv === "function") {
        if (!column.dataIndex)
          return (data[column.title] = column.renderCsv(item));
        return (data[column.title] = column.renderCsv(
          item[column.dataIndex],
          item
        ));
      }

      if (!column.dataIndex) return (data[column.title] = item);
      return (data[column.title] = item[column.dataIndex]);
    });

    return data;
  });
  const tableBody = newList;

  const settings = {
    jsPDF: {
      orientation: "landscape",
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
    <div className="flex gap-2 hover:text-primary">
      <button
        onClick={() =>
          tablePDFGenerator("print", {
            title,
            tableBody,
            companyInfo,
            tableHead,
            settings,
          })
        }
      >
        Print PDF
      </button>
    </div>
  );
}
