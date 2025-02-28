import React from "react";
import TBody from "./TBody";
import THeader from "./THeader";
import { FieldType } from "@/constants";
import { ColumnConfig, UuidId, Values } from "@/pages/formPage/types";

interface TableProps<T> {
  data: T[];
  name: keyof Values;
  columns: ColumnConfig[][];
  setData: React.Dispatch<React.SetStateAction<Values>>;
}

const DynamicTable = <T extends UuidId>({ columns, data, setData, name }: TableProps<T>) => {

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
        <TBody<T> data={data} columns={tableColumns} name={name} setData={setData}/>
      </table>
    </div>
  );
};

export default DynamicTable;