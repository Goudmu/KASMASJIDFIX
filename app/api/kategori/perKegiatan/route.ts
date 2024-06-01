import { Kategori2, Kegiatan2 } from "@/lib/mongodb/models";
import { connectToDB } from "@/lib/mongodb/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const kegiatanId = new URLSearchParams(url.searchParams).get("id");
  try {
    await connectToDB();
    const kategori = await Kategori2.find({ kegiatanId });
    const kegiatan = await Kegiatan2.findOne({ _id: kegiatanId });
    return NextResponse.json({ kategori, kegiatan });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
