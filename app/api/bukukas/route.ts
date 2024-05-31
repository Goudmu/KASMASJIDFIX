import { Kegiatan2 } from "@/lib/mongodb/models";
import { connectToDB } from "@/lib/mongodb/utils";
import { NextResponse } from "next/server";

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
