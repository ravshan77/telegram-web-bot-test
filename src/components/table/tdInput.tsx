import { JSX } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../Button";
import { Trash2 } from "lucide-react";
import { FieldType } from "@/constants/";
import { SingleValue } from "react-select";
import Select from "@/components/table/TSelect";
import { Input } from "@/components/table/TInput";
import { ColumnConfig, SingleOption, Values } from "@/pages/formPage/types";

interface GenerateFieldProps<T> {
  row: T;
  col: ColumnConfig;
  deleteRow: (row: T) => void;
  name: keyof Values
}

function generateField<T>({ col, row, deleteRow, name }: GenerateFieldProps<T>): JSX.Element | null {
  const fieldKey = col.field as keyof T;

  function handleInputChange<T>( {row, col, value}: { row:T, col: ColumnConfig, value: string | SingleValue<SingleOption> | Date | null}) {
    if (col.onChange) {
      col.onChange({ row, col, new_value: value ?? null, name});
    }
  }

  
  switch (col.fieldType) {
    case FieldType.TEXT:
      return (
        <Input
          className={cn("rounded-none border-none max-h-8", col.className)}
          value={(row[fieldKey] as string) || ""}
          {...col}
          onChange={(e) => handleInputChange({row, col, value:e.target.value})} 
        />
      );

    case FieldType.DATE:
      return (
        <Input
          className={cn("rounded-none max-h-8", col.className)}
          value={(row[fieldKey] as string) || ""}
          type="date"
          {...col}
          onChange={(e) => handleInputChange({row, col, value:e.target.value})} 
      />
      );

    case FieldType.SELECT:
      if (!col.options) return null;
      
      function handleSelect( {row, col, value} : { row:T, col: ColumnConfig, value: SingleValue<SingleOption> | SingleOption}) {
        if (col.onChange) {
          col.onChange({ row, col, new_value: value?.id ?? null, name });
        }
      }

      return (
        <Select
          className={cn("rounded-none max-h-8 border border-red-500", col.className)}
          options={col.options}
          value={String(row[fieldKey])}
          {...col}
          onChange={(target) => handleSelect({row, col, value: target})} 
        />
      );

    case FieldType.DELETE_ROW:
      return (
        <Button
          className={cn("rounded-none w-full", col.className)}
          onClick={() => deleteRow(row) }
          style={col.style}
          variant=""
          type="button"
        >
          <Trash2 className="cursor-pointer text-red-500"/>
        </Button>
      );

    default:
      return null;
  }
}

export default generateField;