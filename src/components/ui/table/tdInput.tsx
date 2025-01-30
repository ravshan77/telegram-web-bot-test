import { JSX } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../button";
import { FieldType } from "@/constants";
import { SingleValue } from "react-select";
import Select from "@/components/ui/table/TSelect";
import { Input } from "@/components/ui/table/TInput";
import { ColumnConfig, TOption } from "@/pages/formPage/types";

interface GenerateFieldProps<T> {
  row: T;
  col: ColumnConfig;
  deleteRow: (row: T) => void;
}

function generateField<T>({ col, row, deleteRow }: GenerateFieldProps<T>): JSX.Element | null {
  const fieldKey = col.field as keyof T;

  function handleInputChange<T>( {row, col, value}: { row:T, col: ColumnConfig, value: string | SingleValue<TOption> | Date | null}) {
    if (col.onChange) {
      col.onChange({ row, col, new_value: value ?? null });
    }
  }

  
  switch (col.fieldType) {
    case FieldType.TEXT:
      return (
        <Input
          className={cn("rounded-none border-none", col.className)}
          value={(row[fieldKey] as string) || ""}
          {...col}
          onChange={(e) => handleInputChange({row, col, value:e.target.value})} 
        />
      );

    case FieldType.DATE:
      return (
        <Input
          className={cn("rounded-none", col.className)}
          value={(row[fieldKey] as string) || ""}
          type="date"
          {...col}
          onChange={(e) => handleInputChange({row, col, value:e.target.value})} 
      />
      );

    case FieldType.SELECT:
      if (!col.options) return null;
      
      function handleSelect( {row, col, value} : { row:T, col: ColumnConfig, value: SingleValue<TOption> | TOption}) {
        if (col.onChange) {
          col.onChange({ row, col, new_value: value?.value ?? null });
        }
      }

      return (
        <Select
          className={cn("rounded-none", col.className)}
          options={col.options}
          value={String(row[fieldKey])}
          {...col}
          onChange={(target) => handleSelect({row, col, value: target})} 
        />
      );

    case FieldType.DELETE_ROW:
      return (
        <Button
          className={cn("rounded-none text-red-500 hover:text-red-700 bg-red-500", col.className)}
          // {...col}
          onClick={() => deleteRow(row) }
          // onChange={() => deleteRow(row)}
        >
          {col.icon || "Delete"}
        </Button>
      );

    default:
      return null;
  }
}

export default generateField;