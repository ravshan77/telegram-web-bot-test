import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useCloudStorage from "@/hooks/useCloudStorage";
import { User2, Phone, Mail, Building2 } from "lucide-react";
import { useTelegram } from "@/hooks/useTelegram";

interface IFormData {
  fullName: string;
  phone: string;
  email: string;
  company: string;
}

const initial_values: IFormData = {fullName: "", phone: "", email: "", company: ""}
const ANKETA_DATA_SAVE_KEY = "ANKETA_DATA_SAVE_KEY"

export function FormPage() {
  const [formData, setFormData] = useState(initial_values);
  const [loading, setLoading] = useState(false)
  const { getItem, setItem } = useCloudStorage();
  const { user } = useTelegram();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const get_cloud_value = await getItem(ANKETA_DATA_SAVE_KEY);
        const values: IFormData = get_cloud_value ? JSON.parse(get_cloud_value) : initial_values;
        setFormData(values);
      } catch (error) {
        alert(`Error fetching data: ${error}`);
      } finally{
        setLoading(false)
      }
    };

    fetchData();
  }, [getItem]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Telegram orqali backend'ga loglar yuborish
    //   try{
    //     await fetch('https://9c67-185-139-138-129.ngrok-free.app/log', {
    //      method: 'POST',
    //      headers: { 'Content-Type': 'application/json' },
    //      body: JSON.stringify(formData),
    //  });
    //   } catch(err){
    //      alert(err)
    //   }
    
    try {
      setLoading(true)
      // Ma'lumot saqlash
      await setItem(ANKETA_DATA_SAVE_KEY, JSON.stringify(formData));
      alert("Data stored successfully");

      // Ma'lumotni olish
      // const value = await getItem(ANKETA_DATA_SAVE_KEY);
      // alert(`Retrieved value:${value}`);

      // Kalitlarni olish
      // const keys = await getKeys();
      // alert(`All keys: ${keys}`);
    } catch (error) {
      alert(`CloudStorage error: ${error}`);
    }finally{
      setLoading(false)
    }
    
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Анкета</h1>
        <p className="mt-2 text-gray-600">Пожалуйста, заполните форму ниже {user?.first_name}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">ФИО</label>
          <div className="relative">
            <Input
              placeholder="Введите ваше полное имя"
              value={formData.fullName}
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

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <div className="relative">
            <Input
              // type="email"
              placeholder="example@email.com"
              value={formData.email}
              disabled={loading}
              onChange={(e) => setFormData(prev_values => ({ ...prev_values, email: e.target.value })) }
            />
            <Mail className="absolute right-3 top-3 h-6 w-6 text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Компания</label>
          <div className="relative">
            <Input
              placeholder="Название компании"
              value={formData.company}
              disabled={loading}
              onChange={(e) => setFormData(prev_values => ({ ...prev_values, company: e.target.value }))}
            />
            <Building2 className="absolute right-3 top-3 h-6 w-6 text-gray-400" />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          Отправить
        </Button>
      </form>
    </div>
  );
}
