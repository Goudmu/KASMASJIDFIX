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
import {
  BukuKasType,
  KategoriType,
  SignatureType,
  TransactionType,
} from "@/lib/mongodb/models";
import React, { useEffect, useState } from "react";
import {
  addPrintShortcut,
  capitalizeFirstLetter,
  commafy,
  getMonthsArray,
  getYearsArray,
  thisMonth,
  thisYear,
} from "@/lib/utils";
import { kegiatanIDStore } from "@/app/store/zustand";
import SkeletonTableComponent from "../../skeleton/skeletonTable";
import { CalendarIcon, ChevronDownIcon } from "@/lib/icon/icon";

export default function TablePerKategori() {
  const [transaksi, setTransaksi] = useState<TransactionType[]>([]);
  const [signature, setSignature] = useState<SignatureType[][]>([]);
  const [kategori, setKategori] = useState<KategoriType[]>([]);
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

    // ADDING KATEGORI TOTAL
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
      // Convert category strings to lowercase for case-insensitive sorting
      const categoryA = a.kategoriName.toLowerCase();
      const categoryB = b.kategoriName.toLowerCase();

      // Compare the categories
      if (categoryA < categoryB) {
        return -1;
      }
      if (categoryA > categoryB) {
        return 1;
      }
      // Categories are equal, compare by amount
      return 0;
    });
    allkategori.sort((a: any, b: any) => {
      // Convert category strings to lowercase for case-insensitive sorting
      const categoryA = a.nama.toLowerCase();
      const categoryB = b.nama.toLowerCase();

      // Compare the categories
      if (categoryA < categoryB) {
        return -1;
      }
      if (categoryA > categoryB) {
        return 1;
      }
      // Categories are equal, compare by amount
      return 0;
    });
    setKategori(allkategori);
    setTransaksi(transaksi);
    setKegiatan(kegiatan);
    settitle(
      `Laporan Keuangan Kegiatan ${capitalizeFirstLetter(
        kegiatan?.name
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
    addPrintShortcut();
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
      )} Periode ${newMonth.name} tahun ${selectedYear.id}`
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
          ]}
        />
      </div>
    );
  }
  return (
    <div className=" flex flex-col gap-3 mb-10">
      {/* TABLE AND FILTER */}
      <div className="border rounded-lg">
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
        <main id="mainpdf" className=" bg-white mt-5 flex flex-col gap-5">
          <div className=" flex flex-col items-center justify-center">
            <h1>Masjid Agung Gamping</h1>
            <h2>{title}</h2>
          </div>
          {/* TRANSAKSI PER KATEGORI */}
          <Table className=" border rounded-md bg-white" id="table">
            <TableHeader>
              <TableRow>
                <TableHead className=" w-[10%]">Tanggal</TableHead>
                <TableHead className=" w-[50%]">Deskripsi</TableHead>
                <TableHead className=" w-[10%]">Jumlah</TableHead>
                <TableHead className=" w-[10%]">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={3} className=" py-1">
                  Saldo Awal Bulan Ini
                </TableCell>
                <TableCell className=" py-1">Rp{commafy(saldoAwal)}</TableCell>
              </TableRow>
              {kategori &&
                kategori.map((kategoriData: KategoriType, index: number) => {
                  let thisKategoriTotal = 0;
                  return (
                    <React.Fragment key={index}>
                      <TableRow>
                        <TableCell colSpan={4} className=" py-1 font-bold">
                          {capitalizeFirstLetter(kategoriData.nama)}
                        </TableCell>
                      </TableRow>
                      {transaksi &&
                        transaksi.map((data, index) => {
                          // CHANGE DATE TO LOCAL DATE
                          const newDates = new Date(data.date);
                          const formattedDate =
                            newDates.toLocaleDateString("en-GB");

                          // MONTH AND YEAR FILTER
                          if (
                            newDates.getMonth() == selectedMonth.id &&
                            newDates.getFullYear() == selectedYear.id &&
                            data.kategoriId == kategoriData._id
                          ) {
                            thisKategoriTotal += data.amount;
                            return (
                              <TableRow key={index}>
                                <TableCell className=" py-1">
                                  {formattedDate}
                                </TableCell>
                                <TableCell className=" py-1">
                                  {capitalizeFirstLetter(data.desc)}
                                </TableCell>
                                <TableCell className=" py-1">
                                  Rp{commafy(data.amount)}
                                </TableCell>
                              </TableRow>
                            );
                          }
                        })}
                      <TableRow className=" font-bold">
                        <TableCell colSpan={2} className=" py-1 ">
                          {`Total Saldo ${capitalizeFirstLetter(
                            kategoriData.nama
                          )}`}
                        </TableCell>
                        <TableCell className=" py-1">
                          Rp{commafy(thisKategoriTotal)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={4}></TableCell>
                      </TableRow>
                    </React.Fragment>
                  );
                })}
            </TableBody>
            <TableFooter className=" bg-white">
              <TableRow className=" font-bold">
                <TableCell colSpan={3} className=" py-1">
                  Saldo Akhir Bulan Ini
                </TableCell>
                <TableCell className=" py-1">
                  Rp
                  {commafy(
                    saldoAwal + penerimaanBulanIni + pengeluaranBulanIni
                  )}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          {/* SIGNATURE */}
          <Table id="tablesignature" className="bg-white">
            <TableBody>
              {signature &&
                signature.map((data, index) => {
                  return (
                    <TableRow key={index} className=" border-none">
                      {data &&
                        data.map((data2: SignatureType) => {
                          return (
                            <TableCell className=" text-center" key={data2._id}>
                              <div className=" flex flex-col items-center justify-center">
                                <span>{capitalizeFirstLetter(data2.role)}</span>
                                <div className=" flex items-center justify-center">
                                  <img src={data2.signature} alt="Signature" />
                                </div>
                                <span>{capitalizeFirstLetter(data2.name)}</span>
                              </div>
                            </TableCell>
                          );
                        })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </main>
      </div>
    </div>
  );
}
