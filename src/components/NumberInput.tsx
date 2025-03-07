// import { cn } from "@/lib/utils";
// import { forwardRef, useEffect, useState } from "react";

// export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   error?: boolean;
//   format?: boolean; // Formatlashni faollashtiruvchi prop
// }

// const NumberInput = forwardRef<HTMLInputElement, InputProps>(({ className, error = false, format = false, value, onChange, ...props }, ref) => {
//     const [displayValue, setDisplayValue] = useState<string>("");

//     // Formatlash funksiyasi
//     const formatNumber = (val: string) => {
//       return val.replace(/\D/g, "") // Faqat raqamlarni qoldirish
//         .replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Formatlash
//     };

//     // Inputdagi o'zgarishlarni boshqarish
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const rawValue = e.target.value.replace(/\D/g, ""); // Formatlanmagan raqamlar
//       setDisplayValue(format ? formatNumber(rawValue) : rawValue); // Ekranda ko'rsatish
//       onChange?.(e); // Prop orqali onChange qo'shish
//     };

//     useEffect(() => {
//       if (value) {
//         setDisplayValue(format ? formatNumber(String(value)) : String(value));
//       }
//     }, [value, format]);

//     return (
//       <input
//         className={cn(
//           `flex h-10 w-full rounded-lg border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
//           error && "border-red-500",
//           className
//         )}
//         ref={ref}
//         value={displayValue} // Formatlangan qiymatni ko'rsatish
//         onChange={handleChange} // Inputni o'zgartirish
//         {...props}
//       />
//     );
//   }
// );

// NumberInput.displayName = "NumberInput";

// export { NumberInput };

import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

export interface InputProps extends Omit<NumericFormatProps, "type" | "value" | "onChange"> {
  name: string;
  error?: boolean;
  value: string | number;
  onChange: (target: { name: string; value: string | null }) => void;
}

const NumberInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error = false, value, onChange, name, ...props }, ref) => {
    return (
      <NumericFormat
        // mask={" "}
        getInputRef={ref}
        autoComplete="off"
        value={value ?? ""}
        type="tel"
        thousandSeparator=" " // Bo'shliqlar bilan ajratish
        allowLeadingZeros={false}
        allowNegative={false} // Manfiy sonlarni oldini olish
        style={props.style}
        onValueChange={(values) => onChange?.({ name: name, value: values.value })}
        className={cn(
          `flex h-10 w-full rounded-lg border border-input bg-white px-3 py-2 text-sm ring-offset-background 
          file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground 
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
          disabled:cursor-not-allowed disabled:opacity-50`,
          error && "border-red-500",
          className
        )}
        {...props}
      />
    );
  }
);

NumberInput.displayName = "NumberInput";

export { NumberInput };
