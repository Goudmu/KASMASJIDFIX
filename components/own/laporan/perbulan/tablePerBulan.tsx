"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
  TableFooter,
} from "@/components/ui/table";
import { KategoriType, TransactionType } from "@/lib/mongodb/models";
import React, { useEffect, useState } from "react";
import {
  capitalizeFirstLetter,
  commafy,
  getMonthsArray,
  getYearsArray,
  thisMonth,
  thisYear,
} from "@/lib/utils";
import CardOwn from "../../dashboard/card/card";
import { kegiatanIDStore } from "@/app/store/zustand";

export default function TablePerBulan() {
  const [transaksi, setTransaksi] = useState<TransactionType[]>([]);
  const [monthFilter, setMonthFilter] = useState(getMonthsArray());
  const [yearFilter, setYearFilter] = useState(getYearsArray());
  const [selectedMonth, setSelectedMonth] = useState(thisMonth());
  const [selectedYear, setSelectedYear] = useState(thisYear());
  const [saldoAwal, setSaldoAwal] = useState(0);
  const [penerimaanBulanIni, setpenerimaanBulanIni] = useState(0);
  const [pengeluaranBulanIni, setpengeluaranBulanIni] = useState(0);
  // GET KEGIATAN ID
  const kegiatanId = kegiatanIDStore((state: any) => state.kegiatanID);

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
  };

  useEffect(() => {
    getTransaksiData();
    saldoAwalHandler({ month: selectedMonth.id, year: selectedYear.id });
  }, [transaksi]);

  const saldoAwalHandler = ({ month, year }: any) => {
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
    setSelectedMonth(monthFilter.filter((data) => data.id == id)[0]);

    // ATUR SALDO AWAL
    saldoAwalHandler({ month: id, year: selectedYear.id });
  };
  const yearFilterHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const id = parseInt(target.id);
    setSelectedYear(yearFilter.filter((data) => data.id == id)[0]);

    // ATUR SALDO AWAL
    saldoAwalHandler({ month: selectedMonth.id, year: id });
  };

  return (
    <div className=" flex flex-col gap-3 mb-10">
      {/* TABLE AND FILTER */}
      <div className="border rounded-lg">
        <div className="flex items-center justify-between bg-white  p-4">
          <div className="flex items-center gap-2">
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
        <Table className=" bg-white">
          <TableHeader>
            <TableRow>
              <TableHead className=" w-[10%]">Date</TableHead>
              <TableHead className=" w-[50%]">Description</TableHead>
              <TableHead className=" w-[10%]">Penerimaan</TableHead>
              <TableHead className=" w-[10%]">Pengeluaran</TableHead>
              <TableHead className=" w-[10%]">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={4} className=" py-1">
                Saldo Awal Bulan Ini
              </TableCell>
              <TableCell className=" py-1">Rp{commafy(saldoAwal)}</TableCell>
            </TableRow>
            {/* PENERIMAAN */}
            <TableRow>
              <TableCell colSpan={5} className=" py-1">
                Penerimaan
              </TableCell>
            </TableRow>
            {transaksi &&
              transaksi.map((data, index) => {
                // CHANGE DATE TO LOCAL DATE
                const newDates = new Date(data.date);
                const formattedDate = newDates.toLocaleDateString("en-GB");

                // MONTH AND YEAR FILTER
                if (
                  newDates.getMonth() == selectedMonth.id &&
                  newDates.getFullYear() == selectedYear.id &&
                  data.tipe == "penerimaan"
                ) {
                  return (
                    <TableRow key={index}>
                      <TableCell className=" py-1">{formattedDate}</TableCell>
                      <TableCell className=" py-1">{data.desc}</TableCell>
                      <TableCell className=" py-1">
                        Rp{commafy(data.amount)}
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
            {/* PENGELUARAN */}
            <TableRow>
              <TableCell colSpan={4} className=" py-1">
                Pengeluaran
              </TableCell>
            </TableRow>
            {transaksi &&
              transaksi.map((data, index) => {
                // CHANGE DATE TO LOCAL DATE
                const newDates = new Date(data.date);
                const formattedDate = newDates.toLocaleDateString("en-GB");

                // MONTH AND YEAR FILTER
                if (
                  newDates.getMonth() == selectedMonth.id &&
                  newDates.getFullYear() == selectedYear.id &&
                  data.tipe == "pengeluaran"
                ) {
                  return (
                    <TableRow key={index}>
                      <TableCell className=" py-1">{formattedDate}</TableCell>
                      <TableCell className=" py-1" colSpan={2}>
                        {data.desc}
                      </TableCell>
                      <TableCell className=" py-1">
                        Rp{commafy(data.amount)}
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
          </TableBody>
          <TableFooter className=" bg-white">
            <TableRow>
              <TableCell colSpan={2} className=" py-1">
                Total
              </TableCell>
              <TableCell className=" py-1">
                Rp{commafy(penerimaanBulanIni)}
              </TableCell>
              <TableCell className=" py-1">
                Rp{commafy(pengeluaranBulanIni)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} className=" py-1">
                Saldo Akhir Bulan Ini
              </TableCell>
              <TableCell className=" py-1">
                Rp
                {commafy(saldoAwal + penerimaanBulanIni + pengeluaranBulanIni)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function ChevronDownIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
