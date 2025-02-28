import DynamicTable from "@/components/table/Table";
import { FieldType, localOptions } from "@/constants";
import { Values, ColumnConfig, AnketaRelations } from "../types";
import { v4 as uuidv4 } from "uuid";
import { ChangeTable } from "../FormPage";


interface Props {
  data: Values,
  name: keyof Values,
  setData: React.Dispatch<React.SetStateAction<Values>>,
  handleChangeTable: <T extends { id?: string | number; uuid?: string }>(params: ChangeTable<T>) => void;
}

// interface ChangeTable {
//   row: AnketaRelations; 
//   col: ColumnConfig; 
//   new_value: string; 
// }

const AnketaRelationsTable = ({ setData, data, name, handleChangeTable }: Props) => {

    // const handleChangeTable = ({ row, col, new_value } : ChangeTable) => {
    //     setData((prev) => {
    //       const table = prev[name] as AnketaRelations[];
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
      const newRow: AnketaRelations = columns.flat().reduce(
        (acc, column) => {
          if (column.field) {
            acc[column.field as keyof AnketaRelations] = column?.defaultValue || "";
          }
          return acc;
        },
        { uuid: uuidv4(), id: null } as AnketaRelations
      );
    
      setData((prev) => ({ ...prev, [name]: [...(prev[name] as AnketaRelations[]), newRow] }));
    };

    const columns: ColumnConfig[][] = [
      [
        {
            title:"Kimi",
            fieldType: FieldType.SELECT,
            rowSpan:2,
            field: "who",
            placeholder: "Kim",
            required: true,
            options: localOptions.kinship,
            className:"w-[180px]",
            onChange: handleChangeTable,
        },
        {
            title:"Tug'ilgan sana",
            fieldType: FieldType.DATE,
            field: "date",
            onChange: handleChangeTable,
        },
        {
            title:"O'chirish",
            field: "",
            rowSpan:2,
            fieldType: FieldType.DELETE_ROW,
        },
      ],
      [
        {
            title:"Qayerda ishlaydi yoki o'qiydi",
            fieldType: FieldType.TEXT,
            field: "job",
            required: true,
            className:"w-[270px]",
            onChange: handleChangeTable,
        }
      ]
    ];
      

  return (
      <div>
        <label className="text-sm font-medium text-white"> <button onClick={addRow} type="button" className="bg-blue-500 text-white px-3 rounded hover:bg-blue-600" >+</button> Oliaviy tarkibingiz </label>
        <div>
          <DynamicTable<AnketaRelations> 
            columns={columns} 
            name={name} 
            data={data.anketa_relations} 
            setData={setData} 
          />
        </div> 
      </div>
  )
}

export default AnketaRelationsTable