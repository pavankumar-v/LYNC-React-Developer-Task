import { useState } from 'react';

function useToggle(defaultState: boolean): [boolean, () => void] {
  const [open, setOpen] = useState(defaultState || false);

  const toggleFun = (): void => {
    setOpen(!open);
  };

  return [open, toggleFun];
}

export default useToggle;
