import React from "react";
import TBody from "./TBody";
import THeader from "./THeader";
import { FieldType } from "@/constants";
import { ColumnConfig, UuidId } from "@/pages/formPage/types";

interface TableProps<T, U> {
  data: T[];
  name: keyof U;
  columns: ColumnConfig[][];
  setData: React.Dispatch<React.SetStateAction<U>>;
}

const DynamicTable = <T extends UuidId, U>({ columns, data, setData, name }: TableProps<T, U>) => {

  const filterColumns = (columns: ColumnConfig[][]): ColumnConfig[][] => {
    if (data.length) return columns;
  
    return columns
      .map(row => row.filter(col => col.fieldType !== FieldType.DELETE_ROW))
      .filter(row => row.length > 0);
  };
  
  const tableColumns = filterColumns(columns);

  return (
    <div className="rounded-lg">
      <table className="min-w-full min-h-44 block border-collapse border border-gray-300 bg-white overflow-auto">
        <THeader columns={tableColumns} name={String(name)} />
        <TBody<T, U> data={data} columns={tableColumns} name={name} setData={setData}/>
      </table>
    </div>
  );
};

export default DynamicTable;