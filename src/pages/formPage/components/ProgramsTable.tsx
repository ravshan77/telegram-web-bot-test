import DynamicTable from "@/components/table/Table";
import { FieldType, localOptions } from "@/constants";
import { Values, ColumnConfig, AnketaPrograms } from "../types";
import { v4 as uuidv4 } from "uuid";
import { ChangeTable } from "../FormPage";

interface Props {
  data: Values,
  name: keyof Values,
  setData: React.Dispatch<React.SetStateAction<Values>>,
  handleChangeTable: <T extends { id?: string | number; uuid?: string }>(params: ChangeTable<T>) => void;
}

// interface ChangeTable {
//   new_value: string; 
//   col: ColumnConfig; 
//   row: AnketaPrograms; 
// }

const ProgramsTable = ({ setData, data, name, handleChangeTable }: Props) => {

  // const handleChangeTable = ({ row, col, new_value } : ChangeTable) => {
  //     setData((prev) => {
  //       const table = prev[name] as AnketaPrograms[];
  //       if (Array.isArray(table)) {
  //         const updatedTable = table.map((dta) => {
  //           if (dta?.uuid && row?.uuid && dta.uuid === row.uuid) {
  //             return { ...dta, [col.field]: new_value };
  //           } else if (dta?.id && row?.id && String(dta.id) === String(row.id)) {
  //             return { ...dta, [col.field]: new_value };
  //           }
  //           return dta;
  //         });
  //         return { ...prev, [name]: updatedTable };
  //       }
  //       return prev;
  //     });
  // };

  const addRow = () => {
    const newRow: AnketaPrograms = columns.flat().reduce(
      (acc, column) => {
        if (column.field) {
          acc[column.field as keyof AnketaPrograms] = column?.defaultValue || "";
        }
        return acc;
      },
      { uuid: uuidv4(), id: null } as AnketaPrograms
    );
  
    setData((prev) => ({ ...prev, [name]: [...(prev[name] as AnketaPrograms[]), newRow] }));
  };

  const columns: ColumnConfig[][] = [
    [
      {
          title:"Dastur",
          fieldType: FieldType.SELECT,
          field: "name",
          options: localOptions.programma,
          required: true,
          className:"min-w-[190px]",
          onChange: handleChangeTable,
      },
      {
          title:"Qay darajada",
          fieldType: FieldType.SELECT,
          field: "level",
          options: localOptions.degrees,
          required: true,
          className:"min-w-[120px] w-full",
          onChange: handleChangeTable,
      },
      {
          title:"O'chirish",
          field: "",
          fieldType: FieldType.DELETE_ROW,
      },
    ]
  ];
      

  return (
      <div>
        <label className="text-sm font-medium text-white"> <button onClick={addRow} type="button" className="bg-blue-500 text-white px-3 rounded hover:bg-blue-600" >+</button> Qaysi dasturlardan foydalana olasiz? </label>
        <div>
          <DynamicTable<AnketaPrograms> 
            columns={columns} 
            name={name} 
            data={data.anketa_progs} 
            setData={setData} 
          />
        </div> 
      </div>
  )
}

export default ProgramsTable