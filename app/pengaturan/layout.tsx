"use client";
import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./sidebar/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/pengaturan",
  },
  {
    title: "Buku Kas",
    href: "/pengaturan/bukukas",
  },
  {
    title: "Kategori",
    href: "/pengaturan/kategori",
  },
  {
    title: "Tanda Tangan",
    href: "/pengaturan/signature",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState(pathname);

  const handleItemClick = (href: string) => {
    setActiveItem(href);
  };
  return (
    <>
      <div className=" space-y-6 p-10 pb-16 ">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Pengaturan</h2>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav
              items={sidebarNavItems}
              activeItem={activeItem}
              onClick={handleItemClick}
            />
          </aside>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  );
}
