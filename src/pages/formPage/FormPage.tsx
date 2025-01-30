import { useState } from "react";
import { FieldType } from "@/constants";
import Select from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { User2, Plus, Phone } from "lucide-react";
import DynamicTable from "@/components/ui/table/Table";
import ImageUploader from "@/components/ui/uploadImage";
import { ChildrenData, ColumnConfig, IFormData, TOption, UuidId } from "./types";

const colorOptions: TOption[] = [
  { value: "slate", label: "Slate" },
  { value: "green", label: "Green" },
  { value: "purple", label: "Purple" },
  { value: "orange", label: "Orange" },
  { value: "yellow", label: "Yellow" },
  { value: "forest", label: "Forest" },
  { value: "silver", label: "Silver" },
  { value: "red", label: "Red" },
  { value: "ocean", label: "Ocean" },
  { value: "blue", label: "Blue" },
];

const children_data: ChildrenData[] = [
  {
    name: "", gender: "ўғил", date: null, uuid: "m52dz7aiq0tzyncho5", id: 1,
  },
  {
    name: "", gender: "ўғил", date: null, uuid: "m52dz7aiq0tzyncho5", id: 1,
  },
  {
    name: "", gender: "ўғил", date: null, uuid: "m52dz7aiq0tzyncho5", id: 1,
  },
  {
    name: "", gender: "ўғил", date: null, uuid: "m52dz7aiq0tzyncho5", id: 1,
  },
];

const initial_values: IFormData = {
  phone: "",
  email: "",
  company: "",
  fullName: "",
  dateOfBirth: "",
  shaxsiy_image:"",
  pasport_image:"",
  back_pasport_image:"",
  children_data: children_data,
};

export function FormPage() {
  const [loading] = useState(false);
  const [data, setData] = useState(initial_values);

  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault() };

  const handleChangeTable = <K extends keyof IFormData, T extends UuidId>({ row, col, new_value, table_name }: { row: T; col: ColumnConfig; new_value: string; table_name: K }) => {
    setData((prev) => {
      const table = prev[table_name];
      if (Array.isArray(table)) {
        console.log(new_value);
        
        const updatedTable = table.map((dta) => {
          if (dta?.uuid && row?.uuid && dta.uuid === row.uuid) {
            return { ...dta, [col.field]: new_value };
          } else if (dta?.id && row?.id && dta.id === row.id) {
            return { ...dta, [col.field]: new_value };
          }
          return dta;
        });
        return { ...prev, [table_name]: updatedTable };
      }
      return prev;
    });
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement> | { name: string; value: any }) => {
    if ("target" in e) {
      setData((prev_values) => ({ ...prev_values, [e.target.name]: e.target.value }))
    } else{
      setData((prev_values) => ({ ...prev_values, [e.name]: e.value }))
      
    }
  }

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
        onChange: ({ row, col, new_value }) => handleChangeTable<"children_data",ChildrenData>({ row, col, new_value, table_name: "children_data" }),
      },
      {
        title:"Tug'ilgan sana",
        fieldType: FieldType.DATE,
        field: "date",
        onChange: ({ row, col, new_value }) => handleChangeTable<"children_data",ChildrenData>({ row, col, new_value, table_name: "children_data" }),
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
        onChange: ({ row, col, new_value }) => handleChangeTable<"children_data",ChildrenData>({ row, col, new_value, table_name: "children_data" }),
      },
      {
        title:"O'chirish",
        field: "",
        rowSpan:2,
        fieldType: FieldType.DELETE_ROW,
        icon: "🗑️",
        style: { textAlign: "center", },
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
        onChange: ({ row, col, new_value }) => handleChangeTable<"children_data",ChildrenData>({ row, col, new_value, table_name: "children_data" }),
      },
    ]
  ];
  

  return (
    <div className="px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Anketa</h1>
        <p className="mt-2 text-gray-600"> Пожалуйста заполните форму</p>
      </div>

      <form onSubmit={handleSubmit} className="">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">ФИО</label>
          <div className="relative bg-white rounded-md">
            <Input value={data.fullName} name="fullName" autoFocus onChange={handleChangeInput} disabled={loading} placeholder="Введите ваше полное имя" />
            <User2 className="absolute right-3 top-2 h-6 w-6 text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white"> Дата рождения </label>
          <div className="relative">
            <Input name="dateOfBirth" value={data.dateOfBirth} type="date" disabled={loading} onChange={handleChangeInput} />
            <Phone className="absolute right-3 top-2 h-6 w-6 text-gray-400" />
          </div>
        </div> 

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Select</label>
          <div className="relative">
            <Select
              name={"company"}
              options={colorOptions}
              value={data.company}
              onChange={(target) => setData((prev_values) => ({ ...prev_values, ["company" as keyof IFormData]: target?.value }))}
              required
            />
          </div>
        </div>


        <div className="flex justify-between">
          <div className="space-y-2 border border-red-500 w-44">
            <label className="text-sm font-medium text-white">Upload img </label>
            <div className="relative">
              <ImageUploader value={data.shaxsiy_image} onChange={handleChangeInput} name={"shaxsiy_image"} />
            </div>
          </div>

          <div className="space-y-2 border border-red-500 w-44">
            <label className="text-sm font-medium text-white">Upload img </label>
            <div className="relative">
              <ImageUploader value={data.pasport_image} onChange={handleChangeInput} name="pasport_image" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex">
            <Plus className="bg-white mr-3"/>
            <label className="text-sm font-medium text-white">Select</label>
          </div>
          <div className="relative">
            <DynamicTable<ChildrenData, IFormData>
              columns={columns}
              name={"children_data"}
              data={data.children_data}
              setData={setData}
            />
          </div>
        </div>

        <div className="space-y-2 border border-red-500 w-48">
          <label className="text-sm font-medium text-white">Upload img </label>
          <div className="relative">
            <ImageUploader value={data.back_pasport_image} onChange={handleChangeInput} name="back_pasport_image" />
          </div>
        </div>

      </form>
    </div>
  );
}