"use client";
import TableDashboard from "@/components/own/dashboard/table";
import { TransactionType, KategoriType } from "@/lib/mongodb/models";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { kegiatanIDStore } from "../store/zustand";

const DashboardPage = () => {
  const [transaksi, setTransaksi] = useState<TransactionType[]>([]);
  // const kegiatanId = useSearchParams().getAll("id")[0];
  const kegiatanId = kegiatanIDStore((state: any) => state.kegiatanID);

  async function getTransactions(searchParams: any) {
    const res = await fetch(`/api/transaksi/perKegiatan?id=${searchParams}`, {
      cache: "no-store",
    });
    const { transaksi, allkategori } = await res.json();
    transaksi.map((dataTransaksi: TransactionType) => {
      allkategori.map((dataKategori: KategoriType) => {
        if (dataTransaksi.kategoriId == dataKategori._id) {
          dataTransaksi.kategoriName = dataKategori.nama;
          return;
        }
      });
    });
    setTransaksi(transaksi);
  }

  useEffect(() => {
    getTransactions(kegiatanId);
  }, []);
  if (transaksi.length == 0) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>DASHBOARD PAGE</h1>
      <TableDashboard transaksi={transaksi} />
    </div>
  );
};

export default DashboardPage;
