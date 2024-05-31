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
    <div className="border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4">
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
            {/* <TableHead>Nama Kegiatan</TableHead> */}
            <TableHead>Edit / Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {kategori &&
            kategori.map((data, index) => {
              // SEARCH FITUR
              if (data.nama.includes(searchInput) || searchInput == "") {
                return (
                  <TableRow key={index}>
                    <TableCell className=" py-2">{index}</TableCell>
                    <TableCell className=" py-2">
                      {capitalizeFirstLetter(data.nama)}
                    </TableCell>
                    <TableCell className=" py-2">{data.tipe}</TableCell>
                    {/* <TableCell className=" py-2">
                      {capitalizeFirstLetter(data.kegiatanId.toString())}
                    </TableCell> */}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <div className=" w-full cursor-pointer">
                            <InputKategori
                              tipe={"edit"}
                              dataKategori={data}
                              trigger={trigger}
                              setTrigger={setTrigger}
                            />
                          </div>
                          <DropdownMenuItem
                            className=" cursor-pointer"
                            onClick={deleteKategoriHandler}
                            id={data._id}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function ChevronDownIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
