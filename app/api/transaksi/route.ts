import { Transaksi2 } from "@/lib/mongodb/models";
import { connectToDB } from "@/lib/mongodb/utils";
import { NextResponse } from "next/server";

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
