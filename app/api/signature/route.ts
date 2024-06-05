import { Signature } from "@/lib/mongodb/models";
import { connectToDB } from "@/lib/mongodb/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDB();
    const signature = await Signature.find();
    return NextResponse.json({ signature });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { name, role, signature } = await req.json();
    const createSignature = await Signature.create({
      name,
      role,
      signature,
    });
    return NextResponse.json({
      createSignature,
      message: "Tanda Tangan Berhasil Ditambahkan",
    });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { name, role, signature, _id } = await req.json();
    const editSignature = await Signature.findOneAndUpdate(
      { _id },
      {
        name,
        role,
        signature,
      }
    );
    return NextResponse.json({
      message: "Tanda Tangan Berhasil Diedit",
    });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { _id } = await req.json();
    const deleteSignature = await Signature.findByIdAndDelete({
      _id,
    });
    return NextResponse.json({
      message: "Tanda Tangan Berhasil Dihapus",
    });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
