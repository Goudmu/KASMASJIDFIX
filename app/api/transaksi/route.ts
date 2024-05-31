import { Transaksi2 } from "@/lib/mongodb/models";
import { connectToDB } from "@/lib/mongodb/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDB();
    const transaksi = await Transaksi2.find();
    return NextResponse.json({ transaksi });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { date, amount, tipe, desc, kategoriId, kegiatanId, userId } =
      await req.json();
    const newTransaksi = await Transaksi2.create({
      date,
      amount,
      tipe,
      desc,
      kategoriId,
      kegiatanId,
      userId,
    });
    return NextResponse.json({ message: "Transaksi Berhasil Ditambahkan" });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { _id } = await req.json();
    const deleteTransaksi = await Transaksi2.findByIdAndDelete({ _id });
    return NextResponse.json({ message: "Transaksi Berhasil Dihapus" });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
