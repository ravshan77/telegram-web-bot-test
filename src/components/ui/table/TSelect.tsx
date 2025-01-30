import React from "react";
import { TOption } from "@/pages/formPage/types";
import Select, { CSSObjectWithLabel, SingleValue, StylesConfig } from "react-select";

interface CustomSelectProps {
  name?:string;
  value: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  options: TOption[];
  placeholder?: string;
  loading?: boolean;
  styles?:  CSSObjectWithLabel;
  onChange: (target: SingleValue<TOption>) => void;
}


const CustomSelect: React.FC<CustomSelectProps> = ({
  name,
  value,
  styles,
  options,
  onChange,
  className,
  loading = false,
  required = false,
  disabled = false,
  placeholder = "Tanlang",
}) => {
  const defaultStyles: StylesConfig<TOption> = {
    control: (base, state) => ({
      ...base,
      minHeight: "30px",
      borderColor: required && !value ? "red" : base.borderColor,
      border:"none",
      outline:"none",
      boxShadow: state.isFocused ? "none" : base.boxShadow,
      ...styles,
      
    }),
    placeholder: (base) => ({
      ...base,
      color: required && !value ? "red" : base.color,
    }),
  };


  return (
    <Select
      name={name}
      isMulti={false}
      value={options.find(op => String(op.value) === String(value))}
      options={options}
      isLoading={loading}
      isDisabled={disabled}
      className={className}
      classNamePrefix="select"
      placeholder={placeholder}
      styles={defaultStyles}
      onChange={onChange}
      menuPosition="fixed"
      />
  );
};

export default CustomSelect;
