// import { debounce } from "lodash";
import { Values } from "./types";
import { User2 } from "lucide-react";
import Select from "@/components/Select";
import { useCallback, useState } from "react";
import { Input } from "@/components/Input";
// import { useTelegram } from "@/hooks/useTelegram";
// import useCloudStorage from "@/hooks/useCloudStorage";
import MultiSelect from "@/components/MultiSelect";
// import ChildrenTable from "./components/AnketaRelationsTable";
import ImageUploader from "@/components/UploadImage";
import { NumberInput } from "@/components/NumberInput";
import { PhoneNumberInput } from "@/components/PhoneNumberInput";
import { initial_values, localOptions, positionsOptions } from "@/constants/index";
import AnketaChildrensTable from "./components/AnketaChildrensTable";
import AnketaRelationsTable from "./components/AnketaRelationsTable";
import EducationPlaceTable from "./components/EducationPlaceTable";
import LanguagesTable from "./components/LanguagesTable";
import StatesSelect from "./components/StatesSelect";
import RegionSelect from "./components/RegionSelect";
import BranchesSelect from "./components/BranchesSelect";
import PositionsSelect from "./components/PositionsSelect";


export function FormPage() {
  const [loading] = useState(false);
  const [data, setData] = useState(initial_values);
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault() };
  // const user = useTelegram()
  // const { setItem, getItem } = useCloudStorage()
  
  // Debounce funksiyasini yaratamiz (faqat 500ms kutgandan keyin ishga tushadi)
  // const saveToCloudStorage = debounce((formData) => {
  //   setItem("user_form_data", JSON.stringify(formData));
  // }, 800);

  // getItem("user_form_data").then(console.log);

  const handleChangeInput = useCallback((e: React.ChangeEvent<HTMLInputElement> | { name: string; value: any }) => {
    setData((prev_values) => {
      const updatedData = "target" in e ? { ...prev_values, [e.target.name]: e.target.value } : { ...prev_values, [e.name]: e.value };
      // saveToCloudStorage(updatedData);
      return updatedData;
    });
  },[])
  
  console.log(data);
  
  
  
  return (
    <div className="px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Anketa</h1>
        <p className="mt-2 text-gray-600"> Пожалуйста заполните форму</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Ism *</label>
          <div className="relative bg-white rounded-md">
            <Input value={data.first_name} name="first_name" autoFocus onChange={handleChangeInput} disabled={loading} />
            <User2 className="absolute right-3 top-2 h-6 w-6 text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Familiya *</label>
          <div className="relative bg-white rounded-md">
            <Input value={data.last_name} name="last_name" autoFocus onChange={handleChangeInput} disabled={loading} />
            <User2 className="absolute right-3 top-2 h-6 w-6 text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Otasining ismi *</label>
          <div className="relative bg-white rounded-md">
            <Input value={data.father_name} name="father_name" autoFocus onChange={handleChangeInput} disabled={loading} />
            <User2 className="absolute right-3 top-2 h-6 w-6 text-gray-400" />
          </div>
        </div>

        <div className="flex justify-between">
          <div className="space-y-2 w-[48%]">
            <label className="text-sm font-medium text-white"> Tug'ilgan sana *</label>
            <div className="relative border border-red-500">
              <Input name="age" value={data.age} type="date" disabled={loading} onChange={handleChangeInput} />
            </div>
          </div> 

          <div className="space-y-2 w-[48%]">
            <label className="text-sm font-medium text-white">Jinsingiz *</label>
            <div className="relative">
              <Select name={"gender"} options={localOptions.gender} value={data.gender} onChange={(target) => setData((prev_values) => ({ ...prev_values, ["gender" as keyof Values]: target?.id }))} required />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Oilaviy xolatingiz *</label>
          <div className="relative">
            <Select name={"martial_status"} options={localOptions.married} value={data.martial_status} onChange={(target) => setData((prev_values) => ({ ...prev_values, ["martial_status" as keyof Values]: target?.id }))} required />
          </div>
        </div>

        <div className="space-y-2">
          <AnketaChildrensTable setData={setData} data={data} key={"anketa_childrens"} />
        </div>

        <div className="space-y-2">
          <AnketaRelationsTable setData={setData} data={data} key={"anketa_relations"}/>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Ma'lumotingiz *</label>
          <div className="relative">
            <Select name={"education"} options={localOptions.educational_degree} value={data.education} onChange={(target) => setData((prev_values) => ({ ...prev_values, ["education" as keyof Values]: target?.id }))} required />
          </div>
        </div>

        <div className="space-y-2">
          <EducationPlaceTable setData={setData} data={data} key={"education_place"}/>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Bo'y va vazningiz (sm/kg) *</label>
          <div className="relative bg-white rounded-md">
            <Input value={data.height} name="height" autoFocus onChange={handleChangeInput} disabled={loading} />
            <User2 className="absolute right-3 top-2 h-6 w-6 text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white"> Siz hozirda universitet, litsey yoki kollej talabasimisiz? *</label>
          <div className="relative">
            <Select name={"now_study"} options={localOptions.switch} value={data.now_study} onChange={(target) => setData((prev_values) => ({ ...prev_values, ["now_study" as keyof Values]: target?.id }))} required />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white"> Qanday ta'lim shakli? *</label>
          <div className="relative">
            <Select name={"type_education"} options={localOptions.education_type} value={data.type_education} onChange={(target) => setData((prev_values) => ({ ...prev_values, ["type_education" as keyof Values]: target?.id }))} required />
          </div>
        </div>

        <div className="space-y-2">
          <LanguagesTable setData={setData} data={data} key={"anketa_languages"}/>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white"> Viloyat (Haqiqiy turar joy) *</label>
          <div className="relative">
           <StatesSelect setData={setData} data={data} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white"> Shaxar/Tuman (Haqiqiy turar joy) *</label>
          <div className="relative">
           <RegionSelect setData={setData} data={data} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Manzilingiz (Haqiqiy turar joy MFY, ko'cha) *</label>
          <div className="relative bg-white rounded-md">
            <Input value={data.last_name} name="last_name" autoFocus onChange={handleChangeInput} disabled={loading} />
            <User2 className="absolute right-3 top-2 h-6 w-6 text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white"> Qaysi filialda ishlashni xohlaysiz? *</label>
          <div className="relative">
           <BranchesSelect setData={setData} data={data} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white"> Qaysi lavozimlarda ishlashni xohlaysiz? *</label>
          <div className="relative">
           <PositionsSelect setData={setData} data={data} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white"> Avval bizning kompaniyamizda ishlaganmisiz? * </label>
          <div className="relative">
            <Select name={"worked_company"} options={localOptions.switch} value={data.worked_company} onChange={(target) => setData((prev_values) => ({ ...prev_values, ["worked_company" as keyof Values]: target?.id }))} required />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">GARANT komponyasida ishlaydigan yaqin qarindoshingiz bormi? *</label>
          <div className="relative bg-white rounded-md">
            <Input value={data.relation_company} name="relation_company" autoFocus onChange={handleChangeInput} disabled={loading} placeholder="Agar bo'lsa to'liq ismi, familiyasi va lavozimini yozing." />
            <User2 className="absolute right-3 top-2 h-6 w-6 text-gray-400" />
          </div>
        </div>

        {/* shu yergacha keldim inputlarni kiritishda  */}


        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Qancha maosh xoxlaydi? (so'mda)</label>
          <div className="relative bg-white rounded-md">
            <NumberInput 
              format={true} 
              value={data.payload} 
              name="salary" 
              onChange={handleChangeInput} 
              disabled={loading} 
              placeholder="Введите ваше полное oylik"
            />
            <User2 className="absolute right-3 top-2 h-6 w-6 text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Телефон</label>
          <div className="relative bg-white rounded-md">
            <PhoneNumberInput
              required
              name="phone"
              placeholder="+998"
              value={data.eddition_phone_number}
              disabled={loading}
              format="998 ## ### ## ##"
              onValueChange={handleChangeInput}
            />
          </div>
        </div>



        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Multi Select</label>
          <div className="relative">
            <MultiSelect name={"position"} options={positionsOptions} value={data.position} onChange={(target) => setData((prev_values) => ({ ...prev_values, ["position" as keyof Values]: target }))} required />
          </div>
        </div>


        <div className="flex justify-between">
          <div className="space-y-2 w-44">
            <label className="text-sm font-medium text-white">Upload img </label>
            <div className="relative">
              <ImageUploader value={data.image} onChange={handleChangeInput} name={"image"} />
            </div>
          </div>

          <div className="space-y-2 w-44">
            <label className="text-sm font-medium text-white">Upload img </label>
            <div className="relative">
              <ImageUploader value={data.pasport_image_first} onChange={handleChangeInput} name="pasport_image_first" />
            </div>
          </div>
        </div>

        <div className="space-y-2 w-48">
          <label className="text-sm font-medium text-white">Upload img </label>
          <div className="relative">
            <ImageUploader value={data.pasport_image_second} onChange={handleChangeInput} name="pasport_image_second" />
          </div>
        </div>
        
        <button type="submit"> submit</button>
      </form>
    </div>
  );
}