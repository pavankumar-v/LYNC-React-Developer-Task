import React from 'react';
import { twMerge } from 'tailwind-merge';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: JSX.Element | JSX.Element[] | string;
  variant?: BtnVariants;
}

export type BtnVariants = 'primary' | 'secondary' | 'default';

const defaultStyle = 'text-sm px-4 py-2 transition rounded-sm';

const btnVariant: { [key in BtnVariants]: string } = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary/80 active:bg-primary/85 hover:text-primary-foreground/95 active:text-primary-foreground/90',
  secondary: '',
  default:
    'bg-transparent text-foreground hover:text-foreground/80 active:text-foreground/60 active:bg-',
};

const Button: React.FC<Props> = ({
  children,
  variant = 'primary',
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={twMerge(defaultStyle, btnVariant[variant], className)}
    >
      {children}
    </button>
  );
};

export default Button;
