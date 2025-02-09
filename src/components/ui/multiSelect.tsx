import React from "react";
import { TMultiOption } from "@/pages/formPage/types";
import Select, { CSSObjectWithLabel, MultiValue, StylesConfig } from "react-select";

interface MultiSelectProps {
  name?:string;
  value: TMultiOption[];
  loading?: boolean;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  options: TMultiOption[];
  placeholder?: string;
  styles?:  CSSObjectWithLabel;
  onChange: (target: MultiValue<TMultiOption>) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ name, value, styles, options, onChange, className, loading = false, required = false, disabled = false, placeholder = "Tanlang" }) => {
  const defaultStyles: StylesConfig<TMultiOption> = { control: (base) => ({ ...base, minHeight: "40px", ...styles }) };

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
