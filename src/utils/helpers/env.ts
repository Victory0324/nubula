const env = process.env.NEXT_PUBLIC_VERCEL_ENV;

export function isDev() {
  return env === 'development';
}

export function isPreview() {
  return env === 'preview';
}

export function isProd() {
  return env === 'production';
}
export function isSanityDebug() {
  // switch on this envar to get uncached sanity requests
  return !!process.env.NEXT_PUBLIC_SANITY_DEBUG;
}

export function isDevOrPreview() {
  return isDev() || isPreview();
}

export function isMobile() {
  return !!(
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  );
}
