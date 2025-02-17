import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { User2 } from "lucide-react";


export function MainPage() {
  

  return (
    <div className="border border-green-500 py-4 px-4" style={{background:"url(../assets/darkgg.svg"}}>
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Anketa</h1>
        <p className="mt-2 text-gray-600"> Пожалуйста заполните форму</p>
      </div>

      <form className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">ФИО</label>
          <div className="relative">
            <Input placeholder="Введите ваше полное имя" />
            <User2 className="absolute right-3 top-3 h-6 w-6 text-gray-400" />
          </div>
        </div>

        <Button type="submit" className="w-full">
          Отправить
        </Button>
      </form>
    </div>
  );
}
