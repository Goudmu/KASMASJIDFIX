"use client";
import TableDashboard from "@/components/own/dashboard/table";
import { TransactionType, KategoriType } from "@/lib/mongodb/models";
import React, { useEffect, useState } from "react";
import { kegiatanIDStore, userIDStore } from "../store/zustand";
import InputTransaksi from "@/components/own/dashboard/form/inputTransaksi";
import useSWR from "swr";

const DashboardPage = () => {
  const [transaksi, setTransaksi] = useState<TransactionType[]>([]);
  const [category, setCategory] = useState<KategoriType[]>([]);
  const kegiatanId = kegiatanIDStore((state: any) => state.kegiatanID);
  const userId = userIDStore((state: any) => state.userID);
  const [triggerGetNewTransaksi, settriggerGetNewTransaksi] = useState(false);

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
    setCategory(allkategori);
    setTransaksi(transaksi);
  }

  useEffect(() => {
    getTransactions(kegiatanId);
  }, []);

  useEffect(() => {
    getTransactions(kegiatanId);
  }, [triggerGetNewTransaksi]);

  if (transaksi.length == 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>DASHBOARD PAGE</h1>
      <InputTransaksi
        tipe={"penerimaan"}
        kegiatanId={kegiatanId}
        category={category}
        userId={userId}
        triggerGetNewTransaksi={triggerGetNewTransaksi}
        settriggerGetNewTransaksi={settriggerGetNewTransaksi}
      />
      <InputTransaksi
        tipe={"pengeluaran"}
        kegiatanId={kegiatanId}
        category={category}
        userId={userId}
        triggerGetNewTransaksi={triggerGetNewTransaksi}
        settriggerGetNewTransaksi={settriggerGetNewTransaksi}
      />
      <TableDashboard transaksi={transaksi} />
    </div>
  );
};

export default DashboardPage;
