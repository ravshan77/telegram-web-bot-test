import React from "react";
import { MultiOption } from "@/pages/formPage/types";
import Select, { CSSObjectWithLabel, MultiValue, StylesConfig } from "react-select";

interface MultiSelectProps {
  name?:string;
  value: MultiOption[];
  loading?: boolean;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  options: MultiOption[];
  placeholder?: string;
  styles?:  CSSObjectWithLabel;
  onChange: (target: MultiValue<MultiOption>) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ name, value, styles, options, onChange, className, loading = false, required = false, disabled = false, placeholder = "Tanlang" }) => {
  const defaultStyles: StylesConfig<MultiOption> = { control: (base) => ({ ...base, minHeight: "40px", ...styles }) };

  return (
    <Select
      name={name}
      isMulti
      value={value}
      options={options}
      isLoading={loading}
      isDisabled={disabled}
      required={required}
      className={className}
      classNamePrefix="select"
      placeholder={placeholder}
      styles={defaultStyles}
      onChange={e => onChange(e)}
      menuPosition="fixed"
      />
  );
};

export default MultiSelect;
