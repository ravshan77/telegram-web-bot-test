import { colorOptions, FieldType } from "@/constants";
import DynamicTable from "@/components/ui/table/Table";
import { Values, ColumnConfig, AnketaChildrens } from "../types";


interface Props {
  data: Values,
  setData: React.Dispatch<React.SetStateAction<Values>>,
}

interface ChangeTable {
  row: AnketaChildrens; 
  col: ColumnConfig; 
  new_value: string; 
}

const ChildrenTable = ({ setData, data }: Props) => {

    const handleChangeTable = ({ row, col, new_value } : ChangeTable) => {
        setData((prev) => {
          const table = prev.anketa_childrens;
          if (Array.isArray(table)) {
            const updatedTable = table.map((dta) => {
              if (dta?.uuid && row?.uuid && dta.uuid === row.uuid) {
                return { ...dta, [col.field]: new_value };
              } else if (dta?.id && row?.id && dta.id === row.id) {
                return { ...dta, [col.field]: new_value };
              }
              return dta;
            });
            return { ...prev, anketa_childrens: updatedTable };
          }
          return prev;
        });
    };

    const columns: ColumnConfig[][] = [
      [
        {
            title:"Kimi",
            fieldType: FieldType.TEXT,
            rowSpan:2,
            field: "name",
            placeholder: "Kim",
            required: true,
            className:"w-[200px]",
            onChange: ({ row, col, new_value }) => handleChangeTable({ row, col, new_value }),
        },
        {
            title:"Tug'ilgan sana",
            fieldType: FieldType.DATE,
            field: "date",
            onChange: ({ row, col, new_value }) => handleChangeTable({ row, col, new_value }),
        },
        {
            title:"Jinsi",
            fieldType: FieldType.SELECT,
            field: "gender",
            options: colorOptions,
            required: true,
            rowSpan:2,
            className:"w-[200px]",
            style:{ border:"", },
            onChange: ({ row, col, new_value }) => handleChangeTable({ row, col, new_value }),
        },
        {
            title:"O'chirish",
            field: "",
            rowSpan:2,
            fieldType: FieldType.DELETE_ROW,
            icon: "🗑️",
            className:"h-20 ",
        },
      ],
      [
        {
            title:"Jinsi",
            fieldType: FieldType.SELECT,
            field: "gender",
            options: colorOptions,
            required: true,
            className:"w-[200px]",
            onChange: ({ row, col, new_value }) => handleChangeTable({ row, col, new_value }),
        }
      ]
    ];
      

  return (
      <div>
        <label className="text-sm font-medium text-white"> 
        
         Children table</label>
        <div>
          <DynamicTable<AnketaChildrens, Values> 
            columns={columns} 
            name={"anketa_childrens"} 
            data={data.anketa_childrens} 
            setData={setData} 
          />
        </div> 
      </div>
  )
}

export default ChildrenTable