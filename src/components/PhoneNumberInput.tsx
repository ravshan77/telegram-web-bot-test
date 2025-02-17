import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { PatternFormat, PatternFormatProps } from "react-number-format";

export interface InputProps extends Omit<PatternFormatProps, "type" | "value" | "onValueChange"> {
  name: string;
  format: string;
  error?: boolean;
  value: string | number;
  onValueChange: (target: { name: string; value: string | null }) => void;
}

const PhoneNumberInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error = false, value, onValueChange, name, format = "+998 ## ### ## ##", ...props }, ref) => {
    return (
      <PatternFormat
        mask="_"
        minLength={14}
        format={format}
        getInputRef={ref}
        autoComplete="off"
        value={value ?? ""}
        style={props.style}
        onValueChange={(values) => onValueChange?.({ name: name, value: values.value })}
        className={cn(`flex h-10 w-full rounded-lg border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`, error && "border-red-500", className)}
        {...props}
      />
    );
  }
);

PhoneNumberInput.displayName = "PhoneNumberInput";

export { PhoneNumberInput };
