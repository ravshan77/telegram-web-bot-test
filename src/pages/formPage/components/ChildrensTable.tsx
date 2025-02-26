import DynamicTable from "@/components/table/Table";
import { FieldType, localOptions } from "@/constants";
import { Values, ColumnConfig, AnketaChildrens } from "../types";

interface Props {
  data: Values,
  setData: React.Dispatch<React.SetStateAction<Values>>,
}

interface ChangeTable {
  new_value: string; 
  col: ColumnConfig; 
  row: AnketaChildrens; 
}

const AnketaChildrensTable = ({ setData, data }: Props) => {

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
          title:"Farzandi",
          fieldType: FieldType.SELECT,
          field: "gender",
          options: localOptions.gender_children,
          required: true,
          className:"min-w-[150px] w-full",
          style:{ border:"", },
          onChange: ({ row, col, new_value }) => handleChangeTable({ row, col, new_value }),
      },
      {
          title:"Tug'ilgan sana",
          fieldType: FieldType.DATE,
          className:"min-w-[150px] w-full",
          field: "date",
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
        <label className="text-sm font-medium text-white"> Farzandlari </label>
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

export default AnketaChildrensTable