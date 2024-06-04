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
import { roleUserUtils } from "@/lib/utils";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AlertDelete from "../../alertDelete";
import { toast } from "react-toastify";

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

  if (userData == undefined) {
    return <div>Loading...</div>;
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
            <TableHead className="text-right">Actions</TableHead>
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
                      {roleUserUtils(data.role ?? 0)}
                    </TableCell>
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
                    {roleUserUtils(data.role)}
                  </TableCell>
                  <TableCell className="text-right py-1 flex justify-end">
                    <Button variant="ghost" size="icon">
                      <PencilIcon className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
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

function PencilIcon(props: any) {
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
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}
function TrashIcon(props: any) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}