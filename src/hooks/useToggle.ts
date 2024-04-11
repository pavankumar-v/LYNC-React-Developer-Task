import { useState } from 'react';

function useToggle(
  defaultState: boolean
): [boolean, (value?: boolean) => void] {
  const [open, setOpen] = useState(defaultState || false);

  const toggleFun = (value?: boolean): void => {
    if (value !== null && value !== undefined) {
      return setOpen(value);
    }

    setOpen((open) => !open);
  };

  return [open, toggleFun];
}

export default useToggle;
