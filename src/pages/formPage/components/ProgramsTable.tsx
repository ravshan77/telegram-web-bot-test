import DynamicTable from "@/components/table/Table";
import { FieldType, localOptions } from "@/constants";
import { Values, ColumnConfig, AnketaPrograms } from "../types";


interface Props {
  data: Values,
  setData: React.Dispatch<React.SetStateAction<Values>>,
}

interface ChangeTable {
  new_value: string; 
  col: ColumnConfig; 
  row: AnketaPrograms; 
}

const ProgramsTable = ({ setData, data }: Props) => {

  const handleChangeTable = ({ row, col, new_value } : ChangeTable) => {
      setData((prev) => {
        const table = prev.anketa_progs;
        if (Array.isArray(table)) {
          const updatedTable = table.map((dta) => {
            if (dta?.uuid && row?.uuid && dta.uuid === row.uuid) {
              return { ...dta, [col.field]: new_value };
            } else if (dta?.id && row?.id && String(dta.id) === String(row.id)) {
              return { ...dta, [col.field]: new_value };
            }
            return dta;
          });
          return { ...prev, anketa_progs: updatedTable };
        }
        return prev;
      });
  };

  const columns: ColumnConfig[][] = [
    [
      {
          title:"Dastur",
          fieldType: FieldType.SELECT,
          field: "name",
          options: localOptions.programma,
          required: true,
          className:"min-w-[190px]",
          onChange: ({ row, col, new_value }) => handleChangeTable({ row, col, new_value }),
      },
      {
          title:"Qay darajada",
          fieldType: FieldType.SELECT,
          field: "level",
          options: localOptions.degrees,
          required: true,
          className:"min-w-[120px] w-full",
          onChange: ({ row, col, new_value }) => handleChangeTable({ row, col, new_value }),
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
        <label className="text-sm font-medium text-white"> Qaysi dasturlardan foydalana olasiz? </label>
        <div>
          <DynamicTable<AnketaPrograms, Values> 
            columns={columns} 
            name={"anketa_progs"} 
            data={data.anketa_progs} 
            setData={setData} 
          />
        </div> 
      </div>
  )
}

export default ProgramsTable