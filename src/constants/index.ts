import { Values } from "./../pages/formPage/types";
import { ChildrenData, MultiOption, SingleOption } from "@/pages/formPage/types";
const enum FieldType {
  TEXT = "TEXT",
  DATE = "DATE",
  SELECT = "SELECT",
  DELETE_ROW = "DELETE_ROW",
}

const colorOptions: SingleOption[] = [
  { id: "slate", name: "Slate" },
  { id: "green", name: "Green" },
  { id: "purple", name: "Purple" },
  { id: "orange", name: "Orange" },
  { id: "yellow", name: "Yellow" },
  { id: "forest", name: "Forest" },
  { id: "silver", name: "Silver" },
  { id: "red", name: "Red" },
  { id: "ocean", name: "Ocean" },
  { id: "blue", name: "Blue" },
];

const positionsOptions: MultiOption[] = [
  { id: "slate", label: "Slate", value: "Slate" },
  { id: "green", label: "Green", value: "Green" },
  { id: "purple", label: "Purple", value: "Purple" },
  { id: "orange", label: "Orange", value: "Orange" },
  { id: "yellow", label: "Yellow", value: "Yellow" },
  { id: "forest", label: "Forest", value: "Forest" },
  { id: "silver", label: "Silver", value: "Silver" },
];

const children_data: ChildrenData[] = [
  {
    name: "",
    gender: "ўғил",
    date: null,
    id: 1,
  },
];


export const initial_values: Values = {
  age: '2024-12-27',
  anketa_childrens: [
    {
      gender: 'ўғил',
      date: '2024-12-27',
      uuid: 'm56r54zat15xzocbyj',
      id: null
    }
  ],
  position: [
    {
      label: 'Омборчи',
      value: 'Омборчи',
      id: 2
    },
    {
      label: 'Шартнома бўлими мутаҳассиси',
      value: 'Шартнома бўлими мутаҳассиси',
      id: 4
    },
    {
      label: 'Реклама бўлими мутахассиси',
      value: 'Реклама бўлими мутахассиси',
      id: 6
    }
  ],
  payload: '6455654',
  eddition_phone_number: '991940851',
  first_name: 'sfsd',
  last_name: 'sdfdsf',
  father_name: 'sdfdsf',
  gender: '1',
  anketa_healthys: [
    {
      question: 'Og\'ir narsalar ko\'tara olasizmi?',
      status: '',
      id: '1',
      description: '',
      isGender: true,
      inputId: 'anketa_healthys.0.status'
    },
    {
      question: 'Yuragingizdan shikoyatingiz bormi?',
      status: '',
      id: '2',
      description: '',
      isGender: false,
      inputId: 'anketa_healthys.1.status'
    },
    {
      question: 'Og\'ir jarroxlik amaliyotini o\'taganmisiz',
      status: '1',
      id: '3',
      description: '',
      isGender: false,
      inputId: 'anketa_healthys.2.status'
    },
    {
      question: 'Ko\'zingizdan shikoyatingiz bormi?',
      status: '1',
      id: '4',
      description: '',
      isGender: false,
      inputId: 'anketa_healthys.3.status'
    },
    {
      question: 'Bel og\'rig\'idan shikoyatingiz bormi?',
      status: '1',
      id: '5',
      description: '',
      isGender: true,
      inputId: 'anketa_healthys.4.status'
    },
    {
      question: 'Bir joyda turib yoki o\'tirib ishlay olasizmi?',
      status: '2',
      id: '6',
      description: '',
      isGender: false,
      inputId: 'anketa_healthys.5.status'
    }
  ],
  martial_status: 'Турмуш_курган',
  anketa_relations: [
    {
      who: '13',
      date: '2025-02-11',
      job: 'dfdsf',
      uuid: 'm6zfxwa3aojk29k3mrs',
      id: null
    }
  ],
  education: 'Колледж',
  education_place: [
    {
      start_date: '2025-02-11',
      education_name: 'fsdfd',
      end_date: '2025-02-11',
      specialty: 'sdfsd',
      uuid: 'm6zfy2s56e5o7dzo91d',
      id: null
    }
  ],
  height: '898',
  now_study: '1',
  type_education: 'Кундузги',
  anketa_languages: [
    {
      name: 'Киргиз',
      level: '40%',
      uuid: 'm6zfz1fptyuo4mz5x6',
      id: null
    }
  ],
  state_id: '1',
  region_id: '3',
  address: 'Karshi',
  relation_company: 'Our meta',
  branch_id: '65',
  worked_company: '2',
  citizen: '2',
  job_now: '1',
  anketa_progs: [
    {
      name: 'Excel',
      level: '30%',
      uuid: 'm6zg0kwoa6ezc6ma3d9',
      id: null
    }
  ],
  other_info: 'dfgfdgdf',
  anketa_worked_befores: [
    {
      start_date: '2025-02-17',
      end_date: '2025-02-17',
      company_name: 'dfvdg',
      position: 'dfgd',
      uuid: 'm79g3inc12l108q88u9p',
      id: null
    }
  ],
  salary_last_job: '54564',
  is_car: '1',
  about_car: 'Nexia 3',
  trip: '1',
  about_vacancy: 'hh.uz',
  whether_convicted: '1',
  whether_convicted_description: 'sfgdf',
  image: 'telegramImage/173921558367aa52df9edb4.jpg',
  pasport_type: 'Оддий',
  pasport_image_first: 'telegramImage/173921559067aa52e6bc916.jpg',
  pasport_image_second: 'telegramImage/173982035367b38d419337f.jpg'
}


export {
  colorOptions,
  children_data,
  positionsOptions,
  FieldType,
};

export const localSaveOptions = {
  married:[{name:"Турмуш қурган", id:"Турмуш_курган"}, {name:"Турмуш қурмаган", id:"Турмуш_курмаган"}, {name:"Ажрашган", id:"Ажрашган"},],
  gender_children: [{name:"ўғил", id: "ўғил" }, { name: "қиз", id: "қиз" }, ],
  switch:[{name:"Ха", id:1}, {name:"Йук", id:2}], 
  gender: [{name:"Эркак", id: 1 }, { name: "Аёл", id: 2 }, ],
  programma:[{ name:"Excel", id:"Excel"}, { name:"Word", id:"Word"}, { name:"PowerPoint", id:"PowerPoint"}, {name:"Adobe Photoshop", id:"Adobe Photoshop"}, {name:"CorelDRAW", id:"CorelDRAW"}, {name:"1C", id:"1C"}],
  degrees: [ { name:"10%", id:"10%"}, { name:"20%", id:"20%"}, { name:"30%", id:"30%"}, { name:"40%", id:"40%"}, { name:"50%", id:"50%"}, { name:"60%", id:"60%"}, { name:"70%", id:"70%"}, { name:"80%", id:"80%"}, { name:"90%", id:"90%"}, { name:"100%", id:"100%"}, ],
  languages: [{name:"Рус", id:"Рус"}, {name:"Тожик", id:"Тожик"}, {name:"Инглиз", id:"Инглиз"}, {name:"Киргиз", id:"Киргиз"}, {name:"Корейс", id:"Корейс"}, {name:"Турк", id:"Турк"}, {name:"Азарбайжон", id:"Азарбайжон"}, {name:"Немис", id:"Немис"}, {name:"Бошка", id:"Бошка"} ],
  found_job :[ {name:"Flayer", id:"Flayer"}, {name:"Banner(ko'cha reklamalari)", id:"Banner(ko'cha reklamalari)"}, {name:"hh.uz", id:"hh.uz"}, {name:"Tanishlar/Do'stlar", id:"Tanishlar/Do'stlar"}, {name:"olx.uz", id:"olx.uz"}, {name:"rabota.uz", id:"rabota.uz"},],
  kinship:[{name:"Отам", id: 1}, {name:"Онам", id: 2}, {name:"Турмуш уртоғим", id: 8}, {name:"Бобом", id:9}, {name:"Бувим", id:10}, {name:"Акам", id: 3}, {name:"Опам", id: 4}, {name:"Укам", id: 5}, {name:"Синглим", id: 6}, { name:"ўғлим", id:11}, { name:"қизим", id:12}, {name:"Қайни отам", id: 13}, {name:"Қайни онам", id: 14}, {name:"Қайни акам", id: 15}, {name:"Қайни опам", id: 16}, {name:"Қайни укам", id: 17}, {name:"Қайни синглим", id: 18}, ],
  pasport_type:[{id:"Оддий", name:"Оддий"},{id:"ID карта", name:"ID карта"} ],
  educational_degree:[{name:"Мактаб", id:"Мактаб"}, {name:"Колледж", id:"Колледж"}, {name:"Техникум", id:"Техникум"}, {name:"Бакалавр", id:"Бакалавр"}, {name:"Магистр", id:"Магистер"}, ],
  education_type: [{name:"Кундузги", id:"Кундузги"}, {name:"Кечки", id:"Кечки"}, {name:"Сиртқи", id:"Сиртқи"}, {name:"Масофавий", id:"Масофавий"},],
  casr : [ {name:"Damas", id:"Damas"}, {name:"Labo", id:"Labo"}, {name:"Matiz", id:"Matiz"}, {name:"Nexia", id:"Nexia"}, {name:"Nexia 2", id:"Nexia 2"}, {name:"Nexia 3", id:"Nexia 3"}, {name:"Spark", id:"Spark"}, {name:"Lacetti", id:"Lacetti"}, {name:"Gentra", id:"Gentra"}, {name:"Cobalt", id:"Cobalt"}, {name:"Captiva", id:"Captiva"}, {name:"Epica", id:"Epica"}, {name:"Malibu", id:"Malibu"}, {name:"Malibu 2", id:"Malibu 2"}, {name:"Orlando", id:"Orlando"}, {name:"Tracker", id:"Tracker"}, {name:"Tracker 2", id:"Tracker 2"}, {name:"Equinox", id:"Equinox"}, {name:"Onix", id:"Onix"}, {name:"Бошка", id:"Бошка"}, ],
}