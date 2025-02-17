import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error=false, ...props }, ref) => {
    
    return (
      <input
        className={cn(
          `flex h-10 w-full rounded-none outline-none border-none bg-white px-3 py-2 text-sm`,
          error && "border-red-500",
          className
        )}
        ref={ref}
        style={props.style}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };