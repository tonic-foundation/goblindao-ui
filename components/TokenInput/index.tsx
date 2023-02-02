import { IToken } from '@/lib/services/near/tokenlist';
import React from 'react';
import { DEFAULT_PRECISION } from '@/config';
import { Input } from '@/components/common/Input';
import { truncate } from '@/lib/util';
import { useTokenSelector } from '@/components/TokenPickerModal';
import { hover } from '@/styles';
import tw from 'twin.macro';
import TokenIcon from '@/components/common/TokenIcon';
import Icon from '../common/Icon';
import Typography from '../Typography';

export const TokenInput: React.FC<{
  label?: string | React.ReactNode;
  token: IToken;
  /**
   * if provided, token can be clicked to change. if not, token is unclickable
   */
  onChangeToken?: (t: IToken) => unknown;
  value?: number | string;
  onChange: (v?: string) => unknown;
  min?: number;
  max?: number;
  step?: number;
  id?: string;
  /**
   * refers to display precision, not necessarily the same as step
   */
  precision?: number;
}> = ({
  id,
  label,
  token,
  onChangeToken,
  value,
  onChange,
  min,
  max,
  step,
  precision = DEFAULT_PRECISION,
  ...props
}) => {
  return (
    <div tw="relative" {...props}>
      <Input
        id={id}
        tabular
        tw="pr-16 text-right py-3 px-4"
        placeholder="0.00"
        type="number"
        inputMode="decimal"
        step={step || Number.MIN_VALUE}
        min={min}
        max={max}
        value={
          typeof value === 'number' ? truncate(value, precision) : value || ''
        }
        onChange={(e) => onChange(e.target.value)}
      />
      {label && (
        <label
          htmlFor={id}
          tw="absolute left-0 top-0 bottom-0 flex items-center justify-center pl-3"
        >
          <span tw="text-xs">{label}</span>
        </label>
      )}
      <span tw="absolute right-[1px] top-[1px] bottom-[1px] flex items-stretch justify-center overflow-hidden">
        <TokenInputButton
          tw="flex items-center gap-1 px-1.5 rounded-[7px] rounded-l-none border-l-[1px] border-black/5 dark:border-white/10"
          token={token}
          onChangeToken={onChangeToken}
        />
      </span>
    </div>
  );
};

export const TokenInputButton: React.FC<{
  onChangeToken?: (t: IToken) => unknown;
  token: IToken;
}> = ({ onChangeToken, token, ...props }) => {
  const { show } = useTokenSelector();

  return (
    <button
      {...props}
      css={[
        !!onChangeToken && hover.default,
        !onChangeToken && tw`cursor-not-allowed`,
      ]}
      disabled={!onChangeToken}
      onClick={(e) => {
        e.preventDefault();
        show(true, onChangeToken);
      }}
    >
      <TokenIcon tw="h-6 w-6" token={token} />
      <Icon.ChevronDown tw="text-sm" css={!onChangeToken && tw`opacity-40`} />
    </button>
  );
};

export const TokenValueLabel: React.FC<{
  label: string;
  value?: number;
}> = ({ value, label, ...props }) => {
  return (
    <span {...props}>
      {label} <Typography.Currency tw="opacity-60" value={value} />
    </span>
  );
};
