"use client";
import { Button } from "@/components/ui/button";
import TableUser from "@/components/own/user/table/tableUser";
import CardUser from "@/components/own/user/card/cardUser";
import UserPageProvider from "@/components/own/user/provider/userPageProvider";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import InputUser from "@/components/own/user/form/inputUser";

export default function UserPage() {
  const [trigger, settrigger] = useState(true);
  return (
    <UserPageProvider>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Akun</h3>
          <p className="text-sm text-muted-foreground">Kelola Akunmu Disini</p>
        </div>
        <Separator />
        <div className="grid gap-8">
          <CardUser trigger={trigger} settrigger={settrigger} />
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Manajemen Akun</h2>
              <InputUser
                trigger={trigger}
                settrigger={settrigger}
                tipe={"input"}
              />
            </div>
            <TableUser trigger={trigger} settrigger={settrigger} />
          </div>
        </div>
      </div>
    </UserPageProvider>
  );
}
