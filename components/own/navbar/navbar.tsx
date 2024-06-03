"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavbarComponent() {
  const [isloading, setisloading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    if (session == null) {
      setisloading(false);
    }
  }, []);
  if (isloading) {
    return (
      <header className="bg-gray-900 text-white px-4 lg:px-6 py-4 flex items-center justify-between h-[5vh]">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <ChurchIcon className="h-6 w-6" />
          <span className="text-xl font-bold">Masjid Agung Gamping</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          <div>Loading...</div>
        </nav>
      </header>
    );
  }
  if (session == null || session == undefined) {
    return (
      <header className="bg-gray-900 text-white px-4 lg:px-6 py-4 flex items-center justify-between h-[5vh]">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <ChurchIcon className="h-6 w-6" />
          <span className="text-xl font-bold">Masjid Agung Gamping</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Report
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Mosque Activity
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Lecture
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
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-medium"
                prefetch={false}
              >
                <ChurchIcon className="h-6 w-6" />
                Home
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-medium"
                prefetch={false}
              >
                <CheckIcon className="h-6 w-6" />
                Report
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-medium"
                prefetch={false}
              >
                <CalendarIcon className="h-6 w-6" />
                Mosque Activity
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-medium"
                prefetch={false}
              >
                <BookIcon className="h-6 w-6" />
                Lecture
              </Link>
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
          <ChurchIcon className="h-6 w-6" />
          <span className="text-xl font-bold">Masjid Agung Gamping</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Transaksi
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Program kerja
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Pengajian
          </Link>
          <Link
            href="#"
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
            href="/"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            <button
              onClick={async () => {
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
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-medium"
                prefetch={false}
              >
                <ChurchIcon className="h-6 w-6" />
                Home
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-medium"
                prefetch={false}
              >
                <CheckIcon className="h-6 w-6" />
                Report
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-medium"
                prefetch={false}
              >
                <CalendarIcon className="h-6 w-6" />
                Mosque Activity
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-medium"
                prefetch={false}
              >
                <BookIcon className="h-6 w-6" />
                Lecture
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </header>
    );
  }
}
function BookIcon(props: any) {
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
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function CalendarIcon(props: any) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function CheckIcon(props: any) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ChurchIcon(props: any) {
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
      <path d="m18 7 4 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9l4-2" />
      <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" />
      <path d="M18 22V5l-6-3-6 3v17" />
      <path d="M12 7v5" />
      <path d="M10 9h4" />
    </svg>
  );
}

function LogInIcon(props: any) {
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
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  );
}

function MenuIcon(props: any) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
