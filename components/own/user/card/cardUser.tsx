"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { roleUserUtils } from "@/lib/utils";
import { toast } from "react-toastify";
import LoadingComponent from "../../loading/loading";

interface User {
  id?: string | null;
  username?: string | null;
  email?: string | null;
  role?: number | null;
  password?: string | null;
  image?: string | null;
}

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

const CardUser = ({ trigger, settrigger }: any) => {
  const [isShow, setisShow] = useState(false);
  const [dataUser, setdataUser] = useState<User | undefined>(undefined);
  const { data: session, update: sessionUpdate } = useSession();

  useEffect(() => {
    setdataUser(session?.user);
  }, [session]);

  const passwordVisibleHandler = () => {
    setisShow(!isShow);
  };

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    // Handle form event
    const formEvent = e as React.FormEvent<HTMLInputElement>;
    setdataUser({
      ...dataUser,
      [formEvent.currentTarget.id]: formEvent.currentTarget.value,
    });
  };

  const roleChangeHandler = (role: string) => {
    const roleId = roleUserUtilsChange(role);
    setdataUser({
      ...dataUser,
      ["role"]: roleId,
    });
  };

  const updateHandler = async () => {
    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        body: JSON.stringify({
          username: dataUser?.username,
          email: dataUser?.email,
          password: dataUser?.password,
          role: dataUser?.role,
          _id: dataUser?.id,
        }),
      });
      if (res.ok) {
        toast.success("Akun Berhasil Diedit");
        sessionUpdate({
          ...session,
          user: {
            ...session?.user,
            username: dataUser?.username,
            role: dataUser?.role,
            email: dataUser?.email,
            password: dataUser?.password,
          },
        });
        settrigger(!trigger);
      }
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  };

  if (dataUser == undefined || dataUser == null) {
    return (
      <div>
        <LoadingComponent />
      </div>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your account details</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            defaultValue={dataUser.username ?? ""}
            onChange={changeHandler}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            defaultValue={dataUser.email ?? ""}
            onChange={changeHandler}
          />
        </div>
        <div className="grid gap-2">
          <div className="relative space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type={isShow ? "text" : "password"}
              required
              defaultValue={dataUser.password ?? ""}
              onChange={changeHandler}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-1 right-1 h-7 w-7"
              onClick={passwordVisibleHandler}
            >
              <EyeIcon className="h-4 w-4" />
              <span className="sr-only">Toggle password visibility</span>
            </Button>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="role">Role</Label>
          <Select
            defaultValue={roleUserUtils(dataUser.role ?? 0)}
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
      </CardContent>
      <CardFooter>
        <Button onClick={updateHandler}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
};

export default CardUser;

function EyeIcon(props: any) {
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
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
