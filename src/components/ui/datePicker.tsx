import { useState } from "react";
import MobileDatePicker from "react-mobile-datepicker";

export interface DatePickerProps {
  error?: boolean;
  className?: string
  disabled?: boolean;
  placeholder?: string;
  onChange: (date: Date | null) => void;
  value: Date | null;
}

export const DatePicker = ({ value, onChange, disabled, placeholder, error, className }: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const monthMap: Record<number, string> = {'1': 'Jan','2': 'Feb','3': 'Mar','4': 'Apr','5': 'May','6': 'Jun','7': 'Jul','8': 'Aug','9': 'Sep','10': 'Oct','11': 'Nov','12': 'Dec' };

  const dateConfig = {
    year: {
      format: "YYYY",
      caption: "Yil",
      step: 1
    },
    month: {
      format: (value: Date) => monthMap[value?.getMonth() + 1],
      caption: "Oy",
      step: 1
    },
    date: {
      caption: "Kun", 
      format: "DD",
      step: 1,
    },
  };


  const handleSelect = (date: Date) => {
    // const formatterDate = new Date(moment(date).format('YYYY-MM-DD'))
    onChange(date);
    setIsOpen(false);
  };

  const handleCancel = () => setIsOpen(false);

  return (
    <div className="relative flex items-center">
      <input
        readOnly
        type="text"
        disabled={disabled}
        value={String(value)}
        placeholder={placeholder || "Tanlang"}
        onClick={() => !disabled && setIsOpen(true)}
        className={`flex h-10 w-full rounded-lg border px-3 py-2 text-sm placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50 ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300"} ${className}`}
      />
      <MobileDatePicker
        isOpen={isOpen}
        max={new Date()}
        showFooter={true}
        showCaption={true}
        theme="android-dark"
        confirmText="Tanlash"
        onSelect={handleSelect}
        onCancel={handleCancel}
        dateConfig={dateConfig}
        cancelText="Bekor qilish"
        headerFormat="YYYY-MM-DD"
        min={new Date(1940, 0, 1)}
      />
    </div>
  );
};