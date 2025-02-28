import DynamicTable from "@/components/table/Table";
import { FieldType, localOptions } from "@/constants";
import { Values, ColumnConfig, AnketaPrograms, ChangeTable } from "../types";

interface Props {
  data: Values,
  name: keyof Values,
  setData: React.Dispatch<React.SetStateAction<Values>>,
  addRow: (args: { columns: ColumnConfig[][]; name: keyof Values }) => void;
  handleChangeTable: <T extends { id?: string | number; uuid?: string }>(params: ChangeTable<T>) => void;
}

const ProgramsTable = ({ setData, data, name, handleChangeTable, addRow }: Props) => {

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
        <label className="text-sm font-medium text-white"> 
          <button onClick={() => addRow({ columns, name })} type="button" className="bg-blue-500 text-white px-3 rounded hover:bg-blue-600" >+</button> 
          Qaysi dasturlardan foydalana olasiz? 
        </label>
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