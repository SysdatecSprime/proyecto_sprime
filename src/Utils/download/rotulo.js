import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export const downloadWithLabel = async (
  base64File,
  position,
  date,
  companyName,
  mailClass,
  subject,
  addressee,
  dependence,
  number,
  consecutive,
  className
) => {
  const existingPdfBytes = base64ToArrayBuffer(base64File);

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();

  //Label box position
  let boxPosX = width - width / 2 + 50;
  let boxPosY = height - 56;
  if (position === "TOP_LEFT") {
    boxPosX = 50;
    boxPosY = height - 56;
  } else if (position === "TOP_CENTER") {
    boxPosX = width / 3;
    boxPosY = height - 56;
  }

  firstPage.drawText(date, {
    x: boxPosX + 50,
    y: boxPosY,
    size: 6,
    font: boldFont,
  });
  firstPage.drawText(companyName, {
    x: boxPosX + 50,
    y: boxPosY - 7,
    size: 6,
    font: boldFont,
  });
  firstPage.drawText("CLASE CORRES:", {
    x: boxPosX,
    y: boxPosY - 14,
    size: 5,
  });
  firstPage.drawText("ASUNTO:", {
    x: boxPosX,
    y: boxPosY - 19,
    size: 5,
  });
  firstPage.drawText("DESTINATARIO:", {
    x: boxPosX,
    y: boxPosY - 24,
    size: 5,
  });
  firstPage.drawText("DEPENDENCIA:", {
    x: boxPosX,
    y: boxPosY - 29,
    size: 5,
  });
  firstPage.drawText(mailClass, {
    x: boxPosX + 50,
    y: boxPosY - 14,
    size: 5,
    font: boldFont,
  });
  firstPage.drawText(subject, {
    x: boxPosX + 50,
    y: boxPosY - 19,
    size: 5,
    font: boldFont,
  });
  firstPage.drawText(addressee, {
    x: boxPosX + 50,
    y: boxPosY - 24,
    size: 5,
    font: boldFont,
  });
  firstPage.drawText(dependence, {
    x: boxPosX + 50,
    y: boxPosY - 29,
    size: 5,
    font: boldFont,
  });
  firstPage.drawText(number, {
    x: boxPosX + 170,
    y: boxPosY,
    size: 5,
    font: boldFont,
  });
  firstPage.drawText("CONSECUTIVO: " + consecutive, {
    x: boxPosX + 120,
    y: boxPosY - 34,
    size: 5,
  });
  firstPage.drawText(`[${className}]`, {
    x: boxPosX + 180,
    y: boxPosY - 34,
    size: 5,
    font: boldFont,
  });

  /* firstPage.drawSquare({
    x: boxPosX + 180,
    y: boxPosY - 25,
    size: 20,
    borderWidth: 1,
    borderColor: rgb(0, 0, 0),
  }); */

  const pdfBytes = await pdfDoc.save();

  var blob = new Blob([pdfBytes], { type: "application/pdf" });
  var link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  var fileName = "archivo.pdf";
  link.download = fileName;
  link.click();
};

export const downloadLabel = async (
  date,
  companyName,
  mailClass,
  subject,
  addressee,
  dependence,
  number,
  consecutive,
  className
) => {
  const pdfDoc = await PDFDocument.create();
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const firstPage = pdfDoc.addPage([283.46, 56.69]);
  const { width, height } = firstPage.getSize();
  let boxPosX = 10;
  let boxPosY = height - 8;

  firstPage.drawText(date, {
    x: boxPosX + 50,
    y: boxPosY,
    size: 6,
    font: boldFont,
  });
  firstPage.drawText(companyName, {
    x: boxPosX + 50,
    y: boxPosY - 7,
    size: 6,
    font: boldFont,
  });
  firstPage.drawText("CLASE CORRES:", {
    x: boxPosX,
    y: boxPosY - 16,
    size: 6,
  });
  firstPage.drawText("ASUNTO:", {
    x: boxPosX,
    y: boxPosY - 22,
    size: 6,
  });
  firstPage.drawText("DESTINATARIO:", {
    x: boxPosX,
    y: boxPosY - 28,
    size: 6,
  });
  firstPage.drawText("DEPENDENCIA:", {
    x: boxPosX,
    y: boxPosY - 34,
    size: 6,
  });
  firstPage.drawText(mailClass, {
    x: boxPosX + 50,
    y: boxPosY - 16,
    size: 6,
    font: boldFont,
  });
  firstPage.drawText(subject, {
    x: boxPosX + 50,
    y: boxPosY - 22,
    size: 6,
    font: boldFont,
  });
  firstPage.drawText(addressee, {
    x: boxPosX + 50,
    y: boxPosY - 28,
    size: 6,
    font: boldFont,
  });
  firstPage.drawText(dependence, {
    x: boxPosX + 50,
    y: boxPosY - 34,
    size: 6,
    font: boldFont,
  });
  firstPage.drawText(number, {
    x: width - 50,
    y: boxPosY,
    size: 6,
    font: boldFont,
  });
  firstPage.drawText("CONSECUTIVO: " + consecutive, {
    x: boxPosX + 120,
    y: boxPosY - 42,
    size: 6,
  });
  firstPage.drawText(`[${className}]`, {
    x: width - 35,
    y: boxPosY - 40,
    size: 5,
    font: boldFont,
  });

  firstPage.drawSquare({
    x: width - 45,
    y: boxPosY - 32,
    size: 30,
    borderWidth: 1,
    borderColor: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();

  var blob = new Blob([pdfBytes], { type: "application/pdf" });
  var link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  var fileName = "rotulo.pdf";
  link.download = fileName;
  link.click();
};

function base64ToArrayBuffer(base64) {
  var binaryString = atob(base64);
  var bytes = new Uint8Array(binaryString.length);
  for (var i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}
