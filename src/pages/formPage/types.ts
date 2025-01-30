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
};

export interface ColumnConfig {
  title?: string;
  field: string; // T'dan olingan maydon nomlari
  icon?: React.ReactNode; // Belgilar uchun
  fieldType: "TEXT" | "DATE" | "SELECT" | "DELETE_ROW"; // Maydon turi
  options?: TOption[]; // Tanlash uchun opsiyalar
  defaultValue?: any; // Default qiymat
  required?: boolean; // Majburiy maydonmi
  disabled?: boolean; // Disabled holati
  placeholder?:string;
  rowSpan?: number; // Qatorni birlashtirish (rowSpan)
  colSpan?: number; // Ustunni birlashtirish (colSpan)
  className?: string; // CSS sinfi
  style?: React.CSSProperties; // Inline stil
  onChange?: (params: { row: any; col: ColumnConfig; new_value: any }) => void; // Maxsus o'zgarishlarni boshqarish
  onClick?: (params: any) => void; // Maxsus bosish uchun
}

export interface TOption {
  value: string | number;
  label: string;
}
export interface ChildrenData {
  gender: string;
  date?: Date | null;
  uuid?: string;
  id?: null | number;
  name: string
}
export interface RowData {
  uuid: string;
  name: string;
  date: Date | null;
  category: string;
  children_data: ChildrenData;
}


export interface UuidId {
  uuid?:string;
  id?: number | null;
  [key: string]: any; // Indeksator qo'shildi 
}