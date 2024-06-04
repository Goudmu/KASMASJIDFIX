import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-4 lg:px-6 py-2 flex items-center justify-between h-[5vh]">
      <p className="text-sm">&copy; 2024 Masjid Agung Gamping</p>
      <nav className="flex items-center gap-4">
        <Link
          href="/terms"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          Terms of Service
        </Link>
        <Link
          href="/privacypolicy"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          Privacy Policy
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
