import PDFDocument from "pdfkit/js/pdfkit.standalone";
import blobStream from "blob-stream";

export const generatePDF = (htmlTableId: string): void => {
  const doc = new PDFDocument();
  const stream = doc.pipe(blobStream());

  // Set up document properties
  doc.fontSize(12);

  // Add content to the document
  doc.text("Table Export", { align: "center" });
  doc.moveDown();

  // Get the table element
  const table = document.getElementById(htmlTableId);
  if (!table) {
    console.error("Table not found");
    return;
  }

  // Extract table headers
  const headers = Array.from(table.querySelectorAll("thead th")).map(
    (th) => th.textContent || ""
  );

  // Add table headers to PDF
  headers.forEach((header) => {
    doc.text(header, { continued: true, underline: true });
    doc.moveDown(0.5);
  });
  doc.moveDown();

  // Extract table rows
  const rows = Array.from(table.querySelectorAll("tbody tr")).map((tr) =>
    Array.from(tr.querySelectorAll("td")).map((td) => td.textContent || "")
  );

  // Add table rows to PDF
  rows.forEach((row) => {
    row.forEach((cell) => {
      doc.text(cell, { continued: true });
      doc.moveDown(0.5);
    });
    doc.moveDown();
  });

  // Finalize the PDF and end the stream
  doc.end();

  // Handle the stream
  stream.on("finish", () => {
    const url = stream.toBlobURL("application/pdf");
    const link = document.createElement("a");
    link.href = url;
    link.download = "table.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};
