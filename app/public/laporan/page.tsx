"use client";
import LoadingComponent from "@/components/own/loading/loading";
import CardReport from "@/components/own/public/report/cardReport";
import { BukuKasType } from "@/lib/mongodb/models";
import React, { useEffect, useState } from "react";

const PublicReportPage = () => {
  const [listBukukas, setlistBukukas] = useState<BukuKasType[]>([]);
  const getData = async () => {
    const res = await fetch("/api/public/laporan", { cache: "no-store" });
    const { BukuKas } = await res.json();
    setlistBukukas(BukuKas);
  };
  useEffect(() => {
    getData();
  }, []);

  if (listBukukas.length == 0) {
    return (
      <div className=" max-w-[90%] min-h-[90vh] m-auto flex items-center justify-center">
        <LoadingComponent />
      </div>
    );
  }
  return (
    <div className=" max-w-[90%] min-h-full m-auto grid grid-cols-3 gap-5 py-5">
      {listBukukas &&
        listBukukas.map((data, index) => {
          return (
            <div key={index}>
              <CardReport
                saldoAwal={data.saldoAwal}
                totalPenerimaan={data.totalPenerimaan}
                totalPengeluaran={data.totalPenngeluaran}
                saldoAkhir={
                  data.saldoAwal + data.totalPenerimaan - data.totalPenngeluaran
                }
                title={data.name}
              />
            </div>
          );
        })}
    </div>
  );
};

export default PublicReportPage;
