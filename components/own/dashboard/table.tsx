"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/PG7dBPeIDIL
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { TransactionType } from "@/lib/mongodb/models";

export default function TableDashboard({
  transaksi,
}: {
  transaksi: TransactionType[];
}) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4">
        <div className="flex items-center gap-2">
          <Input
            className="max-w-[200px] sm:max-w-[300px]"
            placeholder="Search description..."
            type="search"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center gap-1" variant="outline">
                <CalendarIcon className="h-4 w-4" />
                <span>Filter by month</span>
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]">
              <DropdownMenuLabel>Select month</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value="all">
                <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="1">January</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="2">
                  February
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="3">March</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="4">April</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="5">May</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="6">June</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="7">July</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="8">August</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="9">
                  September
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="10">
                  October
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="11">
                  November
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="12">
                  December
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center gap-1" variant="outline">
                <CalendarIcon className="h-4 w-4" />
                <span>Filter by year</span>
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]">
              <DropdownMenuLabel>Select year</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value="all">
                <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="2023">2023</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="2022">2022</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="2021">2021</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="2020">2020</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transaksi &&
            transaksi.map((data, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{data.date}</TableCell>
                  <TableCell>{data.tipe}</TableCell>
                  <TableCell>{data.desc}</TableCell>
                  <TableCell>{data.kategoriName}</TableCell>
                  <TableCell className="text-right">Rp{data.amount}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
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

function ChevronDownIcon(props: any) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
