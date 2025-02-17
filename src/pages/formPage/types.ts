export type ColumnConfig = {
  title?: string;
  field: string;
  icon?: React.ReactNode;
  fieldType: "TEXT" | "DATE" | "SELECT" | "DELETE_ROW";
  options?: SingleOption[];
  defaultValue?: any;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  rowSpan?: number;
  colSpan?: number;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (params: { row: any; col: ColumnConfig; new_value: any }) => void;
  onClick?: (params: any) => void;
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
export interface ChildrenData {
  gender: string;
  date?: Date | null;
  uuid?: string;
  id?: null | number;
  name: string;
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

type AnketaHealthys = {
  question: string;
  status: "1" | "2" | "";
  id: string | number | null;
  description: string;
  isGender: boolean;
  inputId: string
};

type AnketaRelations = {
  who: string;
  date: string;
  job: string;
  uuid?: string;
  id: string | number | null;
};

type PositionsTypes = {
  label: string;
  value: string;
  id: number;
};

type EducationPlace = {
  start_date: string;
  education_name: string;
  end_date: string;
  specialty: string;
  uuid?: string;
  id: string | number | null;
};

type AnketaLanguage = {
  name: string;
  level: string;
  uuid?: string;
  id: string | number | null;
};

type AnketaPrograms = {
  name: string;
  level: string;
  uuid?: string;
  id: string | number | null;
};

type AnketaWorkedBefores = {
  start_date: string;
  end_date: string;
  company_name: string;
  position: string;
  uuid?: string;
  id: string | number | null;
};

type Swetcher = "1" | "2" | "";

type StringOrNull = string;

export type Values = {
  age: StringOrNull;
  anketa_childrens: AnketaChildrens[];
  position: PositionsTypes[];
  payload: StringOrNull;
  eddition_phone_number: StringOrNull;
  first_name: StringOrNull;
  last_name: StringOrNull;
  father_name: StringOrNull;
  gender: Swetcher;
  anketa_healthys: AnketaHealthys[];
  martial_status: "Турмуш_курган" | "Турмуш_курмаган" | "Ажрашган";
  anketa_relations: AnketaRelations[];
  education: StringOrNull;
  education_place: EducationPlace[];
  height: StringOrNull;
  now_study: Swetcher;
  type_education: "Кундузги" | "Кечки" | "Сиртқи" | "Масофавий" | "";
  anketa_languages: AnketaLanguage[];
  state_id: StringOrNull;
  region_id: StringOrNull;
  address: StringOrNull;
  relation_company: StringOrNull;
  branch_id: StringOrNull;
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
  whether_convicted_description: StringOrNull;
  image: StringOrNull;
  pasport_type: "Оддий" | "ID карта" | "" | null;
  pasport_image_first: StringOrNull;
  pasport_image_second: StringOrNull;
};
