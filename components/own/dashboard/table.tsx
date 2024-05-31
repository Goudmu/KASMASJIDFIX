"use client";

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
  DropdownMenuItem,
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
import React, { useState } from "react";
import {
  capitalizeFirstLetter,
  commafy,
  getMonthsArray,
  getYearsArray,
  thisMonth,
  thisYear,
} from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import { toast } from "react-toastify";
import InputTransaksi from "./form/inputTransaksi";

export default function TableDashboard({
  transaksi,
  triggerGetNewTransaksi,
  settriggerGetNewTransaksi,
  kegiatanId,
  category,
  userId,
}: {
  transaksi: TransactionType[];
  triggerGetNewTransaksi: any;
  settriggerGetNewTransaksi: any;
  kegiatanId: any;
  category: any;
  userId: any;
}) {
  const [searchInput, setSearchInput] = useState("");
  const [monthFilter, setMonthFilter] = useState(getMonthsArray());
  const [yearFilter, setYearFilter] = useState(getYearsArray());
  const [selectedMonth, setSelectedMonth] = useState(thisMonth());
  const [selectedYear, setSelectedYear] = useState(thisYear());

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const monthFilterHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const id = parseInt(target.id);
    setSelectedMonth(monthFilter.filter((data) => data.id == id)[0]);
  };
  const yearFilterHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const id = parseInt(target.id);
    setSelectedYear(yearFilter.filter((data) => data.id == id)[0]);
  };

  const deleteTransaksiHandler = async (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    try {
      const res = await fetch("/api/transaksi", {
        method: "DELETE",
        body: JSON.stringify({
          _id: e.currentTarget.id,
        }),
      });
      if (res.ok) {
        toast.success("Transaksi Berhasil Dihapus");
        settriggerGetNewTransaksi(!triggerGetNewTransaksi);
      }
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4">
        <div className="flex items-center gap-2">
          <Input
            className="max-w-[200px] sm:max-w-[300px]"
            placeholder="Search description..."
            type="search"
            id="input"
            onChange={searchHandler}
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
              <DropdownMenuRadioGroup value={selectedMonth.id.toString()}>
                {monthFilter &&
                  monthFilter.map((data) => {
                    // CHANGE DATA.ID TO STRING FOR DropdownMenuRadioItem value
                    const valueString = data.id.toString();
                    return (
                      <DropdownMenuRadioItem
                        value={valueString}
                        key={data.id}
                        id={valueString}
                        onClick={monthFilterHandler}
                      >
                        {data.name}
                      </DropdownMenuRadioItem>
                    );
                  })}
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
              <DropdownMenuRadioGroup value={selectedYear.id.toString()}>
                {yearFilter &&
                  yearFilter.map((data) => {
                    // CHANGE DATA.ID TO STRING FOR DropdownMenuRadioItem value
                    const valueString = data.id.toString();
                    return (
                      <DropdownMenuRadioItem
                        id={valueString}
                        value={valueString}
                        key={data.id}
                        onClick={yearFilterHandler}
                      >
                        {data.name}
                      </DropdownMenuRadioItem>
                    );
                  })}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className=" w-[10%]">Date</TableHead>
            <TableHead className=" w-[10%]">Type</TableHead>
            <TableHead className=" w-[50%]">Description</TableHead>
            <TableHead className=" w-[10%]">Category</TableHead>
            <TableHead className=" w-[10%]">Amount</TableHead>
            <TableHead className=" w-[10%]">Edit / Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transaksi &&
            transaksi.map((data, index) => {
              // CHANGE DATE TO LOCAL DATE
              const newDates = new Date(data.date);
              const formattedDate = newDates.toLocaleDateString();

              // SEARCH FITUR
              if (data.desc.includes(searchInput) || searchInput == "") {
                // MONTH AND YEAR FILTER
                if (
                  newDates.getMonth() == selectedMonth.id &&
                  newDates.getFullYear() == selectedYear.id
                ) {
                  return (
                    <TableRow key={index}>
                      <TableCell>{formattedDate}</TableCell>
                      <TableCell>{capitalizeFirstLetter(data.tipe)}</TableCell>
                      <TableCell>{data.desc}</TableCell>
                      <TableCell>
                        {capitalizeFirstLetter(data.kategoriName)}
                      </TableCell>
                      <TableCell>Rp{commafy(data.amount)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <div className=" w-full cursor-pointer">
                              <InputTransaksi
                                tipe={"edit"}
                                kegiatanId={kegiatanId}
                                category={category}
                                userId={userId}
                                dataTransaksi={data}
                                triggerGetNewTransaksi={triggerGetNewTransaksi}
                                settriggerGetNewTransaksi={
                                  settriggerGetNewTransaksi
                                }
                              />
                            </div>
                            <DropdownMenuItem
                              className=" cursor-pointer"
                              onClick={deleteTransaksiHandler}
                              id={data._id}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                }
              }
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
