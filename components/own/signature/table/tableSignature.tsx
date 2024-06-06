"use client";

import React from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { SignatureType } from "@/lib/mongodb/models";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import AlertDelete from "../../alertDelete";
import InputSignature from "../form/inputSignature";

export default function TableSignature({
  signature,
  setTrigger,
  trigger,
}: {
  signature: SignatureType[];
  setTrigger: any;
  trigger: any;
}) {
  const deleteHandler = async (e: React.MouseEvent<HTMLDivElement>) => {
    try {
      const res = await fetch("/api/signature", {
        method: "DELETE",
        body: JSON.stringify({
          _id: e.currentTarget.id,
        }),
      });
      if (res.ok) {
        toast.success("Tanda Tangan Berhasil Dihapus");
        setTrigger(!trigger);
      }
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[25%] text-center">Name</TableHead>
            <TableHead className="w-[10%] text-center">Role</TableHead>
            <TableHead className="w-[55%] text-center">Tanda Tangan</TableHead>
            <TableHead className="w-[5%]">Edit</TableHead>
            <TableHead className="w-[5%]">Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {signature &&
            signature.map((data, index) => {
              // SEARCH FITUR
              return (
                <TableRow key={index}>
                  <TableCell className=" py-2 text-center">
                    {capitalizeFirstLetter(data.name)}
                  </TableCell>
                  <TableCell className=" py-2 text-center">
                    {data.role}
                  </TableCell>
                  <TableCell className=" py-2">
                    <div className=" flex items-center justify-center">
                      <img src={data.signature} alt="Signature" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <InputSignature
                        tipe={"edit"}
                        setTrigger={setTrigger}
                        trigger={trigger}
                        data={data}
                      />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <AlertDelete deleteFuntion={deleteHandler} id={data._id} />
                    <span className="sr-only">Delete</span>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}
