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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Input
            className="max-w-[200px] sm:max-w-[300px]"
            placeholder="Search Buku Kas..."
            type="search"
            id="input"
            onChange={searchHandler}
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Tipe</TableHead>
            <TableHead>Nama Kegiatan</TableHead>
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
                      {capitalizeFirstLetter(data.tipe)}
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
