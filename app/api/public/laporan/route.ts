import { Kegiatan2, Transaksi2 } from "@/lib/mongodb/models";
import { connectToDB } from "@/lib/mongodb/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );
  const startOfMonth2 = new Date(now.getFullYear(), now.getMonth(), 1);
  try {
    await connectToDB();
    const allBukuKas = await Kegiatan2.find({ reportVisibilityCode: true });
    const BukuKas = allBukuKas.map((item) => ({
      _id: item._id,
      name: item.name,
      desc: item.desc,
      saldoAwal: 0,
      totalPenerimaan: 0,
      totalPenngeluaran: 0,
    }));
    const transaksiPerBukukasPerBulanIni = await Transaksi2.find({
      date: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    });
    const transaksiBeforeThisMonth = await Transaksi2.find({
      date: {
        $lt: startOfMonth2,
      },
    });
    BukuKas.map((dataBukuKas) => {
      transaksiPerBukukasPerBulanIni.map((dataTransaksi) => {
        if (dataTransaksi.kegiatanId == dataBukuKas._id) {
          if (dataTransaksi.tipe == "penerimaan") {
            dataBukuKas.totalPenerimaan += dataTransaksi.amount;
          } else {
            dataBukuKas.totalPenngeluaran += dataTransaksi.amount;
          }
        }
      });
      transaksiBeforeThisMonth.map((dataTransaksi) => {
        if (dataTransaksi.kegiatanId == dataBukuKas._id) {
          if (dataTransaksi.tipe == "penerimaan") {
            dataBukuKas.saldoAwal += dataTransaksi.amount;
          } else {
            dataBukuKas.saldoAwal -= dataTransaksi.amount;
          }
        }
      });
    });

    return NextResponse.json({ BukuKas });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
