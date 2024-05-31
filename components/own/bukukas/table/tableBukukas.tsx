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
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Tipe</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Buka Buku Kas</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bukuKas &&
            bukuKas.map((data, index) => {
              // SEARCH FITUR
              if (data.name.includes(searchInput) || searchInput == "") {
                return (
                  <TableRow key={index}>
                    <TableCell className=" py-2">
                      {capitalizeFirstLetter(data.name)}
                    </TableCell>
                    <TableCell className=" py-2">{data.desc}</TableCell>
                    <TableCell className=" py-2">
                      {capitalizeFirstLetter(
                        data.reportVisibilityCode ? "public" : "private"
                      )}
                    </TableCell>
                    <TableCell className=" py-2">
                      {capitalizeFirstLetter(
                        data.statusId ? "aktif" : "non aktif"
                      )}
                    </TableCell>
                    <TableCell className=" py-2">
                      {data._id == kegiatanId ? (
                        <div
                          className={`text-center text-xs md:text-sm border rounded-md py-1 px-2 w-fit  text-black`}
                          id={data._id}
                        >
                          Sedang dibuka
                        </div>
                      ) : (
                        <div
                          className={`text-center text-xs md:text-sm border rounded-md py-1 px-2 w-fit  text-white bg-black cursor-pointer`}
                          onClick={bukaBukuKasHanlder}
                          id={data._id}
                        >
                          Buka Buku Kas
                        </div>
                      )}
                    </TableCell>
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
                            <InputBukuKas
                              tipe={"edit"}
                              kegiatanId={kegiatanId}
                              dataBukuKas={data}
                              setTrigger={setTrigger}
                              trigger={trigger}
                            />
                          </div>
                          <DropdownMenuItem
                            className=" cursor-pointer"
                            onClick={deleteBukukasHandler}
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
