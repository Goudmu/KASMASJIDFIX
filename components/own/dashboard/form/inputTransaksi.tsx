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
import ComponentTransaction from "./transaksiForm";
import { PencilIcon } from "@/lib/icon/icon";

const InputTransaksi = ({
  kegiatanId,
  tipe,
  dataTransaksi,
  category,
  userId,
  triggerGetNewTransaksi,
  settriggerGetNewTransaksi,
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
            <Button variant="link" size="xs">
              <PencilIcon className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
          ) : (
            <Button>Input {capitalizeFirstLetter(tipe)} Kas</Button>
          )}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Transaksi</AlertDialogTitle>
            <AlertDialogDescription>
              Aksi ini akan {tipe == "edit" ? "mengedit" : "menambah"}{" "}
              transakasi
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <div className=" flex flex-col gap-5 w-full">
              <div>
                <ComponentTransaction
                  kegiatanId={kegiatanId}
                  tipe={tipe}
                  dataTransaksi={dataTransaksi}
                  category={category}
                  userId={userId}
                  triggerGetNewTransaksi={triggerGetNewTransaksi}
                  settriggerGetNewTransaksi={settriggerGetNewTransaksi}
                />
              </div>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default InputTransaksi;
