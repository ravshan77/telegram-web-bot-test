import { IFormData } from "./types";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { User2, Phone } from "lucide-react";
import { useTelegram } from "@/hooks/useTelegram";
// import { DatePicker } from "@/components/ui/datePicker";


const initial_values: IFormData = {fullName: "", phone: "", email: "", company: "", dateOfBirth: null}

export function FormPage() {
  const [formData, setFormData] = useState(initial_values);
  const [loading] = useState(false)
  const {user}: { user:any } = useTelegram()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 
  };

  // useEffect(() => {
  //  alert(user)
  // },[])


  return (
    <div className="border border-red-500 px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Anketa</h1>
        <p className="mt-2 text-gray-600"> Пожалуйста заполните форму</p>
      </div>

<code>{user}</code>
      <form onSubmit={handleSubmit} className="">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">ФИО</label>
          <div className="relative bg-white rounded-md">
            <Input
              placeholder="Введите ваше полное имя"
              value={formData.fullName}
              autoFocus
              disabled={loading}
              onChange={(e) => setFormData(prev_values => ({ ...prev_values, fullName: e.target.value }))}
            />
            <User2 className="absolute right-3 top-3 h-6 w-6 text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Телефон</label>
          <div className="relative">
            <Input
              type="tel"
              placeholder="+7 (999) 999-99-99"
              value={formData.phone}
              disabled={loading}
              onChange={(e) => setFormData(prev_values => ({ ...prev_values, phone: e.target.value })) }
            />
            <Phone className="absolute right-3 top-3 h-6 w-6 text-gray-400" />
          </div>
        </div>

        {/* <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Дата рождения</label>
          <DatePicker
            value={formData.dateOfBirth}
            onChange={(date) => setFormData((prev) => ({ ...prev, dateOfBirth: date }))}
            disabled={loading}
            placeholder="Выберите дату"
          />
        </div> */}

      </form>

      
      
    </div>
  );
}
