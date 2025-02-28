import DynamicTable from "@/components/table/Table";
import { FieldType, localOptions } from "@/constants";
import { Values, ColumnConfig, AnketaRelations, ChangeTable } from "../types";


interface Props {
  data: Values,
  name: keyof Values,
  setData: React.Dispatch<React.SetStateAction<Values>>,
  addRow: (args: { columns: ColumnConfig[][]; name: keyof Values }) => void;
  handleChangeTable: <T extends { id?: string | number; uuid?: string }>(params: ChangeTable<T>) => void;
}

const AnketaRelationsTable = ({ setData, data, name, handleChangeTable, addRow }: Props) => {

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
        <label className="text-sm font-medium text-white"> 
          <button onClick={() => addRow({ columns, name })} type="button" className="bg-blue-500 text-white px-3 rounded hover:bg-blue-600" >+</button> 
          Oliaviy tarkibingiz 
        </label>
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