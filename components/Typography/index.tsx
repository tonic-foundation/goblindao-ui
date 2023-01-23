import { DEFAULT_PRECISION, getExplorerUrl } from '@/config';
import {
  abbreviateCryptoString,
  getPricePrecision,
  nFormatter,
  truncateToLocaleString,
} from '@/lib/util';
import React from 'react';
import tw from 'twin.macro';

/**
 * Unstyled span
 */
const Currency: React.FC<{
  value?: number;
  precision?: number;
  automaticPrecision?: boolean;
  abbreviate?: boolean;
  fallback?: React.ReactNode;
  /**
   * default is a dollar sign
   */
  unit?: React.ReactNode;
  /**
   * does the $/symbol go after the number
   */
  unitAfter?: boolean;

  /**
   * Show + sign or not. Negative sign always shown
   */
  signed?: boolean;

  tabular?: boolean;

  colored?: boolean;

  /**
   * hack: we're displaying a percentage
   */
  percentage?: boolean;
}> = ({
  value,
  fallback,
  abbreviate,
  precision = DEFAULT_PRECISION,
  automaticPrecision = false,
  unit = '$',
  unitAfter = false,
  tabular = false,
  signed = false,
  colored = false,
  percentage = false,
  ...props
}) => {
  if (typeof value === 'undefined') {
    if (fallback) {
      return <React.Fragment>{fallback}</React.Fragment>;
    }
    return <React.Fragment />;
  }

  const pricePrecision = automaticPrecision
    ? getPricePrecision(value)
    : precision;
  const sign = value > 0 ? (signed ? '+' : '') : value < 0 ? '-' : '';
  // format with the absolute value; we handle sign "manually"
  const abs = Math.abs(value);

  return (
    <span
      css={[
        tabular && tw`tabular-nums`,
        colored &&
          (value < 0
            ? tw`text-red-600 dark:text-red-500`
            : value > 0
            ? tw`text-green-500 dark:text-lime-400`
            : undefined),
      ]}
      {...props}
    >
      {sign}
      {!unitAfter && !percentage && unit}
      {abbreviate
        ? nFormatter(abs, pricePrecision)
        : truncateToLocaleString(abs, pricePrecision)}
      {percentage && `%`}
      {/* space before the unit if the unit comes after */}
      {unitAfter && ` ${unit}`}
    </span>
  );
};

const AccountId: React.FC<{
  accountId: string;
  length?: number;
  gutter?: number;
  link?: boolean;
}> = ({ accountId, link, length = 16, gutter = 3, ...props }) => {
  if (link) {
    return (
      <a
        target="_blank"
        rel="noreferrer"
        href={getExplorerUrl('account', accountId)}
        {...props}
      >
        {abbreviateCryptoString(accountId, length, gutter)}
      </a>
    );
  }
  return (
    <span {...props}>{abbreviateCryptoString(accountId, length, gutter)}</span>
  );
};

const Typography = {
  // TODO: use this more
  AccountId,

  Currency,

  /**
   * Largest heading/title. Mainly for bare section headings.
   */
  Title: tw.h1`text-xl`,

  /**
   * General purpose heading, used in card and form headings.
   */
  Heading: tw.h2`text-lg`,

  // TODO: remove below this line
  Body: tw.p`font-medium`,
  /**
   * Form labels, etc
   */
  Label: tw.label`font-semibold text-base`,
};

export default Typography;
