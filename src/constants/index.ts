import { ChildrenData, IFormData, TMultiOption, TOption } from "@/pages/formPage/types";
const enum FieldType {
  TEXT = "TEXT",
  DATE = "DATE",
  SELECT= "SELECT",
  DELETE_ROW = "DELETE_ROW",
}


const colorOptions: TOption[] = [
  { id: "slate", name: "Slate" },
  { id: "green", name: "Green" },
  { id: "purple", name: "Purple" },
  { id: "orange", name: "Orange" },
  { id: "yellow", name: "Yellow" },
  { id: "forest", name: "Forest" },
  { id: "silver", name: "Silver" },
  { id: "red", name: "Red" },
  { id: "ocean", name: "Ocean" },
  { id: "blue", name: "Blue" }
];

  const positionsOptions: TMultiOption[] = [
    { id: "slate", label: "Slate", value: "Slate" },
    { id: "green", label: "Green", value: "Green" },
    { id: "purple", label: "Purple", value: "Purple" },
    { id: "orange", label: "Orange", value: "Orange" },
    { id: "yellow", label: "Yellow", value: "Yellow" },
    { id: "forest", label: "Forest", value: "Forest" },
    { id: "silver", label: "Silver", value: "Silver" },
  ]

const children_data: ChildrenData[] = [
  {
    name: "", gender: "ўғил", date: null, id: 1,
  },
];

const initial_values: IFormData = {
  phone: "",
  email: "",
  company: "",
  fullName: "",
  positons:[],
  dateOfBirth: "",
  shaxsiy_image:"",
  pasport_image:"",
  back_pasport_image:"",
  children_data: children_data,
};


export { colorOptions, children_data, initial_values, positionsOptions, FieldType }


  