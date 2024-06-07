"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { AlertDialogAction, AlertDialogCancel } from "../../../ui/alert-dialog";
import { toast } from "react-toastify";
import { userIDStore } from "@/app/store/zustand";
import { Switch } from "@/components/ui/switch";

export default function ComponentBukuKas({
  tipe,
  dataBukuKas,
  trigger,
  setTrigger,
}: any) {
  const [formData, setFormData] = useState(
    tipe == "edit"
      ? {
          _id: dataBukuKas._id,
          desc: dataBukuKas.desc,
          name: dataBukuKas.name,
          reportVisibilityCode: dataBukuKas.reportVisibilityCode,
          statusId: dataBukuKas.statusId,
          userId: userIDStore((state: any) => state.userID),
        }
      : {
          desc: "",
          name: "",
          userId: userIDStore((state: any) => state.userID),
        }
  );
  const userId = userIDStore((state: any) => state.userID);

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const formEvent = e as React.FormEvent<HTMLInputElement>;
    const target = formEvent.currentTarget as HTMLInputElement;
    setFormData({
      ...formData,
      [target.id]: target.value,
    });
  };

  const switchHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetId = e.currentTarget.id;
    setFormData({
      ...formData,
      [targetId]:
        targetId == "statusId"
          ? !formData.statusId
          : !formData.reportVisibilityCode,
    });
  };

  const submitHandler = async (e: any) => {
    // EDIT Buku Kas
    if (tipe == "edit") {
      const res = await fetch("/api/bukukas", {
        method: "PUT",
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Buku Kas Berhasil diedit");
        setTrigger(!trigger);
      }
    } else {
      // ADD Buku Kas
      const res = await fetch("/api/bukukas", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Buku Kas Berhasil ditambahkan");
        setTrigger(!trigger);
      }
    }
    setFormData({
      desc: "",
      name: "",
      userId: userId,
    });
  };

  return (
    <div className="space-y-8 w-full">
      <div className="space-y-4">
        <div className="space-y-2"></div>
        <div className="space-y-2">
          <Label htmlFor="name">Nama</Label>
          <Input
            id="name"
            placeholder="Masukkan Nama..."
            value={formData.name}
            onChange={changeHandler}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="desc">Desc</Label>
          <Input
            id="desc"
            placeholder="Masukkan Deskripsi..."
            value={formData.desc}
            onChange={changeHandler}
          />
        </div>
        {tipe == "edit" ? (
          <div className="flex items-center justify-between">
            <Label htmlFor="statusId" className="flex items-center gap-2">
              Status
              <Switch
                id="statusId"
                aria-label="Project statusId"
                onClick={switchHandler}
                checked={formData.statusId}
              />
            </Label>
            <Label
              htmlFor="reportVisibilityCode"
              className="flex items-center gap-2"
            >
              Visibility
              <Switch
                id="reportVisibilityCode"
                aria-label="Project reportVisibilityCode"
                onClick={switchHandler}
                checked={formData.reportVisibilityCode}
              />
            </Label>
          </div>
        ) : (
          <></>
        )}
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
