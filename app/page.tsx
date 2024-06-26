"use client";
import Link from "next/link";
import SignIn from "@/components/own/home/login";
import HomeProvider from "@/components/own/home/homeProvider";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[95vh]">
      <main className="flex-1 bg-gray-100 dark:bg-gray-950 ">
        <section className="container mx-auto py-12 md:py-24 px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Welcome to Masjid Agung Gamping
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Discover the rich history and vibrant community of our beloved
                mosque.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/public/laporan"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  prefetch={false}
                >
                  View Report
                </Link>
              </div>
            </div>
            <HomeProvider />
          </div>
        </section>
      </main>
    </div>
  );
}
