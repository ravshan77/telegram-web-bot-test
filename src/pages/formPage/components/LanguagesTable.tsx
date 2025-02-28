import DynamicTable from "@/components/table/Table";
import { FieldType, localOptions } from "@/constants";
import { Values, ColumnConfig, AnketaLanguage, ChangeTable } from "../types";

interface Props {
  data: Values,
  name: keyof Values,
  setData: React.Dispatch<React.SetStateAction<Values>>,
  addRow: (args: { columns: ColumnConfig[][]; name: keyof Values }) => void;
  handleChangeTable: <T extends { id?: string | number; uuid?: string }>(params: ChangeTable<T>) => void;
}

const LanguagesTable = ({ setData, data, name, handleChangeTable, addRow }: Props) => {

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
      

  return (
      <div>
        <label className="text-sm font-medium text-white"> 
          <button onClick={() => addRow({ columns, name })} type="button" className="bg-blue-500 text-white px-3 rounded hover:bg-blue-600" >+</button> 
          Qaysi tillarni bilasiz? 
        </label>
        <div>
          <DynamicTable<AnketaLanguage> 
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