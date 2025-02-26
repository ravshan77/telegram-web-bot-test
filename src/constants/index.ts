import { AnketaHealthys, Values } from "./../pages/formPage/types";

export const enum FieldType {
  TEXT = "TEXT",
  DATE = "DATE",
  SELECT = "SELECT",
  DELETE_ROW = "DELETE_ROW",
}

export const healthys_man: AnketaHealthys[] = [
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
]

export const healthys_woman: AnketaHealthys[] = [    
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
    question: 'Bir joyda turib yoki o\'tirib ishlay olasizmi?',
    status: '2',
    id: '6',
    description: '',
    isGender: false,
    inputId: 'anketa_healthys.5.status'
  }
]

export const initial_values: Values = {
  age: '',
  anketa_childrens: [],
  position: [],
  payload: '',
  eddition_phone_number: '',
  first_name: '',
  last_name: '',
  father_name: '',
  gender: '',
  anketa_healthys: [],
  martial_status: '',
  anketa_relations: [],
  education: '',
  education_place: [],
  height: '',
  now_study: '',
  type_education: '',
  anketa_languages: [],
  state_id: '',
  region_id: '',
  address: '',
  relation_company: '',
  branch_id: '',
  worked_company: '',
  citizen: '',
  job_now: '',
  anketa_progs: [],
  other_info: '',
  anketa_worked_befores: [],
  salary_last_job: '',
  is_car: '',
  about_car: '',
  trip: '',
  about_vacancy: '',
  whether_convicted: '',
  whether_convicted_description: '',
  image: 'telegramImage/173921558367aa52df9edb4.jpg',
  pasport_type: '',
  pasport_image_first: 'telegramImage/173921559067aa52e6bc916.jpg',
  pasport_image_second: 'telegramImage/173982035367b38d419337f.jpg'
}

export const localOptions = {
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