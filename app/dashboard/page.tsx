"use client";
import TableDashboard from "@/components/own/dashboard/table";
import {
  TransactionType,
  KategoriType,
  BukuKasType,
} from "@/lib/mongodb/models";
import React, { useEffect, useState } from "react";
import { kegiatanIDStore, userIDStore } from "../store/zustand";
import InputTransaksi from "@/components/own/dashboard/form/inputTransaksi";
import { capitalizeFirstLetter } from "@/lib/utils";
import LoadingComponent from "@/components/own/loading/loading";

const DashboardPage = () => {
  const [transaksi, setTransaksi] = useState<TransactionType[]>([]);
  const [category, setCategory] = useState<KategoriType[]>([]);
  const [kegiatan, setKegiatan] = useState<BukuKasType>();
  const kegiatanId = kegiatanIDStore((state: any) => state.kegiatanID);
  const userId = userIDStore((state: any) => state.userID);
  const [triggerGetNewTransaksi, settriggerGetNewTransaksi] = useState(false);

  async function getTransactions(searchParams: any) {
    const res = await fetch(`/api/transaksi/perKegiatan?id=${searchParams}`, {
      cache: "no-store",
    });
    const { transaksi, allkategori, kegiatan } = await res.json();
    transaksi.map((dataTransaksi: TransactionType) => {
      allkategori.map((dataKategori: KategoriType) => {
        if (dataTransaksi.kategoriId == dataKategori._id) {
          dataTransaksi.kategoriName = dataKategori.nama;
          return;
        }
      });
    });
    // SORT TRANSACTION BASED ON DATE
    transaksi.sort((a: any, b: any) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    setKegiatan(kegiatan);
    setCategory(allkategori);
    setTransaksi(transaksi);
  }

  useEffect(() => {
    getTransactions(kegiatanId);
  }, []);

  useEffect(() => {
    getTransactions(kegiatanId);
  }, [triggerGetNewTransaksi]);

  if (transaksi.length == 0 || category.length == 0 || kegiatan == null) {
    return (
      <div className=" flex items-center justify-center max-w-[90wh] min-h-[90vh]">
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-[90vw] m-auto">
      {/* NAME AND INPUT TRANSAKSI */}
      <div className=" flex justify-between mt-8">
        <div className=" flex justify-center items-center">
          <h1>Nama Buku Kas : {capitalizeFirstLetter(kegiatan?.name)}</h1>
        </div>
        <div className=" flex gap-5">
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
        </div>
      </div>
      {/* TABLE DASHBOARD */}
      <div>
        <TableDashboard
          transaksi={transaksi}
          kegiatanId={kegiatanId}
          category={category}
          userId={userId}
          triggerGetNewTransaksi={triggerGetNewTransaksi}
          settriggerGetNewTransaksi={settriggerGetNewTransaksi}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
