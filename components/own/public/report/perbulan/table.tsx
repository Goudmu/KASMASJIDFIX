"use client";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
  TableFooter,
} from "@/components/ui/table";
import { SignatureType, TransactionType } from "@/lib/mongodb/models";
import { addPrintShortcut, capitalizeFirstLetter, commafy } from "@/lib/utils";
import { useEffect } from "react";

const LaporanPerBulanTablePublic = ({
  transaksi,
  saldoAwal,
  penerimaanBulanIni,
  pengeluaranBulanIni,
  selectedMonth,
  selectedYear,
  signature,
  title,
}: any) => {
  useEffect(() => {
    addPrintShortcut();
  }, []);
  return (
    <main
      className=" bg-white mt-5 flex flex-col gap-5 rounded-lg"
      id="mainpdf"
    >
      <div className=" flex flex-col items-center justify-center">
        <h1>Masjid Agung Gamping</h1>
        <h2>{title}</h2>
      </div>
      {/* TABLE */}
      <Table className=" border rounded-md" id="table">
        <TableHeader>
          <TableRow>
            <TableHead className=" w-[10%]">Tanggal</TableHead>
            <TableHead className=" w-[50%]">Deskripsi</TableHead>
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
            transaksi.map((data: TransactionType) => {
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
                  <TableRow key={data._id}>
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
            transaksi.map((data: TransactionType) => {
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
                  <TableRow key={data._id}>
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
              {commafy(saldoAwal + penerimaanBulanIni + pengeluaranBulanIni)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      {/* SIGNATURE */}
      <Table id="tablesignature">
        <TableBody>
          {signature &&
            signature.map((data: [SignatureType], index: number) => {
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
  );
};

export default LaporanPerBulanTablePublic;
