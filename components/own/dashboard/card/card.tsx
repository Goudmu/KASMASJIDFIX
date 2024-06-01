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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">Rp{commafy(thisMonthRevenue)}</div>
        {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
      </CardContent>
    </div>
  );
};

export default CardOwn;
