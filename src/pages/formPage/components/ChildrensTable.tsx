import DynamicTable from "@/components/table/Table";
import { FieldType, localOptions } from "@/constants";
import { Values, ColumnConfig, AnketaChildrens, ChangeTable } from "../types";

interface Props {
  data: Values,
  name: keyof Values;
  setData: React.Dispatch<React.SetStateAction<Values>>,
  addRow: (args: { columns: ColumnConfig[][]; name: keyof Values }) => void;
  handleChangeTable: <T extends { id?: string | number; uuid?: string }>(params: ChangeTable<T>) => void;
}

const AnketaChildrensTable = ({ setData, data, name, handleChangeTable, addRow }: Props) => {

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
          onChange: handleChangeTable,
      },
      {
          title:"Tug'ilgan sana",
          fieldType: FieldType.DATE,
          className:"min-w-[150px] w-full",
          field: "date",
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
          <button onClick={() => addRow({ columns, name })} type="button" className="bg-blue-500 text-white px-3 mr-2 rounded hover:bg-blue-600" >+</button> 
          Farzandlari 
        </label>
        <div>
          <DynamicTable<AnketaChildrens> 
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