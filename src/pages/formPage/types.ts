export type ColumnConfig = {
  title?: string;
  field: string;
  icon?: React.ReactNode;
  fieldType: "TEXT" | "DATE" | "SELECT" | "DELETE_ROW";
  options?: SingleOption[];
  defaultValue?: any;
  required?: boolean;
  disabled?: boolean;
  readOnly?:boolean;
  placeholder?: string;
  rowSpan?: number;
  colSpan?: number;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (params: { row: any; col: ColumnConfig; new_value: any, name: keyof Values }) => void;
  onClick?: (params: any) => void;
}

export interface ChangeTable<T extends { id?: string | number; uuid?: string }> {
  row: T;
  col: ColumnConfig;
  new_value: string;
  name: keyof Values
}

export interface SingleOption {
  id: string | number;
  name: string;
}

export interface MultiOption {
  id: string | number;
  label: string;
  value: string;
}
export interface UuidId {
  uuid?: string;
  id?: string | number | null;
  // [key: string]: any;
}

export type AnketaChildrens = {
  gender: "ўғил" | "қиз" | "";
  date: string;
  uuid?: string;
  id: string | number | null;
};

export type AnketaHealthys = {
  question: string;
  status: "1" | "2" | "";
  id: string | number | null;
  description: string;
  isGender: boolean;
  inputId: string
};

export type AnketaRelations = {
  who: string;
  date: string;
  job: string;
  uuid?: string;
  id: string | number | null;
};

export type PositionsTypes = {
  label: string;
  value: string;
  id: number;
};

export type EducationPlace = {
  start_date: string;
  education_name: string;
  end_date: string;
  specialty: string;
  uuid?: string;
  id: string | number | null;
};

export type AnketaLanguage = {
  name: string;
  level: string;
  uuid?: string;
  id: string | number | null;
};

export type AnketaPrograms = {
  name: string;
  level: string;
  uuid?: string;
  id: string | number | null;
};

export type AnketaWorkedBefores = {
  start_date: string;
  end_date: string;
  company_name: string;
  position: string;
  uuid?: string;
  id: string | number | null;
};

type Swetcher = "1" | "2" | "";


export type Values = {
  age: string;
  anketa_childrens: AnketaChildrens[];
  position: PositionsTypes[];
  payload: string;
  eddition_phone_number: string;
  first_name: string;
  last_name: string;
  father_name: string;
  gender: Swetcher;
  anketa_healthys: AnketaHealthys[];
  martial_status: "Турмуш_курган" | "Турмуш_курмаган" | "Ажрашган" | "";
  anketa_relations: AnketaRelations[];
  education: string;
  education_place: EducationPlace[];
  height: string;
  now_study: Swetcher;
  type_education: "Кундузги" | "Кечки" | "Сиртқи" | "Масофавий" | "";
  anketa_languages: AnketaLanguage[];
  state_id: string;
  region_id: string;
  address: string;
  relation_company: string;
  branch_id: string;
  worked_company: Swetcher;
  citizen: Swetcher;
  job_now: Swetcher;
  anketa_progs: AnketaPrograms[];
  other_info: string;
  anketa_worked_befores: AnketaWorkedBefores[];
  salary_last_job: string;
  is_car: Swetcher;
  about_car: string;
  trip: Swetcher;
  about_vacancy: string;
  whether_convicted: Swetcher;
  whether_convicted_description: string;
  image: string;
  pasport_type: "Оддий" | "ID карта" | "" ;
  pasport_image_first: string;
  pasport_image_second: string;
};
