import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Standardized price parsing utility
 * Handles various price formats including:
 * - "650৳ (50% discount)" -> 650
 * - "1000tk" -> 1000
 * - "800tk" -> 800
 * - "650tk monthly" -> 650
 * - "550 Tk. monthly" -> 550
 * - "1050 Tk." -> 1050
 * - "500" -> 500
 * - "750.50" -> 750.5
 */
export function parsePrice(priceString: string | number): number {
  // If it's already a number, return it
  if (typeof priceString === 'number') {
    return priceString;
  }

  // If it's not a string or is empty, return 0
  if (!priceString || typeof priceString !== 'string') {
    return 0;
  }

  // Remove Bengali Taka symbol (৳), "tk", "Tk.", and any additional text
  // Keep only digits and decimal points
  const cleanedPrice = priceString
    .replace(/৳/g, '') // Remove Bengali Taka symbol
    .replace(/tk\.?/gi, '') // Remove "tk" or "Tk." (case insensitive)
    .replace(/[^\d.]/g, '') // Keep only digits and decimal points
    .trim();

  const parsedPrice = parseFloat(cleanedPrice);
  
  // Return 0 if parsing fails or result is NaN
  return isNaN(parsedPrice) ? 0 : parsedPrice;
}

/**
 * Format price for display
 * Converts number to string with proper formatting
 * @param price - The price to format
 * @param currency - The currency symbol (default: ৳ for Bangladeshi Taka)
 * @param locale - The locale for number formatting (default: 'en-US')
 */
export function formatPrice(price: number, currency: string = '৳', locale: string = 'en-US'): string {
  if (isNaN(price) || price === 0) {
    return `${currency}0`;
  }
  
  // For Bangladeshi Taka, show whole numbers
  if (currency === '৳') {
    return `${currency}${Math.round(price)}`;
  }
  
  // For other currencies, use proper decimal formatting
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency === '$' ? 'USD' : 'BDT',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}
