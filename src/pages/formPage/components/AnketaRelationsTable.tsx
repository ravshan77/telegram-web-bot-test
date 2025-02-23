import DynamicTable from "@/components/table/Table";
import { FieldType, localOptions } from "@/constants";
import { Values, ColumnConfig, AnketaRelations } from "../types";


interface Props {
  data: Values,
  setData: React.Dispatch<React.SetStateAction<Values>>,
}

interface ChangeTable {
  row: AnketaRelations; 
  col: ColumnConfig; 
  new_value: string; 
}

const AnketaRelationsTable = ({ setData, data }: Props) => {

    const handleChangeTable = ({ row, col, new_value } : ChangeTable) => {
        setData((prev) => {
          const table = prev.anketa_relations;
          if (Array.isArray(table)) {
            const updatedTable = table.map((dta) => {
              if (dta?.uuid && row?.uuid && dta.uuid === row.uuid) {
                return { ...dta, [col.field]: new_value };
              } else if (dta?.id && row?.id && dta.id === row.id) {
                return { ...dta, [col.field]: new_value };
              }
              return dta;
            });
            return { ...prev, anketa_relations: updatedTable };
          }
          return prev;
        });
    };

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
            title:"Qayerda ishlaydi yoki o'qiydi",
            fieldType: FieldType.TEXT,
            field: "job",
            required: true,
            className:"w-[200px]",
            onChange: ({ row, col, new_value }) => handleChangeTable({ row, col, new_value }),
        }
      ]
    ];
      

  return (
      <div>
        <label className="text-sm font-medium text-white"> Oliaviy tarkibingiz </label>
        <div>
          <DynamicTable<AnketaRelations, Values> 
            columns={columns} 
            name={"anketa_relations"} 
            data={data.anketa_relations} 
            setData={setData} 
          />
        </div> 
      </div>
  )
}

export default AnketaRelationsTable