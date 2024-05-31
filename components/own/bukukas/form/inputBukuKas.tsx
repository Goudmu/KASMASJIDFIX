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
import ComponentBukuKas from "./bukuKasForm";

const InputBukuKas = ({
  tipe,
  dataBukuKas,
  userId,
  trigger,
  setTrigger,
}: any) => {
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
              {capitalizeFirstLetter(tipe)} Buku Kas
            </span>
          ) : (
            <Button>Input {capitalizeFirstLetter(tipe)} Buku Kas</Button>
          )}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Transaksi</AlertDialogTitle>
            <AlertDialogDescription>
              Aksi ini akan {tipe == "edit" ? "mengedit" : "menambah"} Buku Kas
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <div className=" flex flex-col gap-5 w-full">
              <div>
                <ComponentBukuKas
                  tipe={tipe}
                  dataBukuKas={dataBukuKas}
                  userId={userId}
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

export default InputBukuKas;
