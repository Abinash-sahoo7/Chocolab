import { clsx, type ClassValue } from "clsx";
import { Database } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDate(isoString: string): string {
  const data = new Date(isoString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = data.toLocaleDateString("en-US", options);

  return formattedDate;
}

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "received":
      return "bg-purple-600";
    case "reserved":
      return "bg-amber-600";
    case "paid":
      return "bg-green-600";
    case "completed":
      return "bg-gray-600";
  }
};
