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
