import { image_url } from "@/baseUrl";
import { Trash2 } from "lucide-react";
import { fetchRequest } from "@/utils/fetchRequest";
import React, { useCallback, useState } from "react";
import imageCompression from "browser-image-compression";

interface Props {
  name: string;
  value: string;
  loading: boolean;
  disabled: boolean;
  required: boolean;
  onChange: (target: { name: string; value: string | null }) => void;
}

const ImageUploader: React.FC<Props> = ({ onChange, value, name, disabled, required, loading }) => {
  const [loadingImage, setLoading] = useState(loading);

  const handleImageUpload = useCallback(async ( event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

      setLoading(true);
      const options = { maxSizeMB: 10, maxWidthOrHeight: 1920, fileType: "image/jpeg" };

      try {
        // Fayl .jpg ga convertatsiya qilish 
        const compressedFile = await imageCompression(file, options);
        const convertedFile = new File([compressedFile],`${file.name.split(".")[0]}.jpg`, { type: "image/jpeg" } );

        // Faylni FormData ichiga joylash
        const formData = new FormData();
        formData.append("file", convertedFile);

        // Faylni yuborish
        const data = await fetchRequest<string>(`/anketa-web-app/store/image`, { method: "POST", data: formData,})

          if (data) onChange({ value: data, name })
          else throw new Error("Server xatoligi")
      } catch (error) {
        alert(`Rasm yuklashda xatolik (admin bilan bog'laning @paloncha): ${error instanceof Error ? error.message : error}`);
      } finally{
        setLoading(false)
      }
  },[ name, onChange ]);


  const handleDelete = useCallback( async () => {
    if (!value) return;

    setLoading(true)
    try{
      const data = await fetchRequest<string>(`/anketa-web-app/delete/image`, { method: "POST", data: { file: value} })
      if (data) onChange({ value: "", name })
      else throw new Error("Server xatoligi")
    } catch(error){
      alert(`Error deleting image: ${error instanceof Error ? error.message : error}`);
    } finally{
      setLoading(false)
    }

  },[name, onChange, value])

  

  return (
    <div>
      {value ? (
        <div className="relative">
          <img src={`${image_url}/storage/${value}`} alt="Rasm" className="h-56 w-full rounded-md border border-gray-500"/>
          <Trash2 onClick={handleDelete} className="absolute h-8 w-8 p-[2px] bottom-1 right-1 rounded text-red-500 cursor-pointer" />
        </div>
      ) : (
        <label htmlFor={name} className="bg-white text-gray-500 font-semibold text-base rounded max-w-md h-56 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]">
          {loadingImage ? (
            <div className="flex flex-col items-center">
              {/* Spinner */}
              <svg className="animate-spin h-10 w-10 text-blue-500 mb-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" ></path>
              </svg>
              <p className="text-sm text-gray-500">Yuklanmoqda...</p>
            </div>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
                <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" data-original="#000000" />
                <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" data-original="#000000" />
              </svg>
              Rasm yuklang
            </>
          )}
          <input type="file" id={name} required={required} disabled={disabled || loadingImage || loading} className="hidden" accept="image/*" onChange={handleImageUpload} />
          {!loadingImage && <p className="text-xs font-medium text-gray-400 mt-2 p-2">PNG, JPG, JPEG va WEBP ruxsat etilgan.</p>}
        </label>
      )}
    </div>
  );
};

export default ImageUploader;
