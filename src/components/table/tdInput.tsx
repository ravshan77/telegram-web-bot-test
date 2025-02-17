import { JSX } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../Button";
import { Trash2 } from "lucide-react";
import { FieldType } from "@/constants/";
import { SingleValue } from "react-select";
import Select from "@/components/table/TSelect";
import { Input } from "@/components/table/TInput";
import { ColumnConfig, SingleOption } from "@/pages/formPage/types";

interface GenerateFieldProps<T> {
  row: T;
  col: ColumnConfig;
  deleteRow: (row: T) => void;
}

function generateField<T>({ col, row, deleteRow }: GenerateFieldProps<T>): JSX.Element | null {
  const fieldKey = col.field as keyof T;

  function handleInputChange<T>( {row, col, value}: { row:T, col: ColumnConfig, value: string | SingleValue<SingleOption> | Date | null}) {
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
      
      function handleSelect( {row, col, value} : { row:T, col: ColumnConfig, value: SingleValue<SingleOption> | SingleOption}) {
        if (col.onChange) {
          col.onChange({ row, col, new_value: value?.id ?? null });
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
          onClick={() => deleteRow(row) }
          style={col.style}
          type="button"
          // {...col}
        >
          <Trash2 className="cursor-pointer text-black"/>
        </Button>
      );

    default:
      return null;
  }
}

export default generateField;