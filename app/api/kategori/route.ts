import { Kategori2, TransactionType, Transaksi2 } from "@/lib/mongodb/models";
import { connectToDB } from "@/lib/mongodb/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDB();
    const kategori = await Kategori2.find();
    return NextResponse.json({ kategori });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { nama, tipe, kegiatanId } = await req.json();
    const addkategori = await Kategori2.create({
      nama,
      tipe,
      kegiatanId,
    });
    return NextResponse.json({ addkategori });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
export const PUT = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { nama, tipe, kegiatanId, _id } = await req.json();
    const addkategori = await Kategori2.findByIdAndUpdate(
      { _id },
      {
        nama,
        tipe,
        kegiatanId,
      }
    );
    return NextResponse.json({ addkategori });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { _id } = await req.json();
    const deleteKategori = await Kategori2.findByIdAndDelete({ _id });
    const deleteTransaksi = await Transaksi2.find({ kategoriId: _id });
    deleteTransaksi.map(async (data: TransactionType) => {
      const deleteOneTransaksi = await Transaksi2.findByIdAndDelete({
        _id: data._id,
      });
    });
    return NextResponse.json({ message: "Kategori Berhasil Dihapus" });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
