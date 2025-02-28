import { FieldType } from "@/constants";
import DynamicTable from "@/components/table/Table";
import { Values, ColumnConfig, AnketaWorkedBefores } from "../types";
import { v4 as uuidv4 } from "uuid";
import { ChangeTable } from "../FormPage";


interface Props {
  data: Values,
  name: keyof Values,
  setData: React.Dispatch<React.SetStateAction<Values>>,
  handleChangeTable: <T extends { id?: string | number; uuid?: string }>(params: ChangeTable<T>) => void;
}

// interface ChangeTable<T extends { id?: string | number; uuid?: string }> {
//   row: T;
//   col: ColumnConfig;
//   new_value: string;
// }

const WorkedBeforesTable = ({ setData, data, name, handleChangeTable }: Props) => {

  // const handleChangeTable = <T extends { id?: string | number; uuid?: string }>({ row, col, new_value }: ChangeTable<T>) => {
  //   setData((prev) => {
  //     if (Array.isArray(prev[name])) {
  //       const table = prev[name] as T[];
  //       const updatedTable = table.map((dta) => {
  //         if ((dta.uuid && row.uuid && dta.uuid === row.uuid) || 
  //             (dta.id && row.id && String(dta.id) === String(row.id))) {
  //           return { ...dta, [col.field]: new_value };
  //         }
  //         return dta;
  //       });
  
  //       return { ...prev, [name]: updatedTable };
  //     }
  
  //     return prev;
  //   });
  // };


  const addRow = () => {
    const newRow: AnketaWorkedBefores = columns.flat().reduce((acc, column) => {
      if (column.field) {
        acc[column.field as keyof AnketaWorkedBefores] = column?.defaultValue || "";
      }
        return acc;
      },
      { uuid: uuidv4(), id: null } as AnketaWorkedBefores
    );
  
    setData((prev) => ({ ...prev, [name]: [...(prev[name] as AnketaWorkedBefores[]), newRow] }));
  };

  const columns: ColumnConfig[][] = [
    [
      {
          title:"Ishga qabul qilingan sana",
          fieldType: FieldType.DATE,
          field: "start_date",
          required: true,
          className:"min-w-[210px] w-full",
          onChange: handleChangeTable,
      },
      {
          title:"Ish joyi nomi",
          fieldType: FieldType.TEXT,
          field: "company_name",
          className:"min-w-[280px]",
          required: true,
          onChange: handleChangeTable,
      },
      {
          title:"O'chirish",
          field: "",
          rowSpan:2,
          fieldType: FieldType.DELETE_ROW,
          icon: "🗑️",
          className:"h-20",
      },
    ],
    [
      {
          title:"Ishdan bo'shagan sana",
          fieldType: FieldType.DATE,
          field: "end_date",
          required: true,
          onChange: handleChangeTable,
      },
      {
        title:"Lavozimingiz",
        fieldType: FieldType.TEXT,
        field: "position",
        required: true,
        onChange: handleChangeTable,
    },
    ]
  ];
      

  return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-white"> <button onClick={addRow} type="button" className="bg-blue-500 text-white px-3 rounded hover:bg-blue-600" >+</button> Qayerda qachon va kim bo'lib ishlagansiz?. Sizning rasmiy va norasmiy ish tajribangiz biz uchun muhim. </label>
        <div>
          <DynamicTable<AnketaWorkedBefores> 
            columns={columns} 
            name={name} 
            data={data.anketa_worked_befores} 
            setData={setData} 
          />
        </div> 
      </div>
  )
}

export default WorkedBeforesTable