import { Kegiatan2, Transaksi2 } from "@/lib/mongodb/models";
import { connectToDB } from "@/lib/mongodb/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const kegiatanId = new URLSearchParams(url.searchParams).get("id");
  try {
    await connectToDB();
    const bukuKas = await Kegiatan2.findById({ _id: kegiatanId });
    const transaksi = await Transaksi2.find({ kegiatanId });
    return NextResponse.json({ bukuKas, transaksi });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
