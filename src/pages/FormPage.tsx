import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User2, Phone, Mail, Building2 } from "lucide-react";
import useCloudStorage from "@/hooks/useCloudStorage";

interface IFormData {
  fullName: string;
  phone: string;
  email: string;
  company: string;
}

export function FormPage() {
  const [formData, setFormData] = useState<IFormData>({fullName: "", phone: "", email: "", company: "" });
  const { getItem, setItem } = useCloudStorage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const get_cloud_value = await getItem("exampleKey");
        const values: IFormData = JSON.parse(get_cloud_value);
        setFormData(values);
      } catch (error) {
        console.error("Error fetching data:", error);
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
      // Ma'lumot saqlash
      await setItem("exampleKey", JSON.stringify(formData));
      alert("Data stored successfully");

      // Ma'lumotni olish
      // const value = await getItem('exampleKey');
      // alert(`Retrieved value:${value}`);

      // Kalitlarni olish
      // const keys = await getKeys();
      // alert(`All keys: ${keys}`);
    } catch (error) {
      alert(`CloudStorage error: ${error}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Анкета</h1>
        <p className="mt-2 text-gray-600">Пожалуйста, заполните форму ниже</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">ФИО</label>
          <div className="relative">
            <Input
              placeholder="Введите ваше полное имя"
              value={formData.fullName}
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
              onChange={(e) => setFormData(prev_values => ({ ...prev_values, phone: e.target.value })) }
            />
            <Phone className="absolute right-3 top-3 h-6 w-6 text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <div className="relative">
            <Input
              type="email"
              placeholder="example@email.com"
              value={formData.email}
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
              onChange={(e) => setFormData(prev_values => ({ ...prev_values, company: e.target.value }))}
            />
            <Building2 className="absolute right-3 top-3 h-6 w-6 text-gray-400" />
          </div>
        </div>

        <Button type="submit" className="w-full">
          Отправить
        </Button>
      </form>
    </div>
  );
}
