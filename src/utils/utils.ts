import { OptionType } from '@/types';
import { GroupBase, StylesConfig } from 'react-select';

export const localizedDateFormat = (date: Date) => {
  if (date) {
    date = new Date(date);
    return date.toLocaleDateString(navigator.language);
  }

  return null;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const debounce = (callback: Function, wait = 300) => {
  let timeoutId: number | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any) => {
    window.clearTimeout(timeoutId || 0);
    timeoutId = window.setTimeout(() => {
      // eslint-disable-next-line prefer-spread
      callback.apply(null, args);
    }, wait);
  };
};

export const dropDownStyle: StylesConfig<
  OptionType,
  false,
  GroupBase<OptionType>
> = {
  control: (base) => ({
    ...base,
    background: '#09090B',
    borderRadius: '12px',
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '12px',
  }),
  menuList: (base) => ({
    ...base,
    background: '#020817',
    borderRadius: '12px',
  }),
  option: (base, state) => ({
    ...base,
    background: state.isFocused ? '#3B82F6' : '#020817',
    borderRadius: '12px',
  }),
};
