import React from 'react';
import { Listbox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import tw, { css } from 'twin.macro';
import Transition from '@/components/Transition';

export type ListBoxProps = {
  name: string;
  value: string;
};

const ListBox: React.FC<{
  list: ListBoxProps[];
  selected: ListBoxProps;
  setSelected: (e: ListBoxProps) => void;
}> = ({ list, setSelected, selected, ...props }) => {
  return (
    <Listbox {...props} value={selected} onChange={setSelected}>
      <div tw="relative mt-1">
        <Listbox.Button
          tw="border-[1px]
              dark:(bg-neutral-900 border-neutral-700)
              hover:border-neutral-300 border-slate-200
              focus:border-black dark:(hover:border-neutral-600 focus:border-lime-400 active:border-lime-400)
              relative w-full cursor-pointer rounded-lg py-3 px-4 text-left"
        >
          <span tw="block truncate">{selected.name}</span>
          <span tw="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon tw="h-5 w-5" />
          </span>
        </Listbox.Button>
        <Transition
          as={React.Fragment}
          enterFrom={tw`opacity-0 -translate-y-2`}
          enterTo={tw`opacity-100 translate-y-0`}
          leaveTo={tw`opacity-0 -translate-y-2`}
          enter={tw`transition duration-200`}
          leave={tw`transition duration-200`}
        >
          <Listbox.Options
            tw="absolute border-[1px]
                z-50
                dark:(bg-neutral-900 border-neutral-700)
                hover:border-neutral-300 border-slate-200
                focus:border-black dark:(hover:border-neutral-600 focus:border-lime-400)
                mt-1 max-h-60 w-full overflow-auto rounded-lg
                dark:bg-dark-gray-700 bg-white py-1 cursor-pointer sm:text-sm"
          >
            {list.map((item, itemIdx) => (
              <Listbox.Option
                key={itemIdx}
                tw="relative cursor-pointer select-none py-2 pl-10 pr-4"
                css={css`
                  & {
                    opacity: ${selected.value === item.value ? '1' : '0.7'};
                  }
                `}
                value={item}
              >
                <span tw="block truncate">{item.name}</span>
                {selected.value === item.value ? (
                  <span tw="absolute inset-y-0 left-0 flex items-center pl-3 text-brand-400">
                    <CheckIcon tw="h-5 w-5" />
                  </span>
                ) : null}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default React.memo(ListBox);
