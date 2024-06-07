"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  BukuKasType,
  KategoriType,
  SignatureType,
  TransactionType,
} from "@/lib/mongodb/models";
import React, { useEffect, useState } from "react";
import {
  capitalizeFirstLetter,
  getMonthsArray,
  getYearsArray,
  thisMonth,
  thisMonthFull,
  thisYear,
} from "@/lib/utils";
import { kegiatanIDStore } from "@/app/store/zustand";
import LaporanPerBulanTable from "./table";
import SkeletonTableComponent from "../../skeleton/skeletonTable";
import { CalendarIcon, ChevronDownIcon } from "@/lib/icon/icon";

export default function TablePerBulan() {
  const [transaksi, setTransaksi] = useState<TransactionType[]>([]);
  const [signature, setSignature] = useState<SignatureType[][]>([]);
  const [monthFilter, setMonthFilter] = useState(getMonthsArray());
  const [yearFilter, setYearFilter] = useState(getYearsArray());
  const [selectedMonth, setSelectedMonth] = useState(thisMonth());
  const [selectedYear, setSelectedYear] = useState(thisYear());
  const [saldoAwal, setSaldoAwal] = useState(0);
  const [penerimaanBulanIni, setpenerimaanBulanIni] = useState(0);
  const [pengeluaranBulanIni, setpengeluaranBulanIni] = useState(0);
  // GET KEGIATAN ID
  const kegiatanId = kegiatanIDStore((state: any) => state.kegiatanID);
  // TITLE
  const [kegiatan, setKegiatan] = useState<BukuKasType>();
  const [title, settitle] = useState("");

  const getTransaksiData = async () => {
    const res = await fetch(`/api/transaksi/perKegiatan?id=${kegiatanId}`, {
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
    setTransaksi(transaksi);
    setKegiatan(kegiatan);
    settitle(
      `Laporan Keuangan Kegiatan ${capitalizeFirstLetter(
        kegiatan.name
      )} Periode ${selectedMonth.name} tahun ${selectedYear.id}`
    );
    saldoAwalHandler({
      month: selectedMonth.id,
      year: selectedYear.id,
      transaksi: transaksi,
    });
  };

  const getSignatureData = async () => {
    const res = await fetch("/api/signature", {
      cache: "no-store",
    });
    const { signature } = await res.json();
    const chunkedArray = [];
    for (let i = 0; i < signature.length; i += 2) {
      chunkedArray.push(signature.slice(i, i + 2));
    }
    setSignature(chunkedArray);
  };

  useEffect(() => {
    getTransaksiData();
    getSignatureData();
  }, []);

  const saldoAwalHandler = ({ month, year, transaksi }: any) => {
    let saldoAwalBaru = 0;
    let thisMonthRevenue = 0;
    let thisMonthExpenses = 0;
    let allTransaksiBeforeThisMonthandYear = transaksi.filter(
      (data: TransactionType) => {
        const newDateTransaksi = new Date(data.date);
        if (
          newDateTransaksi.getMonth() < month &&
          newDateTransaksi.getFullYear() <= year
        ) {
          return data;
        }
      }
    );
    let allTransaksiThisMonth = transaksi.filter((data: TransactionType) => {
      const newDateTransaksi = new Date(data.date);
      if (
        newDateTransaksi.getMonth() == month &&
        newDateTransaksi.getFullYear() == year
      ) {
        return data;
      }
    });
    // SALDO AWAL
    allTransaksiBeforeThisMonthandYear.map((datas: any) => {
      if (datas.tipe == "penerimaan") {
        saldoAwalBaru += datas.amount;
      }
      if (datas.tipe == "pengeluaran") {
        saldoAwalBaru -= datas.amount;
      }
    });
    // PENERIMAAN DAN PENGELUARAN BULAN INI
    allTransaksiThisMonth.map((datas: any) => {
      if (datas.tipe == "penerimaan") {
        thisMonthRevenue += datas.amount;
      }
      if (datas.tipe == "pengeluaran") {
        thisMonthExpenses -= datas.amount;
      }
    });

    setpenerimaanBulanIni(thisMonthRevenue);
    setpengeluaranBulanIni(thisMonthExpenses);
    setSaldoAwal(saldoAwalBaru);
  };

  const monthFilterHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const id = parseInt(target.id);
    const newMonth = monthFilter.filter((data) => data.id == id)[0];
    setSelectedMonth(newMonth);

    // ATUR SALDO AWAL
    saldoAwalHandler({
      month: id,
      year: selectedYear.id,
      transaksi: transaksi,
    });
    settitle(
      `Laporan Keuangan Kegiatan ${capitalizeFirstLetter(
        kegiatan?.name
      )}Periode ${newMonth.name} tahun ${selectedYear.id}`
    );
  };
  const yearFilterHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const id = parseInt(target.id);
    const newYear = yearFilter.filter((data) => data.id == id)[0];
    setSelectedYear(newYear);

    // ATUR SALDO AWAL
    saldoAwalHandler({
      month: selectedMonth.id,
      year: id,
      transaksi: transaksi,
    });
    settitle(
      `Laporan Keuangan Kegiatan ${capitalizeFirstLetter(
        kegiatan?.name
      )} Periode ${selectedMonth.name} tahun ${newYear.name}`
    );
  };
  const exportHandler = (e: any) => {
    e.preventDefault();
    let myDiv = document.getElementById("mainpdf")?.innerHTML;
    let oldPage = document.body.innerHTML;
    document.body.innerHTML =
      "<html><head><title></title></head><body>" + myDiv + "</body>";

    // Print the content
    window.print();

    // Restore the original content
    document.body.innerHTML = oldPage;

    // Reload the page after a short delay to ensure the print dialog has closed
    setTimeout(() => {
      location.reload();
    }, 100); // Adjust the delay as needed
  };

  if (transaksi.length == 0 || signature.length == 0) {
    return (
      <div className=" flex flex-col gap-5">
        <div className="flex items-center justify-between bg-white  p-4">
          <div className="flex items-center gap-2">
            <Button onClick={exportHandler} type="submit">
              Export PDF
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-1" variant="outline">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Filter by month</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]">
                <DropdownMenuLabel>Select month</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={selectedMonth.id.toString()}>
                  {monthFilter &&
                    monthFilter.map((data) => {
                      // CHANGE DATA.ID TO STRING FOR DropdownMenuRadioItem value
                      const valueString = data.id.toString();
                      return (
                        <DropdownMenuRadioItem
                          value={valueString}
                          key={data.id}
                          id={valueString}
                          onClick={monthFilterHandler}
                        >
                          {data.name}
                        </DropdownMenuRadioItem>
                      );
                    })}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-1" variant="outline">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Filter by year</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]">
                <DropdownMenuLabel>Select year</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={selectedYear.id.toString()}>
                  {yearFilter &&
                    yearFilter.map((data) => {
                      // CHANGE DATA.ID TO STRING FOR DropdownMenuRadioItem value
                      const valueString = data.id.toString();
                      return (
                        <DropdownMenuRadioItem
                          id={valueString}
                          value={valueString}
                          key={data.id}
                          onClick={yearFilterHandler}
                        >
                          {data.name}
                        </DropdownMenuRadioItem>
                      );
                    })}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <SkeletonTableComponent
          count={[
            { cellWidth: "w-[10%]" },
            { cellWidth: "w-[50%]" },
            { cellWidth: "w-[10%]" },
            { cellWidth: "w-[10%]" },
            { cellWidth: "w-[10%]" },
          ]}
        />
      </div>
    );
  }

  return (
    <div className=" flex flex-col gap-3 mb-10">
      {/* TABLE */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between bg-white  p-4">
          <div className="flex items-center gap-2">
            <Button onClick={exportHandler} type="submit">
              Export PDF
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-1" variant="outline">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Filter by month</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]">
                <DropdownMenuLabel>Select month</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={selectedMonth.id.toString()}>
                  {monthFilter &&
                    monthFilter.map((data) => {
                      // CHANGE DATA.ID TO STRING FOR DropdownMenuRadioItem value
                      const valueString = data.id.toString();
                      return (
                        <DropdownMenuRadioItem
                          value={valueString}
                          key={data.id}
                          id={valueString}
                          onClick={monthFilterHandler}
                        >
                          {data.name}
                        </DropdownMenuRadioItem>
                      );
                    })}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-1" variant="outline">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Filter by year</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]">
                <DropdownMenuLabel>Select year</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={selectedYear.id.toString()}>
                  {yearFilter &&
                    yearFilter.map((data) => {
                      // CHANGE DATA.ID TO STRING FOR DropdownMenuRadioItem value
                      const valueString = data.id.toString();
                      return (
                        <DropdownMenuRadioItem
                          id={valueString}
                          value={valueString}
                          key={data.id}
                          onClick={yearFilterHandler}
                        >
                          {data.name}
                        </DropdownMenuRadioItem>
                      );
                    })}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <LaporanPerBulanTable
          transaksi={transaksi}
          saldoAwal={saldoAwal}
          penerimaanBulanIni={penerimaanBulanIni}
          pengeluaranBulanIni={pengeluaranBulanIni}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          signature={signature}
          title={title}
        />
      </div>
    </div>
  );
}
