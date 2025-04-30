import React from 'react';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      fullWidth = true,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={classNames(
          'rounded-full font-medium py-3 px-4 transition-colors duration-200',
          {
            'bg-[#FF69B1] text-white hover:bg-opacity-90': variant === 'primary',
            'bg-white border border-gray-300 text-black hover:bg-gray-50': variant === 'outline',
            'w-full': fullWidth
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';