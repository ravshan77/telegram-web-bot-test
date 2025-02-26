import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | "";
  className?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = 'primary', ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
          variant === 'primary' && "bg-[#2AABEE] text-white hover:bg-[#229ED9] ",
          variant === 'danger' && "bg-red-400 text-white hover:bg-red-500 ",
          variant === 'secondary' && "bg-secondary text-secondary-foreground hover:bg-secondary",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };