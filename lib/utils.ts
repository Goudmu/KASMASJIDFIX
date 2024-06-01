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

export function thisMonth() {
  const currentMonthIndex = new Date().getMonth(); // getMonth() returns 0-11 for Jan-Dec
  return getMonthsArray().filter((data) => data.id == currentMonthIndex)[0];
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
