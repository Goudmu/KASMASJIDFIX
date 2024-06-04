"use client";
import { Button } from "@/components/ui/button";
import TableUser from "@/components/own/user/table/tableUser";
import CardUser from "@/components/own/user/card/cardUser";
import UserPageProvider from "@/components/own/user/provider/userPageProvider";
import { useState } from "react";

export default function UserPage() {
  const [trigger, settrigger] = useState(true);
  return (
    <UserPageProvider>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="grid gap-8">
          <CardUser trigger={trigger} settrigger={settrigger} />
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">User Management</h2>
              <Button variant="outline">
                <PlusIcon className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </div>
            <TableUser trigger={trigger} settrigger={settrigger} />
          </div>
        </div>
      </div>
    </UserPageProvider>
  );
}

function PlusIcon(props: any) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
