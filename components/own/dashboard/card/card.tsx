"use client";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { commafy } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const CardOwn = ({ title, data, oneSelectedMonth, tipe }: any) => {
  const [thisMonthRevenue, setthisMonthRevenue] = useState(0);

  useEffect(() => {
    let totalRevenueThisMonth = 0;
    if (tipe != "total") {
      data.map((datas: any) => {
        let monthDatas = new Date(datas.date).getMonth();
        if (monthDatas == oneSelectedMonth.id && datas.tipe == tipe) {
          totalRevenueThisMonth += datas.amount;
        }
      });
    } else {
      data.map((datas: any) => {
        if (datas.tipe == "penerimaan") {
          totalRevenueThisMonth += datas.amount;
        }
        if (datas.tipe == "pengeluaran") {
          totalRevenueThisMonth -= datas.amount;
        }
      });
    }
    setthisMonthRevenue(totalRevenueThisMonth);
  }, [oneSelectedMonth, data]);

  return (
    <div className=" border w-full rounded-md bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div>IDR</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">Rp{commafy(thisMonthRevenue)}</div>
      </CardContent>
    </div>
  );
};

export default CardOwn;
