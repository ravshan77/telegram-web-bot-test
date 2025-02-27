import DynamicTable from "@/components/table/Table";
import { FieldType, localOptions } from "@/constants";
import { Values, ColumnConfig, AnketaChildrens } from "../types";
import { v4 as uuidv4 } from "uuid";

interface Props {
  data: Values,
  setData: React.Dispatch<React.SetStateAction<Values>>,
  name: keyof Values;
}

interface ChangeTable {
  new_value: string; 
  col: ColumnConfig; 
  row: AnketaChildrens; 
}

const AnketaChildrensTable = ({ setData, data, name }: Props) => {

  const handleChangeTable = ({ row, col, new_value } : ChangeTable) => {
      setData((prev) => {
        const table = prev[name] as AnketaChildrens[];
        if (Array.isArray(table)) {
          const updatedTable = table.map((dta) => {
            if (dta?.uuid && row?.uuid && dta.uuid === row.uuid) {
              return { ...dta, [col.field]: new_value };
            } else if (dta?.id && row?.id && String(dta.id) === String(row.id)) {
              return { ...dta, [col.field]: new_value };
            }
            return dta;
          });
          return { ...prev, [name]: updatedTable };
        }
        return prev;
      });
  };

  const columns: ColumnConfig[][] = [
    [
      {
          title:"Farzandi",
          fieldType: FieldType.SELECT,
          field: "gender",
          options: localOptions.gender_children,
          required: true,
          className:"min-w-[150px] w-full",
          style:{ border:"", },
          onChange: ({ row, col, new_value }) => handleChangeTable({ row, col, new_value }),
      },
      {
          title:"Tug'ilgan sana",
          fieldType: FieldType.DATE,
          className:"min-w-[150px] w-full",
          field: "date",
          onChange: ({ row, col, new_value }) => handleChangeTable({ row, col, new_value }),
      },
      {
          title:"O'chirish",
          field: "",
          fieldType: FieldType.DELETE_ROW,
      },
    ]
  ];


  const addRow = () => {
    const newRow: AnketaChildrens = columns.flat().reduce(
      (acc, column) => {
        if (column.field) {
          acc[column.field as keyof AnketaChildrens] = column?.defaultValue || "";
        }
        return acc;
      },
      { uuid: uuidv4(), id: null } as AnketaChildrens
    );
  
    setData((prev) => ({ ...prev, [name]: [...(prev[name] as AnketaChildrens[]), newRow] }));
  };
      

  return (
      <div>
        <label className="text-sm font-medium text-white"> <button onClick={addRow} type="button" className="bg-blue-500 text-white px-3 rounded hover:bg-blue-600" >+</button>  Farzandlari </label>
        <div>
          <DynamicTable<AnketaChildrens, Values> 
            columns={columns} 
            name={"anketa_childrens"} 
            data={data.anketa_childrens} 
            setData={setData} 
          />
        </div> 
      </div>
  )
}

export default AnketaChildrensTable;