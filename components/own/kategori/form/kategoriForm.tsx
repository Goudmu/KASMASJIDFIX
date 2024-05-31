"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { AlertDialogAction, AlertDialogCancel } from "../../../ui/alert-dialog";
import { capitalizeFirstLetter } from "@/lib/utils";
import { toast } from "react-toastify";
import { kegiatanIDStore, userIDStore } from "@/app/store/zustand";
import { Checkbox } from "@/components/ui/checkbox";

export default function ComponentKategori({
  tipe,
  dataKategori,
  trigger,
  setTrigger,
}: any) {
  const [formData, setFormData] = useState(
    tipe == "edit"
      ? {
          _id: dataKategori._id,
          nama: dataKategori.nama,
          tipe: dataKategori.tipe,
          kegiatanId: kegiatanIDStore((state: any) => state.kegiatanID),
        }
      : {
          nama: "",
          tipe: "",
          kegiatanId: kegiatanIDStore((state: any) => state.kegiatanID),
        }
  );
  const kegiatanId = kegiatanIDStore((state: any) => state.kegiatanID);

  const changeHandler = (
    e: React.FormEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    if (e.type === "change") {
      // Handle form event
      const formEvent = e as React.FormEvent<HTMLInputElement>;
      setFormData({
        ...formData,
        [formEvent.currentTarget.id]: formEvent.currentTarget.value,
      });
    } else if (e.type === "click") {
      // Handle mouse event
      const mouseEvent = e as React.MouseEvent<HTMLButtonElement>;
      setFormData({
        ...formData,
        ["tipe"]: mouseEvent.currentTarget.id,
      });
    }
  };

  const submitHandler = async (e: any) => {
    // EDIT Buku Kas
    if (tipe == "edit") {
      const res = await fetch("/api/kategori", {
        method: "PUT",
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setTrigger(!trigger);
        toast.success("Buku Kas Berhasil diedit");
      }
    } else {
      // ADD Buku Kas
      const res = await fetch("/api/kategori", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setTrigger(!trigger);
        toast.success("Buku Kas Berhasil ditambahkan");
      }
    }
    setFormData({
      nama: "",
      tipe: "",
      kegiatanId: kegiatanId,
    });
  };

  return (
    <div className="space-y-8 w-full">
      <div className="space-y-4">
        <div className="space-y-2"></div>
        <div className="space-y-2">
          <Label htmlFor="nama">Nama</Label>
          <Input
            id="nama"
            placeholder="Masukkan Nama..."
            value={formData.nama}
            onChange={changeHandler}
          />
        </div>
        <div className="space-y-2">
          <Label>Pilih Tipe</Label>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="penerimaan"
              onClick={changeHandler}
              checked={formData.tipe == "penerimaan"}
            />
            <label
              htmlFor="penerimaan"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Penerimaan
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="pengeluaran"
              onClick={changeHandler}
              checked={formData.tipe == "pengeluaran"}
            />
            <label
              htmlFor="pengeluaran"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Pengeluaran
            </label>
          </div>
        </div>
      </div>
      <div className=" flex justify-between">
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={submitHandler}>
          {tipe == "edit" ? "Edit" : "Input"}
        </AlertDialogAction>
      </div>
    </div>
  );
}
