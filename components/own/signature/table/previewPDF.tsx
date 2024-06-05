"use client";
import { SignatureType, TransactionType } from "@/lib/mongodb/models";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface PdfData {
  transaksi: TransactionType[];
  selectedMonth: { id: number; name: string };
  selectedYear: { id: number; name: string };
  signature: SignatureType[];
}

const PreviewPDF = () => {
  const router = useRouter();
  const [pdfData, setPdfData] = useState<PdfData | null>(null);

  useEffect(() => {
    const { pdfData } = router.query;
    if (pdfData) {
      // Parse the JSON string passed in the query parameter
      const parsedData = JSON.parse(pdfData as string) as PdfData;
      setPdfData(parsedData);
    }
    console.log(pdfData);
  }, [router.query]);

  return (
    <div>
      <h1>Preview PDF</h1>
      {pdfData && (
        <div>
          {/* Display the PDF data */}
          <pre>{JSON.stringify(pdfData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PreviewPDF;
