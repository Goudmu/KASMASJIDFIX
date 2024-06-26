import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(string: string | undefined) {
  if (string == undefined) {
    return "";
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function commafy(num: number) {
  var str = num.toString().split(",");
  if (str[0].length >= 5) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1.");
  }
  if (str[1] && str[1].length >= 5) {
    str[1] = str[1].replace(/(\d{3})/g, "$1 ");
  }
  return str.join(",");
}

export function getMonthsArray() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return months.map((month, index) => {
    return {
      id: index,
      name: month,
    };
  });
}

export function getMonthsArrayFull() {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  return months.map((month, index) => {
    return {
      id: index,
      name: month,
    };
  });
}

export function thisMonth() {
  const currentMonthIndex = new Date().getMonth(); // getMonth() returns 0-11 for Jan-Dec
  return getMonthsArray().filter((data) => data.id == currentMonthIndex)[0];
}
export function thisMonthFull() {
  const currentMonthIndex = new Date().getMonth(); // getMonth() returns 0-11 for Jan-Dec
  return getMonthsArrayFull().filter((data) => data.id == currentMonthIndex)[0];
}

export function getYearsArray(startYear = 2020) {
  const currentYear = new Date().getFullYear();
  const yearsArray = [];

  for (let year = startYear; year <= currentYear; year++) {
    yearsArray.push({
      id: year,
      name: year.toString(),
    });
  }

  return yearsArray;
}

export const thisYear = () => {
  const currentYearIndex = new Date().getFullYear(); // getMonth() returns 0-11 for Jan-Dec
  return getYearsArray().filter((data) => data.id == currentYearIndex)[0];
};

export const roleUserUtils = (id: number) => {
  if (id == null) return "0";
  const roleObject = [
    { id: 0, name: "user" },
    { id: 1, name: "admin" },
    { id: 2, name: "ketua" },
    { id: 3, name: "sekretaris" },
    { id: 4, name: "bendehara" },
  ];
  return roleObject.filter((data: any) => data.id == id)[0].name;
};

export function chunkArray(array: string | any[], size: number) {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size));
  }
  return chunkedArray;
}

import hotkeys from "hotkeys-js";

export function addPrintShortcut() {
  hotkeys("ctrl+p", function (event, handler) {
    event.preventDefault();
    let myDiv = document.getElementById("mainpdf")?.innerHTML;
    let oldPage = document.body.innerHTML;
    document.body.innerHTML =
      "<html><head><title></title></head><body>" + myDiv + "</body>";
    window.print();
    document.body.innerHTML = oldPage;
    window.addEventListener(
      "afterprint",
      function () {
        location.reload();
      },
      false
    );
  });
}
