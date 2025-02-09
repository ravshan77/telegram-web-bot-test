import { useCallback, useState } from "react";
import { IFormData } from "./types";
import { User2, Phone } from "lucide-react";
import Select from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import MultiSelect from "@/components/ui/multiSelect";
import ChildrenTable from "./components/ChildrenTable";
import ImageUploader from "@/components/ui/uploadImage";
import { colorOptions, initial_values, positionsOptions } from "@/constants/index";
import useCloudStorage from "@/hooks/useCloudStorage";
import { debounce } from "lodash";
import { useTelegram } from "@/hooks/useTelegram";


export function FormPage() {
  const [loading] = useState(false);
  const { setItem, getItem } = useCloudStorage()
  const user = useTelegram()
  const [data, setData] = useState(initial_values);
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault() };

  // Debounce funksiyasini yaratamiz (faqat 500ms kutgandan keyin ishga tushadi)
  const saveToCloudStorage = debounce((formData) => {
    setItem("user_form_data", JSON.stringify(formData));
  }, 1000);


  const handleChangeInput = useCallback((e: React.ChangeEvent<HTMLInputElement> | { name: string; value: any }) => {
    setData((prev_values) => {
      const updatedData = "target" in e ? { ...prev_values, [e.target.name]: e.target.value } : { ...prev_values, [e.name]: e.value };
      saveToCloudStorage(updatedData);
  
      return updatedData;
    });
  },[])
  
  console.log(user);
  

  // getItem("user_form_data").then(console.log);
  

  
  return (
    <div className="px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Anketa</h1>
        <p className="mt-2 text-gray-600"> Пожалуйста заполните форму</p>
      </div>

      <form onSubmit={handleSubmit} className="">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">ФИО</label>
          <div className="relative bg-white rounded-md">
            <Input value={data.fullName} name="fullName" autoFocus onChange={handleChangeInput} disabled={loading} placeholder="Введите ваше полное имя" />
            <User2 className="absolute right-3 top-2 h-6 w-6 text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white"> Дата рождения </label>
          <div className="relative">
            <Input name="dateOfBirth" value={data.dateOfBirth} type="date" disabled={loading} onChange={handleChangeInput} />
            <Phone className="absolute right-3 top-2 h-6 w-6 text-gray-400" />
          </div>
        </div> 

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Multi Select</label>
          <div className="relative">
            <MultiSelect name={"company"} options={positionsOptions} value={data.positons} onChange={(target) => setData((prev_values) => ({ ...prev_values, ["positons" as keyof IFormData]: target }))} required />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Select</label>
          <div className="relative">
            <Select name={"company"} options={colorOptions} value={data.company} onChange={(target) => setData((prev_values) => ({ ...prev_values, ["company" as keyof IFormData]: target?.id }))} required />
          </div>
        </div>

        <div className="flex justify-between">
          <div className="space-y-2 w-44">
            <label className="text-sm font-medium text-white">Upload img </label>
            <div className="relative">
              <ImageUploader value={data.shaxsiy_image} onChange={handleChangeInput} name={"shaxsiy_image"} />
            </div>
          </div>

          <div className="space-y-2 w-44">
            <label className="text-sm font-medium text-white">Upload img </label>
            <div className="relative">
              <ImageUploader value={data.pasport_image} onChange={handleChangeInput} name="pasport_image" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <ChildrenTable setData={setData} data={data} key={"childrenTable"}/>
        </div>

        <div className="space-y-2 w-48">
          <label className="text-sm font-medium text-white">Upload img </label>
          <div className="relative">
            <ImageUploader value={data.back_pasport_image} onChange={handleChangeInput} name="back_pasport_image" />
          </div>
        </div>

      </form>
    </div>
  );
}