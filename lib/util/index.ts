import BN from 'bn.js';

export function sleep(n: number) {
  return new Promise((resolve) => setTimeout(resolve, n));
}

export function denomination(decimals: number): BN {
  return new BN(10).pow(new BN(decimals));
}

export function truncate(v: number, places: number) {
  const mul = Math.pow(10, places);
  return Math.floor(v * mul) / mul;
}

export function abbreviateCryptoString(s: string, maxLength = 20, gutter = 0) {
  if (s.length > maxLength) {
    const head = s.slice(0, maxLength - 3 - gutter);
    const tail = s.slice(s.length - gutter);
    return head + '...' + tail;
  }
  return s;
}

export function truncateToLocaleString(v: number, precision: number) {
  return truncate(v, precision).toLocaleString(undefined, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });
}

export function range(n: number) {
  return [...new Array(n).keys()];
}

export function nFormatter(raw: number, digits = 2) {
  const num = Math.abs(raw);

  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'm' },
    { value: 1e9, symbol: 'b' },
    { value: 1e12, symbol: 't' },
    { value: 1e15, symbol: 'p' },
    { value: 1e18, symbol: 'e' },
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find((item) => {
      return num >= item.value;
    });
  return item
    ? truncateToLocaleString(num / item.value, digits).replace(rx, '$1') +
        item.symbol
    : num.toFixed(digits);
}

export function getPricePrecision(v: number) {
  if (v < 10) {
    return 3; // 0.001
  }
  return 2;
}

export function toCapitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
