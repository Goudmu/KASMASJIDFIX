"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MenuIcon, MosqueIcon } from "@/lib/icon/icon";

export default function NavbarComponent() {
  const [isloading, setisloading] = useState(true);
  const { data: session } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (session == null) {
      setisloading(false);
    }
  }, [pathname]);

  if (isloading) {
    return (
      <header className="bg-gray-900 text-white px-4 lg:px-6 py-4 flex items-center justify-between h-[5vh]">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <MosqueIcon color={"white"} />
          <span className="text-xl font-bold">Masjid Agung Gamping</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          <div>Loading...</div>
        </nav>
      </header>
    );
  }
  if (pathname == "/" || pathname.startsWith("/public/")) {
    return (
      <header className="bg-gray-900 text-white px-4 lg:px-6 py-4 flex items-center justify-between h-[5vh]">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <MosqueIcon color={"white"} />
          <span className="text-xl font-bold">Masjid Agung Gamping</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={true}
          >
            Home
          </Link>
          <Link
            href="/public/laporan"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Report
          </Link>
          {session && (
            <Link
              href="/dashboard"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Dashboard
            </Link>
          )}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="grid gap-4 p-4">
              <Link
                href="/"
                className="text-sm font-medium hover:underline underline-offset-4"
                prefetch={true}
              >
                Home
              </Link>
              <Link
                href="/public/laporan"
                className="text-sm font-medium hover:underline underline-offset-4"
                prefetch={false}
              >
                Report
              </Link>
              {session && (
                <Link
                  href="/dashboard"
                  className="text-sm font-medium hover:underline underline-offset-4"
                  prefetch={false}
                >
                  Dashboard
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </header>
    );
  } else {
    return (
      <header className="bg-gray-900 text-white px-4 lg:px-6 py-4 flex items-center justify-between h-[5vh]">
        <Link
          href="/dashboard"
          className="flex items-center gap-2"
          prefetch={false}
        >
          <MosqueIcon color={"white"} />
          <span className="text-xl font-bold">Masjid Agung Gamping</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="/"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Home
          </a>
          <Link
            href="/dashboard"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Transaksi
          </Link>
          <Link
            href="/laporan"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Laporan
          </Link>
          <Link
            href="/pengaturan"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Pengaturan
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            <button
              onClick={async () => {
                console.log("asd123");
                await signOut();
              }}
            >
              Log Out
            </button>
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="grid gap-4 p-4">
              <a
                href="/"
                className="text-sm font-medium hover:underline underline-offset-4"
              >
                Home
              </a>
              <Link
                href="/dashboard"
                className="text-sm font-medium hover:underline underline-offset-4"
                prefetch={false}
              >
                Transaksi
              </Link>
              <Link
                href="/laporan"
                className="text-sm font-medium hover:underline underline-offset-4"
                prefetch={false}
              >
                Laporan
              </Link>
              <Link
                href="/pengaturan"
                className="text-sm font-medium hover:underline underline-offset-4"
                prefetch={false}
              >
                Pengaturan
              </Link>
              <Link
                href="#"
                className="text-sm font-medium hover:underline underline-offset-4"
                prefetch={false}
              >
                <button
                  onClick={async () => {
                    console.log("asd123");
                    await signOut();
                  }}
                >
                  Log Out
                </button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </header>
    );
  }
}
