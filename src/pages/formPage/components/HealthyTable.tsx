import DynamicTable from "@/components/table/Table";
import { FieldType, localOptions } from "@/constants";
import { Values, ColumnConfig, AnketaHealthys } from "../types";

interface Props {
  data: Values,
  name: keyof Values,
  setData: React.Dispatch<React.SetStateAction<Values>>,
}
interface ChangeTable {
  new_value: string; 
  col: ColumnConfig; 
  row: AnketaHealthys; 
}

const HealthyTable = ({ setData, data, name }: Props) => {

    const handleChangeTable = ({ row, col, new_value } : ChangeTable) => {
        setData((prev) => {
          const table = prev[name] as AnketaHealthys[];
          if (Array.isArray(table)) {
            const updatedTable = table.map((dta) => {
              if (dta?.id && row?.id && String(dta.id) === String(row.id)) {
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
          <DynamicTable<AnketaHealthys, Values> 
            columns={columns} 
            name={"anketa_healthys"} 
            data={data.anketa_healthys} 
            setData={setData} 
          />
        </div> 
      </div>
  )
}

export default HealthyTable