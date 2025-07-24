import { clsx, type ClassValue } from "clsx"
import { time } from "console"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertDateToString(date: Date) {
  const timestampDate = new Date(date)
  const year = timestampDate.getFullYear()
  const month = timestampDate.getMonth()
  const day = timestampDate.getDay()

  const formattedDate = `${day}/${month}/${year}`
  return formattedDate
}
