import { User2 } from "@/lib/mongodb/models";
import { connectToDB } from "@/lib/mongodb/utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { username } = await req.json();
    const user = await User2.findOne({ username });
    return NextResponse.json({ user });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
