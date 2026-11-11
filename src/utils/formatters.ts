/**
 * تبدیل اعداد انگلیسی به ارقام فارسی
 */
export function toPersianDigits(n: number | string): string {
  if (n === null || n === undefined) return '';
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x, 10)]);
}

/**
 * فرمت کردن مقادیر با جداکننده سه رقمی و ارقام فارسی
 */
export function formatNumberWithCommas(n: number | string): string {
  if (n === null || n === undefined) return '';
  const parts = n.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '،');
  return toPersianDigits(parts.join('.'));
}

/**
 * ایجاد کلاس‌های شرطی Tailwind
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
