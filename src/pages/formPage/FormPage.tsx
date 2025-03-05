import { v4 as uuid } from "uuid";
// import { debounce } from "lodash";
import Select from "@/components/Select";
import { Input } from "@/components/Input";
import { useCallback, useState } from "react";
import { Textarea } from "@/components/Textarea";
import { fetchRequest } from "@/utils/fetchRequest";
import HealthyTable from "./components/HealthyTable";
import ImageUploader from "@/components/UploadImage";
import StatesSelect from "./components/StatesSelect";
import RegionSelect from "./components/RegionSelect";
// import { useTelegram } from "@/hooks/useTelegram";
import { NumberInput } from "@/components/NumberInput";
import ProgramsTable from "./components/ProgramsTable";
// import useCloudStorage from "@/hooks/useCloudStorage";
import ChildrensTable from "./components/ChildrensTable";
import RelationsTable from "./components/RelationsTable";
import LanguagesTable from "./components/LanguagesTable";
import BranchesSelect from "./components/BranchesSelect";
import PositionsSelect from "./components/PositionsSelect";
import { ChangeTable, ColumnConfig, Values } from "./types";
import TermsOfConsentModal from "./components/TermsOfConsent";
import WorkedBeforesTable from "./components/WorkedBeforesTable";
import { PhoneNumberInput } from "@/components/PhoneNumberInput";
import EducationPlaceTable from "./components/EducationPlaceTable";
import { healthys_man, healthys_woman, initial_values, localOptions } from "@/constants/index";


export function FormPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initial_values);
  const [showConsentModal, setShowConsentModal] = useState(false);

  // const user = useTelegram()
  // const { setItem, getItem } = useCloudStorage()
  
  // Debounce funksiyasini yaratamiz (faqat 500ms kutgandan keyin ishga tushadi)
  // const saveToCloudStorage = debounce((formData) => {
  //   setItem("user_form_data", JSON.stringify(formData));
  // }, 800);

  // getItem("user_form_data").then(console.log);

  const handleChangeInput = useCallback((e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | { name: string; value: any }) => {
    setData((prev) => {
      const updatedData = "target" in e ? { ...prev, [e.target.name]: e.target.value } : { ...prev, [e.name]: e.value };
      // saveToCloudStorage(updatedData);
      return updatedData;
    });
  },[])
  
  
  const handleChangeTable = useCallback(<T extends { id?: string | number; uuid?: string }>({ row, col, new_value, name }: ChangeTable<T>) => {
    setData((prev) => {
      if (Array.isArray(prev[name])) {
        const table = prev[name] as T[];

        const updatedTable = table.map((dta) => {
          if ((dta.uuid && row.uuid && dta.uuid === row.uuid) || (dta.id && row.id && String(dta.id) === String(row.id))) {
            return { ...dta, [col.field]: new_value };
          }
          return dta;
        });
        // saveToCloudStorage({ ...prev, [name]: updatedTable });
        return { ...prev, [name]: updatedTable };
      }
  
      return prev;
    });
  },[]);

  
  const addRow = useCallback(({ columns, name  }: { columns: ColumnConfig[][], name: keyof Values }) => {
    const newRow = columns.flat().reduce( (acc: { [key: string]: any }, column) => {
      if (column.field) {
        acc[column.field] = column?.defaultValue || "";
      }
        return acc;
      },
      { uuid: uuid(), id: null }
    );
  
    setData((prev) => ({ ...prev, [name]: [...prev[name], newRow] }));
  },[]);
  
  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault() 
    // ? validatsiya tekshiruvi bosqichi yakunlagandan so'ng

    // 🟢 Foydalanuvchidan tasdiq olish
    const isConfirmed = window.confirm("Anketan yuborilsinmi?");
    if (!isConfirmed) return;


    const sendValues = {...data, chat_id: "user?.id"};
    setLoading(true)
    
    try {
      // anketani yuborish
      const res = await fetchRequest<any>(`/url`, { method: "POST", data: sendValues})
        if (res) {
          alert("anketa muvaffaqiyatli yuborildi")
        }
        else throw new Error("Server xatoligi")
    } catch (error) {
      alert(`Anketa yuborishda xatolik (admin bilan bog'laning @paloncha): ${error instanceof Error ? error.message : error}`);
    } finally{
      setLoading(false)
    }
  }

  return (
    <div className="px-4">
      <div className="my-4">
        <h1 className="text-center text-2xl font-bold text-white">Anketa to'ldirish</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="text-sm font-medium text-white">Ism *</label>
          <Input name="first_name" value={data.first_name} autoFocus required onChange={handleChangeInput} disabled={loading} />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white">Familiya *</label>
          <Input name="last_name" value={data.last_name} required onChange={handleChangeInput} disabled={loading} />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white">Otasining ismi *</label>
          <Input name="father_name" value={data.father_name} required onChange={handleChangeInput} disabled={loading} />
        </div>

        <div className="mb-4 flex justify-between">
          <div className="w-full">
            <label className="text-sm font-medium text-white"> Tug'ilgan sana *</label>
            <Input name="age" value={data.age} type="date" className="min-w-[150px]" required disabled={loading} onChange={handleChangeInput} />
          </div> 

          <div className="w-full ml-2">
            <label className="text-sm font-medium text-white">Jinsingiz *</label>
            <Select name="gender" value={data.gender} options={localOptions.gender} required onChange={(target) => setData((prev_values) => ({ ...prev_values, ["gender" as keyof Values]: String(target?.id), anketa_healthys: String(target?.id) === "1" ? healthys_man : healthys_woman }))} />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white">Oilaviy xolatingiz *</label>
          <Select name="martial_status" value={data.martial_status} options={localOptions.married} required onChange={(target) => setData((prev_values) => ({ ...prev_values, ["martial_status" as keyof Values]: String(target?.id) }))} />
        </div>

        <div className="mb-4">
          <ChildrensTable name="anketa_childrens" addRow={addRow} setData={setData} data={data} handleChangeTable={handleChangeTable} />
        </div>

        <div className="mb-4">
          <RelationsTable name="anketa_relations" addRow={addRow} setData={setData} data={data} handleChangeTable={handleChangeTable}/>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white">Ma'lumotingiz *</label>
          <Select name="education" value={data.education} options={localOptions.educational_degree} required onChange={(target) => setData((prev_values) => ({ ...prev_values, ["education" as keyof Values]: String(target?.id) }))} />
        </div>

        <div className="mb-4">
          <EducationPlaceTable name="education_place" addRow={addRow} setData={setData} data={data} handleChangeTable={handleChangeTable}/>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white"> Hozirda universitet, litsey yoki kollej talabasimisiz? *</label>
          <Select name="now_study" value={data.now_study} options={localOptions.switch} required onChange={(target) => setData((prev_values) => ({ ...prev_values, ["now_study" as keyof Values]: String(target?.id) }))} />
        </div>

        { data.now_study === "1" ? <div className="mb-4">
          <label className="text-sm font-medium text-white"> Qanday ta'lim shakli? *</label>
          <Select name="type_education" value={data.type_education} options={localOptions.education_type} required={data.now_study === "1"} onChange={(target) => setData((prev_values) => ({ ...prev_values, ["type_education" as keyof Values]: String(target?.id) }))} />
        </div> : null}

        <div className="mb-4">
          <LanguagesTable name="anketa_languages" addRow={addRow} setData={setData} data={data} handleChangeTable={handleChangeTable}/>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white">Bo'y va vazningiz (sm/kg) *</label>
          <Input name="height" placeholder="Misol uchun: 170/65" value={data.height} onChange={handleChangeInput} required disabled={loading} />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white"> Viloyat (Haqiqiy turar joy) *</label>
          <StatesSelect name="state_id" data={data} setData={setData} disabled={loading} required loading={loading} />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white"> Shaxar/Tuman (Haqiqiy turar joy) *</label>
          <RegionSelect name="region_id" data={data} setData={setData} loading={loading} required disabled={loading} />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white">Manzilingiz (Haqiqiy turar joy MFY, ko'cha) *</label>
          <Input name="address" value={data.address} onChange={handleChangeInput} disabled={loading} />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white"> Qaysi filialda ishlashni xohlaysiz? *</label>
          <BranchesSelect name="branch_id" data={data} setData={setData} disabled={loading} loading={loading} required />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white"> Qaysi lavozimlarda ishlashni xohlaysiz? *</label>
          <PositionsSelect name="position" data={data} setData={setData} loading={loading} disabled={loading} required />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white"> Avval bizning kompaniyamizda ishlaganmisiz? * </label>
          <Select name="worked_company" value={data.worked_company} options={localOptions.switch} required onChange={(target) => setData((prev_values) => ({ ...prev_values, ["worked_company" as keyof Values]: String(target?.id) }))} />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white"> O'zbekiston Respubilkasi fuqorosimisiz? * </label>
          <Select name="citizen" value={data.citizen} options={localOptions.switch} required onChange={(target) => setData((prev_values) => ({ ...prev_values, ["citizen" as keyof Values]: String(target?.id) }))} />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white"> Hozirda ish bilan ta'minlanganmisiz? * </label>
          <Select name="job_now" value={data.job_now} options={localOptions.switch} required onChange={(target) => setData((prev_values) => ({ ...prev_values, ["job_now" as keyof Values]: String(target?.id) }))} />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white">GARANT komponyasida ishlaydigan yaqin qarindoshingiz bormi?</label>
          <Input name="relation_company" value={data.relation_company} onChange={handleChangeInput} disabled={loading} placeholder="Agar bo'lsa to'liq ismi, familiyasi va lavozimini yozing." />
        </div>

        <div className="mb-4">
          <ProgramsTable name="anketa_progs" data={data} setData={setData} handleChangeTable={handleChangeTable} addRow={addRow}/>
        </div>

        <div className="mb-4">
          <HealthyTable name="anketa_healthys" data={data} setData={setData} handleChangeTable={handleChangeTable}/>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white"> Qo'shimcha ma'lumotlar </label>
          <Textarea name="other_info" value={data.other_info} rows={3} onChange={handleChangeInput} disabled={loading} />
        </div>

        <div className="mb-4">
          <WorkedBeforesTable name="anketa_worked_befores" data={data} setData={setData} handleChangeTable={handleChangeTable} addRow={addRow}/>
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
          <Select name="is_car" value={data.is_car} options={localOptions.switch} required onChange={(target) => setData((prev_values) => ({ ...prev_values, ["is_car" as keyof Values]: String(target?.id) }))} />
        </div>

        { data.is_car === "1" ? <div className="mb-4">
          <label className="text-sm font-medium text-white"> Avtomabilingiz rusumi? * </label>
          <Select name="about_car" value={data.about_car} required={data.is_car === "1"} options={localOptions.casr} onChange={(target) => setData((prev_values) => ({ ...prev_values, ["about_car" as keyof Values]: String(target?.id) }))} />
        </div> : null}

        { String(data.gender) === "1" ? <div className="mb-4">
          <label className="text-sm font-medium text-white"> Xizmat safariga bora olasizmi (Boshqa viloyat yoki tuman filiallarimizda ishlay olasizmi)? * </label>
          <Select name="trip" value={data.trip} required={String(data.gender) === "1"} options={localOptions.switch} onChange={(target) => setData((prev_values) => ({ ...prev_values, ["trip" as keyof Values]: String(target?.id) }))} />
        </div> : null}

        <div className="mb-4">
          <label className="text-sm font-medium text-white"> Bo'sh ish o'rni haqida qayerdan bildingiz? * </label>
          <Select name="about_vacancy" value={data.about_vacancy} options={localOptions.found_job} required onChange={(target) => setData((prev_values) => ({ ...prev_values, ["about_vacancy" as keyof Values]: String(target?.id) }))} />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white"> Sudlanganmisiz? * </label>
          <Select name="whether_convicted" value={data.whether_convicted} options={localOptions.switch} required onChange={(target) => setData((prev_values) => ({ ...prev_values, ["whether_convicted" as keyof Values]: String(target?.id) }))} />
        </div>

        { data.whether_convicted === "1" ? <div className="mb-4">
          <label className="text-sm font-medium text-white"> Sudlanganligingiz haqida qisqacha (Qaysi moddalar bo'yicha) </label>
          <Textarea name="whether_convicted_description" value={data.whether_convicted_description} rows={2} onChange={handleChangeInput} disabled={loading} />
        </div> : null}

        <div className="mb-4">
          <label className="text-sm font-medium text-white">Qo'shimcha telefon raqam</label>
          <PhoneNumberInput name="eddition_phone_number" value={data.eddition_phone_number} format="998 ## ### ## ##" placeholder="+998" disabled={loading} onValueChange={handleChangeInput}/>
        </div>

        <div className="mb-4 flex flex-col items-center justify-center">
          <div className="w-64">
            <label className="text-sm font-medium text-white">Shaxsiy rasmingiz * </label>
            <ImageUploader name="image" value={data.image} required disabled={loading} loading={loading} onChange={handleChangeInput} />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-white"> Pasport turi * </label>
          <Select name="pasport_type" value={data.pasport_type} options={localOptions.pasport_type} required onChange={(target) => setData((prev_values) => ({ ...prev_values, ["pasport_type" as keyof Values]: String(target?.id) }))} />
        </div>

        {/* green pasport */}
        { data.pasport_type === "Оддий" ? (
        <div className="mb-4 flex flex-col items-center justify-center">
          <div className="w-64">
            <label className="text-sm font-medium text-white">Pasport rasmi (to'liq va tiniq xolatda) * </label>
            <ImageUploader name="pasport_image_first" value={data.pasport_image_first} required disabled={loading} loading={loading} onChange={handleChangeInput} />
          </div>
        </div>) : 
        (<div className="mb-4 flex justify-between">
          <div className="w-[170px]">
            <label className="text-sm font-medium text-white"> ID karta old tomoni * </label>
            <ImageUploader name="pasport_image_first" value={data.pasport_image_first} required disabled={loading} loading={loading} onChange={handleChangeInput} />
          </div>

          <div className="w-[170px]">
            <label className="text-sm font-medium text-white"> ID karta orqa tomoni * </label>
            <ImageUploader name="pasport_image_second" value={data.pasport_image_second} required={data.pasport_type === "ID карта"} disabled={loading} loading={loading} onChange={handleChangeInput} />
          </div>
        </div>)}

        <TermsOfConsentModal setShowConsentModal={setShowConsentModal} showConsentModal={showConsentModal}/>
        
        <button type="submit" > submit</button>
      </form>
    </div>
  );
}