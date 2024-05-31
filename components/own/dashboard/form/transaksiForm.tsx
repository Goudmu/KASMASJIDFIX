"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { AlertDialogAction, AlertDialogCancel } from "../../../ui/alert-dialog";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KategoriType } from "@/lib/mongodb/models";

export default function ComponentTransaction({
  kegiatanId,
  tipe,
  dataTransaksi,
  category,
  userId,
  triggerGetNewTransaksi,
  settriggerGetNewTransaksi,
}: any) {
  const [formData, setFormData] = useState(
    tipe == "edit"
      ? {
          _id: dataTransaksi._id,
          desc: dataTransaksi.desc,
          amount: dataTransaksi.amount,
          tipe: dataTransaksi.tipe,
          date: dataTransaksi.date,
          kategoriId: dataTransaksi.kategoriId,
          kegiatanId: kegiatanId,
          userId: userId,
        }
      : {
          desc: "",
          amount: 0,
          tipe: tipe,
          date: new Date(),
          kategoriId: "",
          kegiatanId: kegiatanId,
          userId: userId,
        }
  );
  const [selectedDate, setselectedDate] = React.useState<Date | undefined>(
    dataTransaksi && dataTransaksi.date
  );

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const formEvent = e as React.FormEvent<HTMLInputElement>;
    const target = formEvent.currentTarget as HTMLInputElement;
    setFormData({
      ...formData,
      [target.id]: target.value,
    });
  };

  const submitHandler = async (e: any) => {
    // EDIT TRANSAKSI
    if (tipe == "edit") {
      const res = await fetch("/api/transaksi", {
        method: "PUT",
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Transaksi Berhasil diedit");
        settriggerGetNewTransaksi(!triggerGetNewTransaksi);
      }
    } else {
      // ADD TRANSAKSI
      const res = await fetch("/api/transaksi", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Transaksi Berhasil ditambahkan");
        settriggerGetNewTransaksi(!triggerGetNewTransaksi);
      }
    }
    setFormData({
      desc: "",
      amount: 0,
      tipe: tipe,
      date: new Date(),
      kategoriId: "",
      kegiatanId: kegiatanId,
      userId: userId,
    });
  };

  const categoryHandler = (value: string) => {
    setFormData({
      ...formData,
      ["kategoriId"]: value,
    });
  };

  return (
    <div className="space-y-8 w-full">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className=" w-full flex flex-row gap-5 justify-between">
            {/* TANGGAL */}
            <div>
              <div>
                <Label htmlFor="name">Tanggal</Label>
              </div>
              <div className=" w-full">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? (
                        format(selectedDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setselectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            {/* CATEGORY */}
            <div className=" w-full">
              <div>
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
              </div>
              <div>
                <Select onValueChange={categoryHandler}>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        dataTransaksi
                          ? capitalizeFirstLetter(
                              category.filter(
                                (data: any) =>
                                  data._id == dataTransaksi.kategoriId
                              )[0].nama
                            )
                          : "Select Category..."
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {category &&
                      category.map((data: KategoriType) => {
                        // CEK KATEGORI PENERIMAAN ATAU PENGELUARAN
                        if (tipe == data.tipe) {
                          return (
                            <div key={data._id} id={data._id}>
                              <SelectItem value={data._id}>
                                {capitalizeFirstLetter(data.nama)}
                              </SelectItem>
                            </div>
                          );
                        }
                      })}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="desc">Desc</Label>
          <Input
            id="desc"
            placeholder="Enter your desc"
            value={formData.desc}
            onChange={changeHandler}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Jumlah</Label>
          <Input
            id="amount"
            placeholder="Masukkan Nominal"
            value={formData.amount}
            onChange={changeHandler}
          />
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
