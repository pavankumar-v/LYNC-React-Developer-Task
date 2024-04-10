import React from 'react';
import { twMerge } from 'tailwind-merge';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: JSX.Element | JSX.Element[] | string;
  variant?: BtnVariants;
  size?: ButtonSize;
}

type BtnVariants = 'primary' | 'secondary' | 'destructive' | 'default';
type ButtonSize = 'lg' | 'md' | 'sm';

const defaultStyle: string = 'text-sm px-4 py-2 transition rounded-sm';

const btnVariant: { [key in BtnVariants]: string } = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary/80 active:bg-primary/85 hover:text-primary-foreground/95 active:text-primary-foreground/90',
  destructive:
    'bg-destructive text-destructive-foreground hover:bg-destructive/80 active:bg-destructive/85 hover:text-destructive-foreground/95 active:text-destructive-foreground/90',
  secondary: '',
  default:
    'bg-transparent text-foreground hover:text-foreground/80 active:text-foreground/60 active:bg-',
};

const btnSize: { [key in ButtonSize]: string } = {
  lg: 'px-5 py-3',
  md: 'px-4 py-2',
  sm: 'text-xs px-3',
};

const Button: React.FC<Props> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={twMerge(
        defaultStyle,
        btnVariant[variant],
        className,
        btnSize[size]
      )}
    >
      {children}
    </button>
  );
};

export default Button;
