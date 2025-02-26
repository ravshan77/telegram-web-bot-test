// import { debounce } from "lodash";
import { Values } from "./types";
import Select from "@/components/Select";
import { Input } from "@/components/Input";
import { useCallback, useState } from "react";
import { Textarea } from "@/components/Textarea";
import HealthyTable from "./components/HealthyTable";
import ImageUploader from "@/components/UploadImage";
import StatesSelect from "./components/StatesSelect";
import RegionSelect from "./components/RegionSelect";
// import { useTelegram } from "@/hooks/useTelegram";
// import MultiSelect from "@/components/MultiSelect";
import { NumberInput } from "@/components/NumberInput";
import ProgramsTable from "./components/ProgramsTable";
import ChildrensTable from "./components/ChildrensTable";
import RelationsTable from "./components/RelationsTable";
import LanguagesTable from "./components/LanguagesTable";
import BranchesSelect from "./components/BranchesSelect";
// import useCloudStorage from "@/hooks/useCloudStorage";
// import ChildrenTable from "./components/RelationsTable";
import PositionsSelect from "./components/PositionsSelect";
import TermsOfConsentModal from "./components/TermsOfConsent";
import { initial_values, localOptions } from "@/constants/index";
import WorkedBeforesTable from "./components/WorkedBeforesTable";
import { PhoneNumberInput } from "@/components/PhoneNumberInput";
import EducationPlaceTable from "./components/EducationPlaceTable";


export function FormPage() {
  const [loading] = useState(false);
  const [data, setData] = useState(initial_values);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault() };
  // const user = useTelegram()
  // const { setItem, getItem } = useCloudStorage()
  
  // Debounce funksiyasini yaratamiz (faqat 500ms kutgandan keyin ishga tushadi)
  // const saveToCloudStorage = debounce((formData) => {
  //   setItem("user_form_data", JSON.stringify(formData));
  // }, 800);

  // getItem("user_form_data").then(console.log);

  const handleChangeInput = useCallback((e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | { name: string; value: any }) => {
    setData((prev_values) => {
      const updatedData = "target" in e ? { ...prev_values, [e.target.name]: e.target.value } : { ...prev_values, [e.name]: e.value };
      // saveToCloudStorage(updatedData);
      return updatedData;
    });
  },[])
  
  // console.log(data);
  
  return (
    <div className="px-4">
      <div className="my-4">
        <h1 className="text-center text-2xl font-bold text-white">Anketa to'ldirish</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="text-sm font-medium text-white">Ism *</label>
          <Input value={data.first_name} name="first_name" autoFocus required onChange={handleChangeInput} disabled={loading} />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white">Familiya *</label>
          <Input value={data.last_name} name="last_name" required onChange={handleChangeInput} disabled={loading} />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white">Otasining ismi *</label>
          <Input value={data.father_name} name="father_name" required onChange={handleChangeInput} disabled={loading} />
        </div>

        <div className="mb-4 flex justify-between">
          <div className="w-full">
            <label className="text-sm font-medium text-white"> Tug'ilgan sana *</label>
            <Input value={data.age} name="age" type="date" className="min-w-[150px]" required disabled={loading} onChange={handleChangeInput} />
          </div> 

          <div className="w-full ml-2">
            <label className="text-sm font-medium text-white">Jinsingiz *</label>
            <Select value={data.gender} name={"gender"} options={localOptions.gender} onChange={(target) => setData((prev_values) => ({ ...prev_values, ["gender" as keyof Values]: target?.id }))} required />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white">Oilaviy xolatingiz *</label>
          <Select name={"martial_status"} value={data.martial_status} options={localOptions.married} onChange={(target) => setData((prev_values) => ({ ...prev_values, ["martial_status" as keyof Values]: target?.id }))} required />
        </div>

        <div className="mb-4">
          <ChildrensTable setData={setData} data={data} key={"anketa_childrens"} />
        </div>

        <div className="mb-4">
          <RelationsTable setData={setData} data={data} key={"anketa_relations"}/>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white">Ma'lumotingiz *</label>
          <Select name={"education"} value={data.education} options={localOptions.educational_degree} onChange={(target) => setData((prev_values) => ({ ...prev_values, ["education" as keyof Values]: target?.id }))} required />
        </div>

        <div className="mb-4">
          <EducationPlaceTable setData={setData} data={data} key={"education_place"}/>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white"> Hozirda universitet, litsey yoki kollej talabasimisiz? *</label>
          <Select name={"now_study"} value={data.now_study} options={localOptions.switch} onChange={(target) => setData((prev_values) => ({ ...prev_values, ["now_study" as keyof Values]: target?.id }))} required />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white"> Qanday ta'lim shakli?</label>
          <Select name={"type_education"} value={data.type_education} options={localOptions.education_type} onChange={(target) => setData((prev_values) => ({ ...prev_values, ["type_education" as keyof Values]: target?.id }))} />
        </div>

        <div className="mb-4">
          <LanguagesTable setData={setData} data={data} key={"anketa_languages"}/>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white">Bo'y va vazningiz (sm/kg) *</label>
          <Input name="height" placeholder="Misol uchun: 170/65" value={data.height} onChange={handleChangeInput} required disabled={loading} />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white"> Viloyat (Haqiqiy turar joy) *</label>
          <StatesSelect setData={setData} data={data} disabled={loading} required loading={loading} />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white"> Shaxar/Tuman (Haqiqiy turar joy) *</label>
          <RegionSelect setData={setData} data={data} loading={loading} required disabled={loading} />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white">Manzilingiz (Haqiqiy turar joy MFY, ko'cha) *</label>
          <Input name="address" value={data.address} onChange={handleChangeInput} disabled={loading} />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white"> Qaysi filialda ishlashni xohlaysiz? *</label>
          <BranchesSelect setData={setData} data={data} disabled={loading} loading={loading} required />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white"> Qaysi lavozimlarda ishlashni xohlaysiz? *</label>
          <PositionsSelect setData={setData} data={data} loading={loading} disabled={loading} required />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white"> Avval bizning kompaniyamizda ishlaganmisiz? * </label>
          <Select name={"worked_company"} value={data.worked_company} options={localOptions.switch} onChange={(target) => setData((prev_values) => ({ ...prev_values, ["worked_company" as keyof Values]: target?.id }))} required />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white"> O'zbekiston Respubilkasi fuqorosimisiz? * </label>
          <Select name={"citizen"} value={data.citizen} options={localOptions.switch} onChange={(target) => setData((prev_values) => ({ ...prev_values, ["citizen" as keyof Values]: target?.id }))} required />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white"> Hozirda ish bilan ta'minlanganmisiz? * </label>
          <Select name={"job_now"} value={data.job_now} options={localOptions.switch} onChange={(target) => setData((prev_values) => ({ ...prev_values, ["job_now" as keyof Values]: target?.id }))} required />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white">GARANT komponyasida ishlaydigan yaqin qarindoshingiz bormi?</label>
          <Input name="relation_company" value={data.relation_company} onChange={handleChangeInput} disabled={loading} placeholder="Agar bo'lsa to'liq ismi, familiyasi va lavozimini yozing." />
        </div>

        <div className="mb-4">
          <ProgramsTable setData={setData} data={data} key={"anketa_progs"}/>
        </div>

        <div className="mb-4">
          <HealthyTable setData={setData} data={data} key={"anketa_healthys"}/>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white"> Qo'shimcha ma'lumotlar </label>
          <Textarea value={data.other_info} name="other_info" rows={3} onChange={handleChangeInput} disabled={loading} />
        </div>

        <div className="mb-4">
          <WorkedBeforesTable setData={setData} data={data} key={"anketa_worked_befores"}/>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white">Oxirgi ish joyida olgan ish xaqingiz? (so'm)</label>
          <NumberInput name="salary_last_job" value={data.salary_last_job} format={true} onChange={handleChangeInput} disabled={loading}/>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white">Qancha maosh xoxlaysiz? (so'm) *</label>
          <NumberInput name="payload" value={data.payload} format={true} required onChange={handleChangeInput} disabled={loading}/>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white"> Shaxsiy avtomabilingiz bormi? * </label>
          <Select name={"is_car"} value={data.is_car} options={localOptions.switch} onChange={(target) => setData((prev_values) => ({ ...prev_values, ["is_car" as keyof Values]: target?.id }))} required />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white"> Avtomabilingiz rusumi? * </label>
          <Select name={"about_car"} value={data.about_car} options={localOptions.casr} onChange={(target) => setData((prev_values) => ({ ...prev_values, ["about_car" as keyof Values]: target?.id }))} required />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white"> Xizmat safariga bora olasizmi (Boshqa viloyat yoki tuman filiallarimizda ishlay olasizmi)? * </label>
          <Select name={"trip"} value={data.trip} options={localOptions.switch} onChange={(target) => setData((prev_values) => ({ ...prev_values, ["trip" as keyof Values]: target?.id }))} required />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white"> Bo'sh ish o'rni haqida qayerdan bildingiz? * </label>
          <Select name={"about_vacancy"} value={data.about_vacancy} options={localOptions.found_job} onChange={(target) => setData((prev_values) => ({ ...prev_values, ["about_vacancy" as keyof Values]: target?.id }))} required />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white"> Sudlanganmisiz? * </label>
          <Select name={"whether_convicted"} value={data.whether_convicted} options={localOptions.switch} onChange={(target) => setData((prev_values) => ({ ...prev_values, ["whether_convicted" as keyof Values]: target?.id }))} required />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white"> Sudlanganligingiz haqida qisqacha (Qaysi moddalar bo'yicha) </label>
          <Textarea name="whether_convicted_description" value={data.whether_convicted_description} rows={2} onChange={handleChangeInput} disabled={loading} />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white">Qo'shimcha telefon raqam</label>
          <PhoneNumberInput name="eddition_phone_number" value={data.eddition_phone_number} format="998 ## ### ## ##" placeholder="+998" disabled={loading} onValueChange={handleChangeInput}/>
        </div>

        <div className="mb-4 flex flex-col items-center justify-center">
          <div className="w-48">
            <label className="text-sm font-medium text-white">Shaxsiy rasmingiz * </label>
            <ImageUploader name="image" value={data.image} required disabled={loading} loading={loading} onChange={handleChangeInput} />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white"> Pasport turi * </label>
          <Select name={"pasport_type"} value={data.pasport_type} options={localOptions.pasport_type} onChange={(target) => setData((prev_values) => ({ ...prev_values, ["pasport_type" as keyof Values]: target?.id }))} required />
        </div>

        <div className="mb-4 flex justify-between">
          <div className=" w-[170px]">
            <label className="text-sm font-medium text-white">Pasport rasmi (ID card) * </label>
            <ImageUploader name={"pasport_image_first"} value={data.pasport_image_first} required disabled={loading} loading={loading} onChange={handleChangeInput} />
          </div>

          <div className="w-[170px]">
            <label className="text-sm font-medium text-white"> ID card orqa tomoni * </label>
            <ImageUploader name="pasport_image_second" value={data.pasport_image_second} required disabled={loading} loading={loading} onChange={handleChangeInput} />
          </div>
        </div>

        <TermsOfConsentModal setShowConsentModal={setShowConsentModal} showConsentModal={showConsentModal}/>
        
        <button type="submit"> submit</button>
      </form>
    </div>
  );
}