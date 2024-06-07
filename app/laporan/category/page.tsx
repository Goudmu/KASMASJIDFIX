import TablePerKategori from "@/components/own/laporan/kategori/tablePerKategori";
import { CalendarIcon, MosqueIcon, TagIcon } from "@/lib/icon/icon";
import Link from "next/link";
import React from "react";

const LaporanPerKategoriPage = () => {
  return (
    <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex flex-col gap-2">
          <div className="flex h-[60px] items-center px-6">
            <Link
              href="#"
              className="flex items-center gap-2 font-semibold"
              prefetch={false}
            >
              <MosqueIcon />
              <span className="">Masjid Agung Gamping</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                href="/laporan"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                prefetch={false}
              >
                <CalendarIcon className="h-4 w-4" />
                Laporan per Month
              </Link>
              <Link
                href="/laporan/category"
                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                prefetch={false}
              >
                <TagIcon className="h-4 w-4" />
                Laporan per Category
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <TablePerKategori />
        </main>
      </div>
    </div>
  );
};

export default LaporanPerKategoriPage;
