"use client";

import { Input } from "@/components/ui/input";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { KategoriType } from "@/lib/mongodb/models";
import React, { useState } from "react";
import { capitalizeFirstLetter } from "@/lib/utils";
import { toast } from "react-toastify";
import InputKategori from "../form/inputKategori";
import AlertDelete from "../../alertDelete";

export default function TableKategori({
  kategori,
  setTrigger,
  trigger,
}: {
  kategori: KategoriType[];
  setTrigger: any;
  trigger: any;
}) {
  const [searchInput, setSearchInput] = useState("");
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const deleteKategoriHandler = async (e: React.MouseEvent<HTMLDivElement>) => {
    try {
      const res = await fetch("/api/kategori", {
        method: "DELETE",
        body: JSON.stringify({
          _id: e.currentTarget.id,
        }),
      });
      if (res.ok) {
        setTrigger(!trigger);
        toast.success("Kategori Berhasil Dihapus");
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
            <TableHead className=" w-[5%]">No</TableHead>
            <TableHead className=" w-[25%]">Name</TableHead>
            <TableHead className=" w-[20%] ">Tipe</TableHead>
            <TableHead className=" w-[40%]">Nama Kegiatan</TableHead>
            <TableHead className=" w-[5%] text-center">Edit</TableHead>
            <TableHead className=" w-[5%] text-center">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {kategori &&
            kategori.map((data, index) => {
              // SEARCH FITUR
              if (data.nama.includes(searchInput) || searchInput == "") {
                return (
                  <TableRow key={index}>
                    <TableCell className=" py-2">{index + 1}</TableCell>
                    <TableCell className=" py-2">
                      {capitalizeFirstLetter(data.nama)}
                    </TableCell>
                    <TableCell className=" py-2">
                      <div
                        className={`text-center text-xs md:text-sm border rounded-md py-1 px-2 w-fit  text-black`}
                      >
                        {capitalizeFirstLetter(data.tipe)}
                      </div>
                    </TableCell>
                    <TableCell className=" py-2">
                      {capitalizeFirstLetter(data.kegiatanName)}
                    </TableCell>
                    <TableCell className=" py-1">
                      <InputKategori
                        tipe={"edit"}
                        dataKategori={data}
                        trigger={trigger}
                        setTrigger={setTrigger}
                      />
                    </TableCell>
                    <TableCell className=" py-1">
                      <AlertDelete
                        deleteFuntion={deleteKategoriHandler}
                        id={data._id}
                      />
                    </TableCell>
                  </TableRow>
                );
              }
            })}
        </TableBody>
      </Table>
    </div>
  );
}
