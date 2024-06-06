"use client";
import TablePerBulanPublic from "@/components/own/public/report/perbulan/tablePerBulan";
import { BukuKasType, TransactionType } from "@/lib/mongodb/models";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const PublicOneReportPage = () => {
  const params = useSearchParams().getAll("id")[0];
  // const [kegiatan, setkegiatan] = useState<BukuKasType>();
  // const [transaksi, settranskasi] = useState<TransactionType[]>([]);
  // const getData = async (kegiatanId: any) => {
  //   const res = await fetch(`/api/public/laporan/bukukas?id=${kegiatanId}`);
  //   const { bukuKas, transaksi } = await res.json();
  //   setkegiatan(bukuKas);
  //   settranskasi(transaksi);
  //   console.log(transaksi);
  // };
  // useEffect(() => {
  //   getData(params);
  // }, []);
  return (
    <div className=" min-h-[90vh] max-w-[90%] m-auto py-5">
      <TablePerBulanPublic kegiatanId={params} />
    </div>
  );
};

export default PublicOneReportPage;
