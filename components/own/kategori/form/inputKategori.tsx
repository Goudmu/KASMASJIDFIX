"use client";
import React from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { capitalizeFirstLetter } from "@/lib/utils";
import ComponentKategori from "./kategoriForm";

const InputKategori = ({ tipe, dataKategori, trigger, setTrigger }: any) => {
  return (
    <div
      className={`${
        tipe == "edit" ? "w-full hover:bg-slate-50  rounded-sm" : ""
      }`}
    >
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {tipe == "edit" ? (
            <span className=" cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm w-full">
              {capitalizeFirstLetter(tipe)} Kategori
            </span>
          ) : (
            <Button>Input {capitalizeFirstLetter(tipe)} Kategori</Button>
          )}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Transaksi</AlertDialogTitle>
            <AlertDialogDescription>
              Aksi ini akan {tipe == "edit" ? "mengedit" : "menambah"} Kategori
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <div className=" flex flex-col gap-5 w-full">
              <div>
                <ComponentKategori
                  tipe={tipe}
                  dataKategori={dataKategori}
                  trigger={trigger}
                  setTrigger={setTrigger}
                />
              </div>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default InputKategori;