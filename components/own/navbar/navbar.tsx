import Link from "next/link";

export default function NavbarComponent() {
  return (
    <header className="flex h-16 w-full shrink-0 items-center px-4 md:px-6 bg-gray-900 text-white">
      <Link href="#" className="mr-6 flex items-center" prefetch={false}>
        <ChurchIcon className="h-6 w-6 mr-2" />
        <span className="text-lg font-bold">Masjid Agung Gamping</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
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
          Logout
        </Link>
      </nav>
    </header>
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
