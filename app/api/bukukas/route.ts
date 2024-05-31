import { Kegiatan2, TransactionType, Transaksi2 } from "@/lib/mongodb/models";
import { connectToDB } from "@/lib/mongodb/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDB();
    const kegiatan = await Kegiatan2.find();
    return NextResponse.json({ kegiatan });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { name, desc, userId } = await req.json();
    const addkegiatan = await Kegiatan2.create({
      name,
      desc,
      userId,
      reportVisibilityCode: true,
      statusId: true,
    });
    return NextResponse.json({ addkegiatan });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { name, desc, userId, reportVisibilityCode, statusId, _id } =
      await req.json();
    const addkegiatan = await Kegiatan2.findByIdAndUpdate(
      { _id },
      {
        name,
        desc,
        userId,
        reportVisibilityCode,
        statusId,
      }
    );
    return NextResponse.json({ addkegiatan });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { _id } = await req.json();
    const deleteKegiatan = await Kegiatan2.findByIdAndDelete({ _id });
    const deleteTransaksi = await Transaksi2.find({ kegiatanId: _id });
    deleteTransaksi.map(async (data: TransactionType) => {
      const deleteOneTransaksi = await Transaksi2.findByIdAndDelete({
        _id: data._id,
      });
    });
    return NextResponse.json({ message: "Buku Kas Berhasil Dihapus" });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
