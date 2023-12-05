export function absoluteURL(url?: string): string {
  if (typeof window === 'undefined') {
    // server
    return encodeURI(`https://${process.env.VERCEL_URL}/${url ? url : ''}`);
  }

  return encodeURI(url ? window.location.origin + url : window.location.origin);
}
