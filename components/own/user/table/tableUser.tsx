"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { UserType } from "@/lib/mongodb/models";
import { capitalizeFirstLetter, roleUserUtils } from "@/lib/utils";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AlertDelete from "../../alertDelete";
import { toast } from "react-toastify";
import SkeletonTableComponent from "../../skeleton/skeletonTable";
import InputUser from "../form/inputUser";
import { TrashIcon } from "@/lib/icon/icon";

const TableUser = ({ trigger, settrigger }: any) => {
  const [userData, setUserData] = useState<UserType[] | undefined>([]);
  const { data: session } = useSession();

  const getuserData = async () => {
    const res = await fetch("/api/user", { cache: "no-store" });
    const { user } = await res.json();
    setUserData(user);
  };

  useEffect(() => {
    getuserData();
  }, [trigger]);

  if (userData?.length == 0) {
    return (
      <div className=" flex flex-col gap-5">
        <SkeletonTableComponent
          count={[
            { cellWidth: "w-[25%]" },
            { cellWidth: "w-[10%]" },
            { cellWidth: "w-[55%]" },
            { cellWidth: "w-[5%]" },
            { cellWidth: "w-[5%]" },
          ]}
        />
      </div>
    );
  }

  const deleteHandler = async (e: React.MouseEvent<HTMLDivElement>) => {
    try {
      const res = await fetch("/api/user", {
        method: "DELETE",
        body: JSON.stringify({
          _id: e.currentTarget.id,
        }),
      });
      if (res.ok) {
        toast.success("Akun Berhasil Dihapus");
        settrigger(!trigger);
      }
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  };

  return (
    <SessionProvider>
      <Table className=" bg-white rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="w-[5%]">Edit</TableHead>
            <TableHead className="w-[5%]">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userData &&
            userData.map((data: UserType, index: number) => {
              // CEK AKUN
              if (data.username == session?.user?.username) {
                return (
                  <TableRow key={index}>
                    <TableCell className=" py-1">
                      {data.username + " (it's you)"}
                    </TableCell>
                    <TableCell className=" py-1">{data.email}</TableCell>
                    <TableCell className=" py-1">
                      {capitalizeFirstLetter(roleUserUtils(data.role))}
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-right py-1">
                      <Button variant="ghost" size="icon">
                        <TrashIcon className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }
              return (
                <TableRow key={index}>
                  <TableCell className=" py-1">{data.username}</TableCell>
                  <TableCell className=" py-1">{data.email}</TableCell>
                  <TableCell className=" py-1">
                    {capitalizeFirstLetter(roleUserUtils(data.role))}
                  </TableCell>
                  <TableCell>
                    <InputUser
                      data={data}
                      tipe={"edit"}
                      trigger={trigger}
                      settrigger={settrigger}
                    />
                  </TableCell>
                  <TableCell>
                    <AlertDelete deleteFuntion={deleteHandler} id={data._id} />
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </SessionProvider>
  );
};

export default TableUser;
