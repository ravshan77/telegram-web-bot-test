export type IFormData = {
  fullName: string;
  phone: string;
  email: string;
  company: string;
  dateOfBirth: string;
  children_data: ChildrenData[];
  pasport_image: string;
  shaxsiy_image: string;
  back_pasport_image: string;
  positons: TMultiOption[]
};

export interface ColumnConfig {
  title?: string;
  field: string; 
  icon?: React.ReactNode;
  fieldType: "TEXT" | "DATE" | "SELECT" | "DELETE_ROW"; 
  options?: TOption[];
  defaultValue?: any; 
  required?: boolean; 
  disabled?: boolean;
  placeholder?:string;
  rowSpan?: number; 
  colSpan?: number; 
  className?: string; 
  style?: React.CSSProperties;
  onChange?: (params: { row: any; col: ColumnConfig; new_value: any }) => void; 
  onClick?: (params: any) => void; 
}
export interface TOption {
  id: string | number;
  name: string;
}

export interface TMultiOption {
  id: string | number;
  label: string;
  value: string
}
export interface ChildrenData {
  gender: string;
  date?: Date | null;
  uuid?: string;
  id?: null | number;
  name: string
}
export interface UuidId {
  uuid?:string;
  id?: number | null;
  // [key: string]: any;
}