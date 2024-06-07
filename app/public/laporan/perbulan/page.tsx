"use client";
import TablePerBulanPublic from "@/components/own/public/report/perbulan/tablePerBulan";
import { useSearchParams } from "next/navigation";
import React from "react";

const PublicOneReportPage = () => {
  const params = useSearchParams().getAll("id")[0];
  return (
    <div className=" min-h-[90vh] max-w-[90%] m-auto py-5">
      <TablePerBulanPublic kegiatanId={params} />
    </div>
  );
};

export default PublicOneReportPage;
