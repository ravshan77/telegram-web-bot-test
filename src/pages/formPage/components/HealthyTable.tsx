import DynamicTable from "@/components/table/Table";
import { FieldType, localOptions } from "@/constants";
import { Values, ColumnConfig, AnketaHealthys, ChangeTable } from "../types";

interface Props {
  data: Values,
  name: keyof Values,
  setData: React.Dispatch<React.SetStateAction<Values>>,
  handleChangeTable: <T extends { id?: string | number; uuid?: string }>(params: ChangeTable<T>) => void;
}

const HealthyTable = ({ setData, data, name, handleChangeTable }: Props) => {

    const columns: ColumnConfig[][] = [
      [
        {
            title:"Savol",
            fieldType: FieldType.TEXT,
            field: "question",
            required: true,
            readOnly:true,
            className:"w-[300px]",
            onChange: handleChangeTable,
        },
        {
            title:"Javob",
            fieldType: FieldType.SELECT,
            field: "level",
            options: localOptions.switch,
            required: true,
            className:"w-[110px]",
            onChange: handleChangeTable,
        },
        {
            title:"Izoh",
            fieldType: FieldType.TEXT,
            field: "description",
            className:"w-[250px]",
            onChange: handleChangeTable,
        },
      ]
    ];
      

  return (
      <div>
        <label className="text-sm font-medium text-white"> Sog'ligingiz haqida ma'lumotlar? *</label>
        <div>
          <DynamicTable<AnketaHealthys> 
            columns={columns} 
            name={name} 
            data={data.anketa_healthys} 
            setData={setData} 
          />
        </div> 
      </div>
  )
}

export default HealthyTable