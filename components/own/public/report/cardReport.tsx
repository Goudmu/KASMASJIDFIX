"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  capitalizeFirstLetter,
  commafy,
  thisMonth,
  thisYear,
} from "@/lib/utils";
import React from "react";

const CardReport = ({
  saldoAwal = 0,
  totalPenerimaan = 0,
  totalPengeluaran = 0,
  saldoAkhir = 0,
  title = "",
}: any) => {
  return (
    <Card>
      <CardHeader>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{capitalizeFirstLetter(title)}</CardTitle>
            <span>{thisMonth().name + " " + thisYear().name}</span>
          </div>
        </CardHeader>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Saldo Awal</p>
            <p className="text-2xl font-bold">
              Rp{commafy(saldoAwal.toString())}
            </p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Total Penerimaan</p>
            <p className="text-2xl font-bold">
              Rp{commafy(totalPenerimaan.toString())}
            </p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">
              Total Pengeluaran
            </p>
            <p className="text-2xl font-bold">
              Rp{commafy(totalPengeluaran.toString())}
            </p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Saldo Akhir</p>
            <p className="text-2xl font-bold">
              Rp{commafy(saldoAkhir.toString())}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardReport;
