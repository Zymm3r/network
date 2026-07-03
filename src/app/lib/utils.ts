import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (email: string | undefined | null) => {
  if (!email) return 'G';
  const localPart = email.split('@')[0] || '';
  const vowels = 'aeiouAEIOU';
  const consonants = localPart
    .split('')
    .filter((ch) => /[a-zA-Z]/.test(ch) && !vowels.includes(ch));
  if (consonants.length >= 2) return (consonants[0] + consonants[1]).toUpperCase();
  if (consonants.length === 1) return consonants[0].toUpperCase();
  // Fallback: first 2 alphabetic chars
  const alpha = localPart.split('').filter((ch) => /[a-zA-Z]/.test(ch));
  return alpha.length >= 2
    ? (alpha[0] + alpha[1]).toUpperCase()
    : alpha.length === 1
    ? alpha[0].toUpperCase()
    : 'G';
};
