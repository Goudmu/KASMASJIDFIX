import { User2 } from "@/lib/mongodb/models";
import { connectToDB } from "@/lib/mongodb/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDB();
    const user = await User2.find();
    return NextResponse.json({ user });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { username, email, password, role } = await req.json();
    const createUser = await User2.create({
      username,
      email,
      password,
      role,
    });
    return NextResponse.json({ message: "Akun Berhasil Ditambahkan" });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { username, email, password, role, _id, isActive } = await req.json();
    const createUser = await User2.findByIdAndUpdate(
      { _id },
      {
        username,
        email,
        password,
        role,
        isActive,
      }
    );
    return NextResponse.json({ message: "Akun Berhasil Ditambahkan" });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { _id } = await req.json();
    const createUser = await User2.findByIdAndDelete({ _id });
    return NextResponse.json({ message: "Akun Berhasil Dihapus" });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
