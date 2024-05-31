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
            <span className=" cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm w-full">
              {capitalizeFirstLetter(tipe)} Kas
            </span>
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
