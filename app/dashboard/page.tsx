"use client";
import TableDashboard from "@/components/own/dashboard/table";
import { TransactionType } from "@/lib/mongodb/models";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const DashboardPage = () => {
  const [transaksi, setTransaksi] = useState<TransactionType[]>([]);
  const kegiatanId = useSearchParams().getAll("id")[0];

  async function getTransactions(searchParams: any) {
    const res = await fetch(
      `http://localhost:3000/api/transaksi/perKegiatan?id=${searchParams}`,
      {
        cache: "no-store",
      }
    );
    const { transaksi } = await res.json();
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
