import { FieldType } from "@/constants";
import DynamicTable from "@/components/table/Table";
import { Values, ColumnConfig, EducationPlace } from "../types";

interface Props {
  data: Values,
  setData: React.Dispatch<React.SetStateAction<Values>>,
}

interface ChangeTable {
  row: EducationPlace; 
  col: ColumnConfig; 
  new_value: string; 
}

const EducationPlaceTable = ({ setData, data }: Props) => {

    const handleChangeTable = ({ row, col, new_value } : ChangeTable) => {
        setData((prev) => {
          const table = prev.education_place;
          if (Array.isArray(table)) {
            const updatedTable = table.map((dta) => {
              if (dta?.uuid && row?.uuid && dta.uuid === row.uuid) {
                return { ...dta, [col.field]: new_value };
              } else if (dta?.id && row?.id && dta.id === row.id) {
                return { ...dta, [col.field]: new_value };
              }
              return dta;
            });
            return { ...prev, education_place: updatedTable };
          }
          return prev;
        });
    };

    const columns: ColumnConfig[][] = [
      [
        {
            title:"O'qishga qaul qilingan yil",
            fieldType: FieldType.DATE,
            field: "start_date",
            required: true,
            className:"w-[200px]",
            onChange: ({ row, col, new_value }) => handleChangeTable({ row, col, new_value }),
        },
        {
            title:"Ta'lim muassasasi nomi",
            fieldType: FieldType.TEXT,
            field: "education_name",
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
            title:"O'qishni bitirgan yil",
            fieldType: FieldType.DATE,
            field: "end_date",
            required: true,
            className:"w-[200px]",
            onChange: ({ row, col, new_value }) => handleChangeTable({ row, col, new_value }),
        },
        {
          title:"Mutaxassisligingiz",
          fieldType: FieldType.TEXT,
          field: "specialty",
          required: true,
          className:"w-[200px]",
          onChange: ({ row, col, new_value }) => handleChangeTable({ row, col, new_value }),
      },
      ]
    ];
      

  return (
      <div>
        <label className="text-sm font-medium text-white"> Ta'lim muassasalari nomi va bitirgan yilingiz * </label>
        <div>
          <DynamicTable<EducationPlace, Values> 
            columns={columns} 
            name={"education_place"} 
            data={data.education_place} 
            setData={setData} 
          />
        </div> 
      </div>
  )
}

export default EducationPlaceTable