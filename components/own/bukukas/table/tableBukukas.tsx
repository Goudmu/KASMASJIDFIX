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
import { BukuKasType } from "@/lib/mongodb/models";
import React, { useState } from "react";
import { capitalizeFirstLetter, commafy } from "@/lib/utils";
import { kegiatanIDStore } from "@/app/store/zustand";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import InputBukuKas from "../form/inputBukuKas";
import { toast } from "react-toastify";
import AlertDelete from "../../alertDelete";

export default function TableBukukas({
  bukuKas,
  setTrigger,
  trigger,
}: {
  bukuKas: BukuKasType[];
  setTrigger: any;
  trigger: any;
}) {
  const [searchInput, setSearchInput] = useState("");
  const kegiatanId = kegiatanIDStore((state: any) => state.kegiatanID);
  const updateKegiatanId = kegiatanIDStore((state: any) => state.setKegiatanID);
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const bukaBukuKasHanlder = (e: React.MouseEvent<HTMLDivElement>) => {
    updateKegiatanId(e.currentTarget.id);
  };

  const deleteBukukasHandler = async (e: React.MouseEvent<HTMLDivElement>) => {
    try {
      const res = await fetch("/api/bukukas", {
        method: "DELETE",
        body: JSON.stringify({
          _id: e.currentTarget.id,
        }),
      });
      if (res.ok) {
        updateKegiatanId("660bb772285c3316e6c93e8d");
        toast.success("Buku Kas Berhasil Dihapus");
        setTrigger(!trigger);
      }
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  };

  return (
    <div className="overflow-hidden border rounded-lg">
      <Table className=" bg-white ">
        <TableHeader>
          <TableRow>
            <TableHead className=" w-[10%] text-center">Name</TableHead>
            <TableHead className=" text-center">Description</TableHead>
            <TableHead className=" w-[10%] text-center">Tipe</TableHead>
            <TableHead className=" w-[10%] text-center">Status</TableHead>
            <TableHead className=" w-[20%] text-center">
              Buka Buku Kas
            </TableHead>
            <TableHead className=" w-[5%]">Edit</TableHead>
            <TableHead className=" w-[5%] text-center">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bukuKas &&
            bukuKas.map((data, index) => {
              // SEARCH FITUR
              if (data.name.includes(searchInput) || searchInput == "") {
                return (
                  <TableRow key={index}>
                    <TableCell className=" py-2 text-center">
                      {capitalizeFirstLetter(data.name)}
                    </TableCell>
                    <TableCell className=" py-2 text-center">
                      {data.desc}
                    </TableCell>
                    <TableCell className=" py-2 text-center">
                      {capitalizeFirstLetter(
                        data.reportVisibilityCode ? "public" : "private"
                      )}
                    </TableCell>
                    <TableCell className=" py-2 text-center">
                      {capitalizeFirstLetter(
                        data.statusId ? "aktif" : "non aktif"
                      )}
                    </TableCell>
                    <TableCell className=" py-2 items-center">
                      {data._id == kegiatanId ? (
                        <div
                          className={`text-center text-xs md:text-sm border rounded-md py-1 px-2 w-full  text-black`}
                          id={data._id}
                        >
                          Sedang dibuka
                        </div>
                      ) : (
                        <div
                          className={`text-center text-xs md:text-sm border rounded-md py-1 px-2 w-full  text-white bg-black cursor-pointer`}
                          onClick={bukaBukuKasHanlder}
                          id={data._id}
                        >
                          Buka Buku Kas
                        </div>
                      )}
                    </TableCell>
                    <TableCell className=" py-2 flex items-center justify-center">
                      <InputBukuKas
                        tipe={"edit"}
                        kegiatanId={kegiatanId}
                        dataBukuKas={data}
                        setTrigger={setTrigger}
                        trigger={trigger}
                      />
                    </TableCell>
                    <TableCell className=" py-1">
                      <AlertDelete
                        deleteFuntion={deleteBukukasHandler}
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
