import React from 'react';
import { css, styled } from 'twin.macro';
import { useTheme } from 'next-themes';

const InputRadio = styled.input(({ theme }) => {
  return [
    css`
      & {
        appearance: none;
        border: 2px solid ${theme === 'light' ? '#d6d6d6' : '#b332e8'};
        background-color: white;
        border-radius: 50%;

        &:checked {
          background-color: ${theme === 'light' ? '#fff' : '#b332e8'};
          border: ${theme === 'light' ? '7px' : '5px'} solid
            ${theme === 'light' ? '#b332e8' : '#fff'};
        }
      }
    `,
  ];
});

const RadioGroup: React.FC<{
  label: string;
  value: string;
  checked?: boolean;
}> = ({ label, value, checked = true }) => {
  const { theme } = useTheme();

  return (
    <div tw="flex">
      <div tw="w-full flex items-center">
        <InputRadio
          theme={theme}
          checked={checked}
          id={value}
          type="radio"
          value={value}
          name="default-radio"
          tw="w-[24px] h-[24px] focus:ring-purple-500 focus:ring-2 text-purple-600"
        />
        <label htmlFor={value} tw="ml-2 text-sm font-medium">
          {label}
        </label>
      </div>
    </div>
  );
};

export default RadioGroup;
