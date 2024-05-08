// utils/parseCookies.js
export function parseCookies(req) {
    return req.headers.cookie
      ? Object.fromEntries(req.headers.cookie.split('; ').map(c => c.split('=')))
      : {};
  }