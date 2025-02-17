import React from "react";
import { v4 as uuidv4 } from "uuid";
import { ColumnConfig, UuidId } from "@/pages/formPage/types";
import THeader from "./THeader";
import TBody from "./TBody";

interface TableProps<T, U> {
  data: T[];
  name: keyof U;
  columns: ColumnConfig[][];
  setData: React.Dispatch<React.SetStateAction<U>>;
}

const DynamicTable = <T extends UuidId, U>({ columns, data, setData, name }: TableProps<T, U>) => {

  const addRow = () => {
    const newRow: T = columns.flat().reduce(
      (acc, column) => {
        if (column.field) {
          acc[column.field as keyof T] = column.defaultValue || "";
        }
        return acc;
      },
      { uuid: uuidv4(), id: null } as T
    );
  
    setData((prev) => ({ ...prev, [name]: [...(prev[name] as T[]), newRow] }));
  };

  return (
    <div className="rounded-lg">
      <table className="min-w-full min-h-40 block border-collapse border border-gray-300 bg-white overflow-auto">
        <THeader columns={columns} name={String(name)} />
        <TBody<T, U> data={data} columns={columns} name={name} setData={setData}/>
      </table>
      <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" type="button" onClick={addRow}>
        + Add Row
      </button>
    </div>
  );
};

export default DynamicTable;