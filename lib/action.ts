import { NextResponse } from "next/server";
import {
  Kategori2,
  KategoriType,
  TransactionType,
  Transaksi2,
} from "./mongodb/models";
import { connectToDB } from "./mongodb/utils";

export const getTransactionThisKegiatan = async ({
  kegiatanId,
}: {
  kegiatanId: any;
}) => {
  try {
    await connectToDB();
    const transaksi = await Transaksi2.find({ kegiatanId: kegiatanId });
    const allkategori = await Kategori2.find();
    transaksi.forEach((data: TransactionType) => {
      allkategori.map((dataKategori: KategoriType) => {
        if (data.kategoriId == dataKategori._id)
          data.kategoriName = dataKategori.nama;
      });
    });
    return NextResponse.json({ transaksi });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
