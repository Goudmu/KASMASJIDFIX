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
import { PencilIcon } from "@/lib/icon/icon";

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
            <Button variant="link" size="xs">
              <PencilIcon className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
          ) : (
            <Button>Input {capitalizeFirstLetter(tipe)} Kategori</Button>
          )}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kategori</AlertDialogTitle>
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
