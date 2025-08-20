import jsPDF from "jspdf";
import "jspdf-autotable";

function stripHtml(html) {
  var doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}
function isSectionHeader(rowData) {
  return ["Assets", "Liabilities", "Equity"].includes(rowData.subAccount);
}

export default function accountInvoiceGenerator(
  type,
  {
    title,
    TopRightInfo,
    customerInfo,
    companyInfo,
    tableHead,
    tableBody,
    bottomLeftContent,
    bottomRightContent,
    settings,
    leftBottomSecondColunmX = 48,
  }
) {
  const doc = new jsPDF(settings.jsPDF);

  //====== By default font Size ===========
  //   tableFontSize: 10,
  //   infoTopFontSize: 8,
  //   bottomRightFontSize:12,
  //   bottomLeftFontSize: 8,
  //   footerFontSize:10
  //=======================================

  // Set the document font and size
  doc.setFontSize(settings.fontSize);
  const pageSize = doc.internal.pageSize;
  const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
  const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
  let companyInfoStartY = 10;
  //==================== Define the header content============================
  const headerContent = function () {
    const img = new Image();
    img.src = companyInfo?.logo;
    if (companyInfo?.logo) {
      doc.addImage(img, "PNG", 15, 10, 50, 15);
    }

    const companyInfoArray = [
      {
        value: companyInfo?.companyName,
        style: {
          fontSizeStart: 20,
          fontSizeEnd: 11,
          colorEnd: [128, 128, 128],
        },
      },
      {
        value: companyInfo?.tagLine,
      },
      {
        value: companyInfo?.address,
      },
      {
        value: companyInfo?.phone,
      },
      {
        value: `Email: ${companyInfo?.email}`,
      },
      {
        value: companyInfo?.website,
        type: "link",
      },
    ];

    // Add company information

    const companyBoxWidth = pageWidth / 2;
    const spacingBetweenItems = 1;
    companyInfoArray.forEach((info, index) => {
      if (info.style?.fontSizeStart) {
        doc.setFontSize(info.style?.fontSizeStart);
      }
      const contentLines = doc.splitTextToSize(info.value, companyBoxWidth);
      const contentLinesHeight = doc.getTextDimensions(contentLines).h;
      if (info.type === "link") {
        doc.textWithLink(info.value, pageWidth - 15, companyInfoStartY, {
          url: companyInfo.website,
          align: "right",
        });
      } else {
        doc.text(contentLines, pageWidth - 15, companyInfoStartY, {
          align: "right",
        });
      }

      if (info.style?.fontSizeEnd) {
        doc.setFontSize(info.style?.fontSizeEnd);
      }
      if (info.style?.colorEnd) {
        doc.setTextColor(
          info.style?.colorEnd[0],
          info.style?.colorEnd[1],
          info.style?.colorEnd[2]
        );
      }
      companyInfoStartY += contentLinesHeight + spacingBetweenItems;
      if (companyInfoArray.length - 1 === index) {
        companyInfoStartY = 10;
      }
    });

    //========================== Invoice title ===========================
    if (title) {
      const TITLE = title.toUpperCase();
      doc.setFontSize(14);
      doc.setTextColor(0);
      const textWidth =
        (doc.getStringUnitWidth(TITLE) * 14) / doc.internal.scaleFactor;
      const xPos = (pageWidth - textWidth) / 2;
      const yPos = 45;
      doc.text(TITLE, xPos, yPos);
      doc.setFontSize(10);
    }
  };

  //======================= Define the footer content=============================
  const footerContent = function () {
    doc.setFontSize(8);
    const pageSize = doc.internal.pageSize;
    const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
    const xCoordinate = pageWidth / 2;

    doc.text(stripHtml(companyInfo?.footer), xCoordinate, pageHeight - 11, {
      align: "center",
    });
    doc.setLineWidth(0.1);
    doc.setDrawColor(150, 150, 150); // Set the line color as desired (in RGB format)

    settings.jsPDF.orientation === "landscape"
      ? doc.line(100, pageHeight - 9, 200, pageHeight - 9)
      : doc.line(50, pageHeight - 9, 155, pageHeight - 9);
    doc.text(
      "All Rights Reserved © Omega Solution",
      xCoordinate,
      pageHeight - 5,
      {
        align: "center",
      }
    );
  };

  //================ top left side info section =====================================
  let customerInfoStartY = title ? 58 : 53;
  const customerBoxWidth = pageWidth / 2 - 50;
  const spacingBetweenItems = 1;
  customerInfo
    ?.filter((info) => info.value)
    ?.forEach((info) => {
      doc.setFontSize(settings.infoTopFontSize ? settings.infoTopFontSize : 8);

      if (info.style?.bold) {
      }
      if (info.style?.fontSize) {
        doc.setFontSize(info.style?.fontSize);
      }
      const contentLines = doc.splitTextToSize(
        `${info.value}`,
        customerBoxWidth
      );
      const contentLinesHeight = doc.getTextDimensions(contentLines).h;
      doc.text(contentLines, 14, customerInfoStartY);
      doc.setFontSize(8);
      customerInfoStartY += contentLinesHeight + spacingBetweenItems;
    });

  //========================top right invoice info right ============================

  let InvoiceStartY = title ? 58 : 53;
  const InvoiceBoxWidth = pageWidth / 2 - 50;
  const spacingBetweenInvoiceItems = 1;
  TopRightInfo?.filter((info) => info.value)?.forEach((info) => {
    doc.setFontSize(settings.infoTopFontSize ? settings.infoTopFontSize : 8);
    if (info.style?.bold) {
    }
    if (info.style?.fontSize) {
      doc.setFontSize(info.style?.fontSize);
    }

    const contentLines = doc.splitTextToSize(`${info.value}`, InvoiceBoxWidth);
    const contentLinesHeight = doc.getTextDimensions(contentLines).h;
    doc.text(contentLines, pageWidth - 15, InvoiceStartY, { align: "right" });
    doc.setFontSize(8);
    InvoiceStartY += contentLinesHeight + spacingBetweenInvoiceItems;
  });

  //====================== Main table items ===============================

  doc.autoTable({
    startY: Math.max(customerInfoStartY, InvoiceStartY),
    columns: tableHead,
    body: tableBody,
    margin: { top: title ? 55 : 50, bottom: 15 },
    padding: { left: title == "Trail Balance" ? 2 : 10, top: 2, bottom: 2 },
    willDrawPage: headerContent,
    didDrawPage: footerContent,
    styles: {
      fontSize: settings.tableFontSize ? settings.tableFontSize : 10, // Set your desired font size here
    },

    didParseCell: function (data) {
      if (
        data.row.raw.subAccount === "Assets" ||
        data.row.raw.subAccount === "Account" ||
        data.row.raw.subAccount === "Liabilities" ||
        data.row.raw.subAccount === "Equity" ||
        data.row.raw.subAccount === "Total Liabilities and Equity"
      ) {
        data.cell.styles.fontStyle = "bold";
        data.row.cells.subAccount.styles.cellPadding = 2;
      }
      if (data.row.raw.subAccount === "Total") {
        data.cell.styles.fontStyle = "bold";
      }

      if (
        data.row.raw.subAccount === "Revenue" ||
        data.row.raw.subAccount === "Expense" ||
        data.row.raw.subAccount === "Profit"
      ) {
        data.cell.styles.fontStyle = "bold";
        data.row.cells.subAccount.styles.cellPadding = 2;
      }
    },
  });

  // ====================== bottom left info ===============================
  doc.setFontSize(
    settings.bottomLeftFontSize ? settings.bottomLeftFontSize : 8
  );
  // Calculate Y-coordinate for additional content
  let startYForAdditionalContent = doc.autoTable.previous.finalY + 10;
  doc.setDrawColor(0);
  doc.setLineWidth(0.1);

  // left side box width
  const boxWidth = pageWidth / 2 - 30;

  // calculate leftContent abd rightContent height or y coordinate before additional content added
  const leftYBeforeWrite = bottomLeftContent
    .filter((item) => item.value)
    .reduce((total, item) => {
      const contentLines = doc.splitTextToSize(item.value, boxWidth);
      // get contentLines height or y coordinate
      const contentLinesHeight = doc.getTextDimensions(contentLines).h;
      const spacingBetweenItems = 2;
      return total + contentLinesHeight + spacingBetweenItems;
    }, startYForAdditionalContent);

  const rightYBeforeWrite =
    (bottomRightContent.filter((item) => item.value).length - 1) * 6 +
    startYForAdditionalContent;

  const bigHeight = Math.max(leftYBeforeWrite, rightYBeforeWrite);
  if (bigHeight > pageHeight - 12) {
    doc.addPage();
    headerContent();
    footerContent();
    startYForAdditionalContent = Math.max(customerInfoStartY, InvoiceStartY);
  }

  const leftColumnX = 14;
  const leftColumn2X = leftBottomSecondColunmX;
  let leftColumnY = startYForAdditionalContent;
  const rightColumnX = pageWidth / 2 + 30;
  const rightColumn2X = pageWidth - 15;
  const rightColumnY = startYForAdditionalContent;

  bottomLeftContent
    .filter((item) => item.value)
    .forEach((item) => {
      const contentLines = doc.splitTextToSize(item.value, boxWidth);
      // get contentLines height or y coordinate
      const contentLinesHeight = doc.getTextDimensions(contentLines).h;
      doc.text(item.label, leftColumnX, leftColumnY);
      doc.text(contentLines, leftColumn2X, leftColumnY);
      const spacingBetweenItems = 2;
      leftColumnY += contentLinesHeight + spacingBetweenItems;
    });

  //====================bottom right info===============================
  doc.setFontSize(
    settings.bottomRightFontSize ? settings.bottomRightFontSize : 12
  );
  doc.setTextColor(50, 50, 50);
  bottomRightContent
    .filter((item) => Boolean(item.value))
    .forEach((item, index) => {
      doc.text(item.label, rightColumnX, rightColumnY + index * 6);
      doc.text(item.value, rightColumn2X, rightColumnY + index * 6, {
        align: "right",
      });
    });

  // ======================= final print or download======================
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
