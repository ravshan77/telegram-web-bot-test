import { FieldType } from "@/constants";
import DynamicTable from "@/components/table/Table";
import { Values, ColumnConfig, EducationPlace, ChangeTable } from "../types";

interface Props {
  data: Values,
  name: keyof Values,
  setData: React.Dispatch<React.SetStateAction<Values>>,
  addRow: (args: { columns: ColumnConfig[][]; name: keyof Values }) => void;
  handleChangeTable: <T extends { id?: string | number; uuid?: string }>(params: ChangeTable<T>) => void;
}

const EducationPlaceTable = ({ setData, data, name, handleChangeTable, addRow }: Props) => {

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
        <label className="text-sm font-medium text-white"> 
          <button onClick={() => addRow({ columns, name })} type="button" className="bg-blue-500 text-white px-3 rounded hover:bg-blue-600" >+</button> 
          Ta'lim muassasalari nomi va bitirgan yilingiz 
        </label>
        <div>
          <DynamicTable<EducationPlace> 
            columns={columns} 
            name={name} 
            data={data.education_place} 
            setData={setData} 
          />
        </div> 
      </div>
  )
}

export default EducationPlaceTable