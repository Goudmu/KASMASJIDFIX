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
  capitalizeFirstLetter,
  chunkArray,
  commafy,
  getMonthsArray,
  getYearsArray,
  thisMonth,
  thisMonthFull,
  thisYear,
} from "@/lib/utils";
import { kegiatanIDStore } from "@/app/store/zustand";
// PDF
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "jspdf-autotable";

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
  // TITLE
  const [title, settitle] = useState(
    `Laporan Keuangan Per Bulan ${thisMonthFull().name} Masjid Agung Gamping`
  );
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
    setSelectedMonth(monthFilter.filter((data) => data.id == id)[0]);

    // ATUR SALDO AWAL
    saldoAwalHandler({
      month: id,
      year: selectedYear.id,
      transaksi: transaksi,
    });
  };
  const yearFilterHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const id = parseInt(target.id);
    setSelectedYear(yearFilter.filter((data) => data.id == id)[0]);

    // ATUR SALDO AWAL
    saldoAwalHandler({
      month: selectedMonth.id,
      year: id,
      transaksi: transaksi,
    });
  };
  const exportPdfHandler = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    autoTable(doc, {
      // styles: { fillColor: [255, 255, 255] },
      html: "#table",
      theme: "grid",
      margin: { top: 30, left: 10, right: 10, bottom: 30 },
      headStyles: {
        fillColor: [255, 255, 255], // Black color for header background
        textColor: [30, 30, 30], // White color for header text
        lineWidth: 0.5, // Add border for header
        lineColor: [0, 0, 0], // Black color for header border
      },
      bodyStyles: {
        fillColor: [255, 255, 255], // White color for body background
        textColor: [30, 30, 30], // Black color for body text
        lineWidth: 0.5, // Add border for body
        lineColor: [0, 0, 0], // Black color for body border
      },
      footStyles: {
        fillColor: [255, 255, 255], // White color for footer background
        textColor: [30, 30, 30], // Black color for footer text
        lineWidth: 0.5, // Add border for footer
        lineColor: [0, 0, 0], // Black color for footer border
      },
      willDrawPage: function (data) {
        // Header
        doc.setFontSize(20);
        doc.setTextColor(40);
        doc.text(title, 10, 10);
      },
    });
    autoTable(doc, {
      // styles: { fillColor: [255, 255, 255] },
      html: "#tablesignature",
      theme: "grid",
      margin: { top: 5, left: 10, right: 10, bottom: 30 },
      styles: {
        halign: "center", // horizontal align center
      },
      columnStyles: {
        0: { halign: "center" }, // optional, if you want to center only specific columns
        1: { halign: "center" },
      },
      headStyles: {
        fillColor: [255, 255, 255], // Black color for header background
        textColor: [30, 30, 30], // White color for header text
        halign: "center",
      },
      bodyStyles: {
        fillColor: [255, 255, 255], // White color for body background
        textColor: [30, 30, 30], // Black color for body text
        lineWidth: 0, // Add border for body
        lineColor: [255, 255, 255], // Black color for body border
      },
      footStyles: {
        fillColor: [255, 255, 255], // White color for footer background
        textColor: [30, 30, 30], // Black color for footer text
      },
      willDrawPage: function (data) {
        // Header
        doc.setFontSize(20);
        doc.setTextColor(40);
        doc.text(title, 10, 10);
      },
    });

    doc.save("table.pdf");
  };

  return (
    <div className=" flex flex-col gap-3 mb-10">
      {/* TABLE AND FILTER */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between bg-white  p-4">
          <div className="flex items-center gap-2">
            <Button onClick={exportPdfHandler}>Export To Pdf</Button>
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
        <div className="bg-white">
          <Table className=" border rounded-md" id="table">
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
                <TableCell colSpan={5} className=" py-1">
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
                        <TableCell className=" py-1">{data.desc}</TableCell>
                        <TableCell></TableCell>
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
                  {commafy(
                    saldoAwal + penerimaanBulanIni + pengeluaranBulanIni
                  )}
                </TableCell>
              </TableRow>

              {/* {signature &&
                signature
                  .reduce((acc, data, index, array) => {
                    if (index % 2 === 0) {
                      acc.push(array.slice(index, index + 2));
                    }
                    return acc;
                  }, [] as SignatureType[][])
                  .map((pair, idx) => (
                    <TableRow key={idx}>
                      {pair.map((data) => (
                        <TableCell
                          key={data._id}
                          className="py-2 text-center"
                          colSpan={2}
                        >
                          <div>
                            <div>{data.role}</div>
                            <div className="flex items-center justify-center">
                              <img src={data.signature} alt="Signature" />
                            </div>
                            <div>{capitalizeFirstLetter(data.name)}</div>
                          </div>
                        </TableCell>
                      ))}
                      {pair.length === 1 && (
                        <TableCell className="py-2 text-center" />
                      )}{" "}
                    </TableRow>
                  ))} */}
            </TableFooter>
          </Table>
          {/* SIGNATURE */}
          <Table id="tablesignature">
            <TableBody>
              {signature &&
                signature.map((data, index) => {
                  return (
                    <TableRow key={index}>
                      {data.map((data2, index2) => {
                        return (
                          <TableCell className=" text-center" key={index2}>
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
        </div>
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
