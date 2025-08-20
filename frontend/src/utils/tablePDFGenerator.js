import jsPDF from "jspdf";
import "jspdf-autotable";
function stripHtml(html) {
  var doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}
export default function tablePDFGenerator(type,
  {
    title,
    tableHead,
    companyInfo,
    tableBody,
    settings,
  }
) {

  const doc = new jsPDF(settings?.jsPDF);

  //====== By default font Size ===========
  //   tableFontSize: 10,
  //   infoTopFontSize: 8,
  //   bottomRightFontSize:12,
  //   bottomLeftFontSize: 8,
  //   footerFontSize:10
  //=======================================

  
  doc.setFontSize(settings?.fontSize);
  const pageSize = doc.internal.pageSize;
  const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
  const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
  //==================== Define the header content============================
  const headerContent = function () {
    //========================== Invoice title ===========================
    if (title) {
      const TITLE = title.toUpperCase();
      doc.setFontSize(14);
      doc.setTextColor(0);
      const textWidth =
        (doc.getStringUnitWidth(TITLE) * 14) / doc.internal.scaleFactor;
      const xPos = (pageWidth - textWidth) / 2;
      const yPos = 10;
      doc.text(TITLE, xPos, yPos);
      doc.setFontSize(10);
    }
  };

  //======================= Define the footer content=============================
  const footerContent = function () {
    doc.setFontSize(settings.footerFontSize ? settings.footerFontSize : 10);
    const pageSize = doc.internal.pageSize;
    const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
    const xCoordinate = pageWidth / 2;

     doc.text(stripHtml(companyInfo?.footer), xCoordinate, pageHeight - 11, {
      align: "center",
     });
    doc.setLineWidth(0.1);
    // Set line color
    doc.setDrawColor(150, 150, 150);
    settings.jsPDF.orientation === "landscape" ? doc.line(100, pageHeight - 9, 200, pageHeight - 9)  :   doc.line(50, pageHeight - 9, 155, pageHeight - 9); 
    doc.text("All Rights Reserved © Omega Solution", xCoordinate, pageHeight - 5, {
      align: "center",
    })
  };
 

  
  //====================== Main table items ===============================
  doc.autoTable({
    startY: Math.max(20, 10),
    columns: tableHead,
    body: tableBody,
    margin: { top: title ? 20 : 10, bottom: 20 },
    willDrawPage: headerContent,
    didDrawPage: footerContent,
    styles: {
      fontSize: settings?.tableFontSize ? settings?.tableFontSize : 10, // Set your desired font size here
    },
    
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
