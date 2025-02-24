import { FieldType } from "@/constants";
import DynamicTable from "@/components/table/Table";
import { Values, ColumnConfig, AnketaWorkedBefores } from "../types";

interface Props {
  data: Values,
  setData: React.Dispatch<React.SetStateAction<Values>>,
}

interface ChangeTable {
  row: AnketaWorkedBefores; 
  col: ColumnConfig; 
  new_value: string; 
}

const WorkedBeforesTable = ({ setData, data }: Props) => {

    const handleChangeTable = ({ row, col, new_value } : ChangeTable) => {
        setData((prev) => {
          const table = prev.anketa_worked_befores;
          if (Array.isArray(table)) {
            const updatedTable = table.map((dta) => {
              if (dta?.uuid && row?.uuid && dta.uuid === row.uuid) {
                return { ...dta, [col.field]: new_value };
              } else if (dta?.id && row?.id && dta.id === row.id) {
                return { ...dta, [col.field]: new_value };
              }
              return dta;
            });
            return { ...prev, anketa_worked_befores: updatedTable };
          }
          return prev;
        });
    };

    const columns: ColumnConfig[][] = [
      [
        {
            title:"Ishga qabul qilingan sana",
            fieldType: FieldType.DATE,
            field: "start_date",
            required: true,
            className:"w-[200px]",
            onChange: ({ row, col, new_value }) => handleChangeTable({ row, col, new_value }),
        },
        {
            title:"Ish joyi nomi",
            fieldType: FieldType.TEXT,
            field: "company_name",
            className:"w-[280px]",
            required: true,
            onChange: ({ row, col, new_value }) => handleChangeTable({ row, col, new_value }),
        },
        {
            title:"O'chirish",
            field: "",
            rowSpan:2,
            fieldType: FieldType.DELETE_ROW,
            icon: "🗑️",
            className:"h-20",
        },
      ],
      [
        {
            title:"Ishdan bo'shagan sana",
            fieldType: FieldType.DATE,
            field: "end_date",
            required: true,
            onChange: ({ row, col, new_value }) => handleChangeTable({ row, col, new_value }),
        },
        {
          title:"Lavozimingiz",
          fieldType: FieldType.TEXT,
          field: "position",
          required: true,
        //   className:"w-[200px]",
          onChange: ({ row, col, new_value }) => handleChangeTable({ row, col, new_value }),
      },
      ]
    ];
      

  return (
      <div>
        <label className="text-sm font-medium text-white"> Qayerda qachon va kim bo'lib ishlagansiz?. Sizning rasmiy va norasmiy ish tajribangiz biz uchun muhim. * </label>
        <div>
          <DynamicTable<AnketaWorkedBefores, Values> 
            columns={columns} 
            name={"anketa_worked_befores"} 
            data={data.anketa_worked_befores} 
            setData={setData} 
          />
        </div> 
      </div>
  )
}

export default WorkedBeforesTable