import Link from "next/link";
import { useRouter } from "next/navigation";

interface SidebarNavItem {
  title: string;
  href: string;
}

interface SidebarNavProps {
  items: SidebarNavItem[];
  activeItem: string;
  onClick: (href: string) => void;
}

export function SidebarNav({ items, activeItem, onClick }: SidebarNavProps) {
  const router = useRouter();

  return (
    <nav className="space-y-2">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`block p-2 rounded ${
            item.href === activeItem
              ? "bg-white text-black"
              : "hover:bg-gray-200"
          }`}
          onClick={() => onClick(item.href)}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
