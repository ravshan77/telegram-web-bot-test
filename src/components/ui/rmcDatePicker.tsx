import "rmc-date-picker/assets/index.css";
import DatePicker from "rmc-date-picker";
import "rmc-picker/assets/index.css";
import { useState } from "react";

export interface DatePickerProps {
  error?: boolean;
  disabled?: boolean;
  value: Date | null;
  className?: string;
  placeholder?: string;
  onChange: (date: Date | null) => void;
}

export default function RmcDatepicker({ value, onChange, disabled, placeholder, error, className }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [date_value, setDateValue] = useState(value)

  const handleSelect = (date: Date) => {
    setIsOpen(false);
    onChange(date);
  };

  const handleCancel = () => setIsOpen(false);

  return (
    <div className="">
      <input
        readOnly
        type="text"
        disabled={disabled}
        value={value ? value.toISOString().split("T")[0] : ""}
        placeholder={placeholder || "Tanlang"}
        onClick={() => !disabled && setIsOpen(true)}
        className={`flex h-10 w-full rounded-lg border px-3 py-2 text-sm placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50 ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300"} ${className}`}
      />
      {isOpen && (
        <div className="bg-white w-full rounded-lg shadow-lg p-4 z-10">
          <DatePicker
            rootNativeProps={{ "data-xx": "yy" }}
            mode="date"
            className="bg-white"
            use12Hours={false}
            defaultDate={date_value || new Date()}
            minDate={new Date(2000, 0, 1)}
            maxDate={new Date(2030, 11, 31)}
            itemStyle={{ fontSize: 16 }}
            formatMonth={(month) => `${month+ 1}`}
            formatDay={(day) => `${day}`}
            onDateChange={(date) => handleSelect(date)}
            onScrollChange={(date) => setDateValue(date)}
          />
          <div className="flex justify-around mt-4 gap-2">
            <button onClick={handleCancel} className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">
              Close
            </button>
            <button onClick={() => handleSelect(date_value || new Date())} className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600">
              Tanlash
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
