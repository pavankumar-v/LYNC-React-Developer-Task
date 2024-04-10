import React, { DetailedHTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface SpinnerProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children?: JSX.Element | JSX.Element[] | string;
}

const Spinner: React.FC<SpinnerProps> = ({ children, ...props }) => {
  return (
    <div className="flex justify-center items-center gap-2" {...props}>
      <div
        className={twMerge(
          'animate-spin inline-block size-5 border-[3px] border-primary border-t-transparent text-blue-600 rounded-full text-foreground'
        )}
        role="status"
        aria-label="loading"
      ></div>
      <span>{children}</span>
    </div>
  );
};

export default Spinner;
