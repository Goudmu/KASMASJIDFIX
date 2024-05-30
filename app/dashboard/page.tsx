import TableDashboard from "@/components/own/dashboard/table";
import { TransactionType } from "@/lib/mongodb/models";
import React from "react";

async function getTransactions(searchParams: any): Promise<TransactionType[]> {
  const res = await fetch(
    `http://localhost:3000/api/transaksi/perKegiatan?id=${searchParams.id}`,
    {
      cache: "no-store",
    }
  );
  const { transaksi } = await res.json();
  return transaksi;
}

const DashboardPage = async ({ searchParams }: any) => {
  const transaksi = await getTransactions(searchParams);
  return (
    <div>
      <h1>DASHBOARD PAGE</h1>
      <TableDashboard transaksi={transaksi} />
    </div>
  );
};

export default DashboardPage;
