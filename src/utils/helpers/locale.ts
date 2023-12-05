'use client';

export function isUS() {
  return Intl.DateTimeFormat().resolvedOptions().locale === 'en-US';
}
