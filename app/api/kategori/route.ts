import { Kategori2 } from "@/lib/mongodb/models";
import { connectToDB } from "@/lib/mongodb/utils";
import { NextResponse } from "next/server";

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
