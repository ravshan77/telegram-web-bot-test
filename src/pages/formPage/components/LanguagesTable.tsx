import DynamicTable from "@/components/table/Table";
import { FieldType, localOptions } from "@/constants";
import { Values, ColumnConfig, AnketaLanguage } from "../types";
import { v4 as uuidv4 } from "uuid";

interface Props {
  data: Values,
  name: keyof Values,
  setData: React.Dispatch<React.SetStateAction<Values>>,
}

interface ChangeTable {
  new_value: string; 
  col: ColumnConfig; 
  row: AnketaLanguage; 
}

const LanguagesTable = ({ setData, data, name }: Props) => {

    const handleChangeTable = ({ row, col, new_value } : ChangeTable) => {
        setData((prev) => {
          const table = prev[name] as AnketaLanguage[] ;
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
            title:"Til",
            fieldType: FieldType.SELECT,
            field: "name",
            options: localOptions.languages,
            required: true,
            className:"min-w-[160px]",
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
      
    const addRow = () => {
      const newRow: AnketaLanguage = columns.flat().reduce(
        (acc, column) => {
          if (column.field) {
            acc[column.field as keyof AnketaLanguage] = column?.defaultValue || "";
          }
          return acc;
        },
        { uuid: uuidv4(), id: null } as AnketaLanguage
      );
    
      setData((prev) => ({ ...prev, [name]: [...(prev[name] as AnketaLanguage[]), newRow] }));
    };

  return (
      <div>
        <label className="text-sm font-medium text-white"> <button onClick={addRow} type="button" className="bg-blue-500 text-white px-3 rounded hover:bg-blue-600" >+</button> Qaysi tillarni bilasiz? </label>
        <div>
          <DynamicTable<AnketaLanguage, Values> 
            columns={columns} 
            name={"anketa_languages"} 
            data={data.anketa_languages} 
            setData={setData} 
          />
        </div> 
      </div>
  )
}

export default LanguagesTable