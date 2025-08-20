import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

export default function payrollPdfGenerator(
  type,
  {
    title,
    tableHead,
    topBody,
    bottomBody,
    middleRightInfo,
    data,
    tableBody,
    topRightInfo,
    settings,
    bottomRightContent,
    companyInfo,
    bottomLeftContent,
    rightColumnLevelPosition = 30,
    logo,
    companyInfoArray,
    topLeftContent,
  }
) {
  const doc = new jsPDF(settings.jsPDF);
  doc.setFontSize(settings.fontSize);

  const pageSize = doc.internal.pageSize;
  const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
  const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
  let YRunnig = 15;

  // Add logo or company name
  if (logo) {
    const imgWidthInMM = logo.width / 3.78;
    const xPos = pageWidth - imgWidthInMM - 15;
    doc.addImage(logo.img, "JPEG", xPos, 15);
    YRunnig += logo.height / 3.78 + 10;
  } else {
    const companyName = companyInfo?.companyName || "Company Name";
    doc.setFontSize(20);
    doc.setFont("Poppins", "bold");
    const contentHeight = doc.getTextDimensions(companyName).h;
    doc.text(companyName, pageWidth - 15, 15, {
      align: "right",
    });
    doc.setFontSize(11);
    doc.setFont("Poppins", "normal");
    YRunnig += contentHeight + 5;
  }

  // Top Left and Top Right Sections
  let topLeftX = 15;
  let topLeftY = YRunnig;

  // Render Top Left Content
  const centerX = pageWidth / 2;
  topLeftY += 20;
  topLeftContent
    .filter((item) => item.value)
    .forEach((item) => {
      doc.setFontSize(item.style?.fontSize || 11);
      if (item.style?.bold) {
        doc.setFont("Poppins", "bold");
      }

      const contentLines = doc.splitTextToSize(item.value, pageWidth - 60);
      const contentHeight = doc.getTextDimensions(contentLines).h;
      doc.text(contentLines, centerX, topLeftY, { align: "center" });
      topLeftY += contentHeight + (item.style?.marginBottom || 5);

      doc.setFont("Poppins", "normal");
    });

  // Render Top Right Info
  topRightInfo
    .filter((info) => info.value)
    .forEach((info) => {
      doc.setFontSize(settings.infoTopFontSize || 8);
      if (info.style?.fontSize) doc.setFontSize(info.style.fontSize);
      doc.setFont("Poppins", info.style?.bold ? "bold" : "normal");

      const value = doc.splitTextToSize(info.value, 70);

      doc.text(value, topLeftX, topLeftY + 7);
      topLeftY += doc.getTextDimensions(value).h + 3;
    });

  // Render Top middle Info
  middleRightInfo
    .filter((info) => info.value)
    .forEach((info) => {
      doc.setFontSize(settings.infoTopFontSize || 8);
      if (info.style?.fontSize) doc.setFontSize(info.style.fontSize);
      doc.setFont("Poppins", info.style?.bold ? "bold" : "normal");

      const value = doc.splitTextToSize(info.value, 70);

      doc.text(
        value,
        pageWidth / 2 + 15 + (pageWidth / 2 - 30) / 7,
        topLeftY - 20
      );
      topLeftY += doc.getTextDimensions(value).h + 3;
    });

  // Company Info Box
  let companyInfoY = YRunnig;
  let companyInfoX = pageWidth / 2 + 15 + (pageWidth / 2 - 30) / 2 + 5;
  // let companyInfoX = 5;
  const companyInfoBoxWidth = (pageWidth / 2 - 30) / 2;
  const spacingBetweenItems = 4;

  companyInfoArray
    .filter((item) => item.value)
    .forEach((item) => {
      doc.setFontSize(11);
      if (item.style) {
        if (item.style.bold) {
          doc.setFont("Poppins", "bold");
        }
        if (item.style.fontSize) {
          doc.setFontSize(item.style.fontSize);
        }
      }
      if (item.style?.marginBottom) {
        topLeftY += item.style.marginBottom;
      }
      if (item.style?.marginLeft) {
        topLeftX += item.style.marginLeft;
      }
      const contentLines = doc.splitTextToSize(item.value, companyInfoBoxWidth);
      const contentLinesHeight = doc.getTextDimensions(contentLines).h;
      doc.text(contentLines, companyInfoX, companyInfoY);
      doc.setFont("Poppins", "normal");
      companyInfoY += contentLinesHeight + spacingBetweenItems;
    });

  // Table for Top Body Section
  doc.autoTable({
    startY: topLeftY - 7,
    body: [topBody],
    theme: "grid",
    headStyles: {
      fillColor: [229, 231, 235],
      textColor: [0, 0, 0],
      fontSize: 12,
      font: "poppins",
      lineWidth: 0.5,
    },
    bodyStyles: {
      fontSize: 10,
      textColor: [0, 0, 0],
      halign: "center",
      fillColor: [245, 245, 245],
    },
    alternateRowStyles: {
      fillColor: [255, 255, 255],
    },
    columnStyles: {
      0: { lineWidth: 0, fillColor: [255, 255, 255] },
      1: { lineWidth: 0, fillColor: [255, 255, 255] },
      2: { lineWidth: 0, fillColor: [255, 255, 255] },
    },
    tableLineWidth: 0.3,
    tableLineColor: [229, 231, 235],
  });

  const tableStartY = topLeftY + 7.8 - 7;
  doc.autoTable({
    startY: tableStartY,
    head: [tableHead],
    body: tableBody,
    theme: "grid",
    headStyles: {
      fillColor: [229, 231, 235],
      textColor: [0, 0, 0],
      halign: "center",
      fontSize: 12,
      font: "poppins",
    },
    bodyStyles: {
      fontSize: 10,
      textColor: [0, 0, 0],
      halign: "center",
    },
  });

  doc.autoTable({
    startY: tableStartY + 30,
    body: [bottomBody],
    theme: "grid",
    headStyles: {
      fillColor: [229, 231, 235],
      textColor: [0, 0, 0],
      fontSize: 12,
      font: "poppins",
      lineWidth: 0.5,
    },
    bodyStyles: {
      fontSize: 10,
      textColor: [0, 0, 0],
      halign: "right",
      fillColor: [245, 245, 245],
    },
    alternateRowStyles: {
      fillColor: [255, 255, 255],
    },
    columnStyles: {
      1: { lineWidth: 0, fillColor: [255, 255, 255] },
      2: { lineWidth: 0, fillColor: [255, 255, 255] },
    },
    tableLineWidth: 0.3,
    tableLineColor: [229, 231, 235],
  });

  // Bottom Right Content Section
  doc.setFontSize(12);
  YRunnig = doc.autoTable.previous.finalY + 10;
  doc.setFontSize(settings.bottomRightFontSize || 12);
  let bottomRightY = YRunnig;

  const rightYBeforeWrite =
    (bottomRightContent.filter((item) => item.value).length - 1) * 2 +
    bottomRightY;
  const rightColumnX = pageWidth / 2 + rightColumnLevelPosition;
  const rightColumn2X = pageWidth - 15;
  let rightColumnY = bottomRightY;

  if (rightYBeforeWrite > pageHeight - 45) {
    if (rightYBeforeWrite <= pageHeight - 15) {
      bottomRightContent
        .filter((item) => Boolean(item.value))
        .forEach((item, index) => {
          if (item.style?.bold) {
            doc.setFont("poppins", "bold");
          }
          const rightColY = rightColumnY + index * 6;
          doc.text(item.label, rightColumnX, rightColY);
          doc.text(item.value, rightColumn2X, rightColY, { align: "right" });
          doc.setFont("poppins", "normal");
          if (item.style?.borderTop && item?.style?.final) {
            doc.line(
              rightColumnX - 20,
              rightColY - 4,
              pageWidth - 15,
              rightColY - 4
            );
          } else if (item?.style?.borderTop) {
            doc.line(
              rightColumnX - 5,
              rightColY - 4,
              pageWidth - 15,
              rightColY - 4
            );
          }
        });
    } else {
      doc.addPage(); // Add new page if content overflows
      // Re-render bottomRightContent on new page
    }
  }

  const footerContent = () => {
    const pageSize = doc.internal.pageSize;
    const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();

    const footerMargin = 15;
    const footerLineY = pageHeight - footerMargin - 12;
    const signatureTextY = footerLineY + 4;

    const lineStartX = 15;
    const lineEndX = lineStartX + 50;
    doc.setLineWidth(0.1);
    doc.setDrawColor(0, 0, 0);
    doc.line(lineStartX, footerLineY, lineEndX, footerLineY);

    doc.setFontSize(10);
    doc.setFont("poppins", "bold");
    doc.text("Authorize By", lineStartX, signatureTextY, {
      align: "left",
    });
  };

  footerContent();

  if (type === "download") {
    // Download the PDF
    doc.save(`${title}`);
  } else if (type === "print") {
    // Print the PDF
    doc.autoPrint();

    window.open(doc.output("bloburl"), "_blank").print();
  } else {
    return doc.output("blob");
  }
}
