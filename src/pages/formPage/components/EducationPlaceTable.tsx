import { FieldType } from "@/constants";
import DynamicTable from "@/components/table/Table";
import { Values, ColumnConfig, EducationPlace } from "../types";
import { v4 as uuidv4 } from "uuid";

interface Props {
  data: Values,
  name: keyof Values,
  setData: React.Dispatch<React.SetStateAction<Values>>,
}

interface ChangeTable {
  row: EducationPlace; 
  col: ColumnConfig; 
  new_value: string; 
}

const EducationPlaceTable = ({ setData, data, name }: Props) => {

    const handleChangeTable = ({ row, col, new_value } : ChangeTable) => {
        setData((prev) => {
          const table = prev[name] as EducationPlace[];
          if (Array.isArray(table)) {
            const updatedTable = table.map((dta) => {
              if (dta?.uuid && row?.uuid && dta.uuid === row.uuid) {
                return { ...dta, [col.field]: new_value };
              } else if (dta?.id && row?.id && String(dta.id) === String(row.id)) {
                return { ...dta, [col.field]: new_value };
              }
              return dta;
            });
            return { ...prev, [name]: updatedTable };
          }
          return prev;
        });
    };


    const addRow = () => {
      const newRow: EducationPlace = columns.flat().reduce(
        (acc, column) => {
          if (column.field) {
            acc[column.field as keyof EducationPlace] = column?.defaultValue || "";
          }
          return acc;
        },
        { uuid: uuidv4(), id: null } as EducationPlace
      );
    
      setData((prev) => ({ ...prev, [name]: [...(prev[name] as EducationPlace[]), newRow] }));
    };

    const columns: ColumnConfig[][] = [
      [
        {
            title:"O'qishga qabul qilingan yil",
            fieldType: FieldType.DATE,
            field: "start_date",
            required: true,
            className:"min-w-[220px]",
            onChange: handleChangeTable,
        },
        {
            title:"Ta'lim muassasasi nomi",
            fieldType: FieldType.TEXT,
            field: "education_name",
            required: true,
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
            title:"O'qishni bitirgan yil",
            fieldType: FieldType.DATE,
            field: "end_date",
            required: true,
            onChange: handleChangeTable,
        },
        {
          title:"Mutaxassisligingiz",
          fieldType: FieldType.TEXT,
          field: "specialty",
          required: true,
          className:"min-w-[280px]",
          onChange: handleChangeTable,
      },
      ]
    ];
      

  return (
      <div>
        <label className="text-sm font-medium text-white"> <button onClick={addRow} type="button" className="bg-blue-500 text-white px-3 rounded hover:bg-blue-600" >+</button> Ta'lim muassasalari nomi va bitirgan yilingiz </label>
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