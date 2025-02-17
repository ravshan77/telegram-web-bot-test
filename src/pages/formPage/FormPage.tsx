// import { debounce } from "lodash";
import { Values } from "./types";
import { User2, Phone } from "lucide-react";
import Select from "@/components/ui/select";
import { useCallback, useState } from "react";
import { Input } from "@/components/ui/input";
// import { useTelegram } from "@/hooks/useTelegram";
// import useCloudStorage from "@/hooks/useCloudStorage";
import MultiSelect from "@/components/ui/multiSelect";
import ChildrenTable from "./components/ChildrenTable";
import ImageUploader from "@/components/ui/uploadImage";
import { NumberInput } from "@/components/ui/numberInput";
import { PhoneNumberInput } from "@/components/ui/phoneNumberInput";
import { colorOptions, initial_values, positionsOptions } from "@/constants/index";


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

      <form onSubmit={handleSubmit} className="">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">ФИО</label>
          <div className="relative bg-white rounded-md">
            <Input value={data.father_name} name="fullName" autoFocus onChange={handleChangeInput} disabled={loading} placeholder="Введите ваше полное имя" />
            <User2 className="absolute right-3 top-2 h-6 w-6 text-gray-400" />
          </div>
        </div>

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
          <label className="text-sm font-medium text-white"> Дата рождения </label>
          <div className="relative">
            <Input name="age" value={data.age} type="date" disabled={loading} onChange={handleChangeInput} />
            <Phone className="absolute right-3 top-2 h-6 w-6 text-gray-400" />
          </div>
        </div> 

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Multi Select</label>
          <div className="relative">
            <MultiSelect name={"position"} options={positionsOptions} value={data.position} onChange={(target) => setData((prev_values) => ({ ...prev_values, ["position" as keyof Values]: target }))} required />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Select</label>
          <div className="relative">
            <Select name={"gender"} options={colorOptions} value={data.gender} onChange={(target) => setData((prev_values) => ({ ...prev_values, ["gender" as keyof Values]: target?.id }))} required />
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

        <div className="space-y-2">
          <ChildrenTable setData={setData} data={data} key={"childrenTable"}/>
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