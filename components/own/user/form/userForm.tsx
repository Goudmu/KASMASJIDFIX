"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { AlertDialogAction, AlertDialogCancel } from "../../../ui/alert-dialog";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { roleUserUtils } from "@/lib/utils";

const roleUserUtilsChange = (role: string): number => {
  switch (role) {
    case "user":
      return 0;
    case "admin":
      return 1;
    case "ketua":
      return 2;
    case "sekretaris":
      return 3;
    case "bendehara":
      return 4;
    default:
      return 0;
  }
};

export default function ComponentUser({
  tipe,
  data,
  trigger,
  settrigger,
}: any) {
  const [formData, setFormData] = useState(
    tipe == "edit"
      ? {
          _id: data._id,
          username: data.username,
          email: data.email,
          password: data.password,
          role: data.role,
          isActive: data.isActive,
        }
      : {
          username: "",
          email: "",
          password: "",
          role: 0,
          isActive: true,
        }
  );

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const formEvent = e as React.FormEvent<HTMLInputElement>;
    const target = formEvent.currentTarget as HTMLInputElement;
    setFormData({
      ...formData,
      [target.id]: target.value,
    });
  };
  const roleChangeHandler = (role: string) => {
    const roleId = roleUserUtilsChange(role);
    setFormData({
      ...formData,
      ["role"]: roleId,
    });
  };

  const submitHandler = async (e: any) => {
    // EDIT AKUN
    if (tipe == "edit") {
      const res = await fetch("/api/user", {
        method: "PUT",
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Akun Berhasil diedit");
        settrigger(!trigger);
      }
    } else {
      // ADD AKUN
      const res = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Akun Berhasil ditambahkan");
        settrigger(!trigger);
      }
    }
    setFormData({
      username: "",
      email: "",
      password: "",
      role: 0,
      isActive: true,
    });
  };

  return (
    <div className="space-y-8 w-full">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={changeHandler}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={changeHandler}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={changeHandler}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="role">Role</Label>
          <Select
            defaultValue={
              tipe == "edit" ? roleUserUtils(formData.role) : roleUserUtils(0)
            }
            onValueChange={roleChangeHandler}
          >
            <SelectTrigger id="role">
              <SelectValue placeholder={"Select Role..."} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user" id="0">
                Select Role
              </SelectItem>
              <SelectItem value="admin" id="1">
                Admin
              </SelectItem>
              <SelectItem value="ketua" id="2">
                Ketua
              </SelectItem>
              <SelectItem value="sekretaris" id="3">
                Sekretaris
              </SelectItem>
              <SelectItem value="bendehara" id="4">
                Bendehara
              </SelectItem>
            </SelectContent>
          </Select>
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
