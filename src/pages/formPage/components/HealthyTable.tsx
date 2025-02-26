import DynamicTable from "@/components/table/Table";
import { FieldType, localOptions } from "@/constants";
import { Values, ColumnConfig, AnketaHealthys } from "../types";


interface Props {
  data: Values,
  setData: React.Dispatch<React.SetStateAction<Values>>,
}

interface ChangeTable {
  new_value: string; 
  col: ColumnConfig; 
  row: AnketaHealthys; 
}

const HealthyTable = ({ setData, data }: Props) => {

    const handleChangeTable = ({ row, col, new_value } : ChangeTable) => {
        setData((prev) => {
          const table = prev.anketa_healthys;
          if (Array.isArray(table)) {
            const updatedTable = table.map((dta) => {
              if (dta?.id && row?.id && dta.id === row.id) {
                return { ...dta, [col.field]: new_value };
              }
              return dta;
            });
            return { ...prev, anketa_healthys: updatedTable };
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
            onChange: ({ row, col, new_value }) => handleChangeTable({ row, col, new_value }),
        },
        {
            title:"Javob",
            fieldType: FieldType.SELECT,
            field: "level",
            options: localOptions.switch,
            required: true,
            className:"w-[110px]",
            onChange: ({ row, col, new_value }) => handleChangeTable({ row, col, new_value }),
        },
        {
            title:"Izoh",
            fieldType: FieldType.TEXT,
            field: "description",
            className:"w-[250px]",
            onChange: ({ row, col, new_value }) => handleChangeTable({ row, col, new_value }),
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