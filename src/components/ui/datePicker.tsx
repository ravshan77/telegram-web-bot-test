// DatePicker component
import { useState } from "react";
import MobileDatePicker from "react-mobile-datepicker";

export interface DatePickerProps {
  value: Date | string | null;
  onChange: (date: Date) => void;
  disabled?: boolean;
  placeholder?: string;
  error?: boolean;
}

export const DatePicker = ({ value, onChange, disabled, placeholder, error }: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const monthMap = {
    '1': 'Jan',
    '2': 'Feb',
    '3': 'Mar',
    '4': 'Apr',
    '5': 'May',
    '6': 'Jun',
    '7': 'Jul',
    '8': 'Aug',
    '9': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec',
  };

  const dateConfig = {
    year: {
      format: "YYYY",
      caption: "Yil",
      step: 1
    },
    month: {
      format: (value: number) => monthMap[String(value + 1)],
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
    onChange(date);
    setIsOpen(false);
  };

  const handleCancel = () => setIsOpen(false);

  return (
    <div className="relative">
      <input
        type="text"
        readOnly
        value={value ? value.toISOString().split('T')[0] : ""}
        placeholder={placeholder || "Tanlang"}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(true)}
        className={`flex h-12 w-full rounded-lg border px-3 py-2 text-sm placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50 ${
          error ? "border-red-500 focus:ring-red-500" : "border-gray-300"
        }`}
      />
      <MobileDatePicker
        isOpen={isOpen}
        onSelect={handleSelect}
        onCancel={handleCancel}
        dateConfig={dateConfig}
        headerFormat="YYYY-MM-DD"
        theme="android-dark"
        max={new Date()}
        min={new Date(1940, 0, 1)}
        cancelText="Bekor qilish"
        confirmText="Tanlash"
        showCaption={true}
        showFooter={true}
      />
    </div>
  );
};