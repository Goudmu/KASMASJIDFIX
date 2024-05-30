import {
  Kategori2,
  KategoriType,
  TransactionType,
  Transaksi2,
} from "@/lib/mongodb/models";
import { connectToDB } from "@/lib/mongodb/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const kegiatanId = new URLSearchParams(url.searchParams).get("id");
  try {
    await connectToDB();
    const transaksi = await Transaksi2.find({ kegiatanId });
    const allkategori = await Kategori2.find();
    return NextResponse.json({ transaksi, allkategori });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
