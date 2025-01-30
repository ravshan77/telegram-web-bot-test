import { BaseUrl } from "@/baseUrl";

type FetchMethod = "GET" | "POST" | "PUT" | "DELETE";

interface FetchOptions {
  method?: FetchMethod;
  data?: any;
  headers?: HeadersInit;
}

export const fetchRequest = async <T>( url: string, { method = "POST", data = null, headers = {} }: FetchOptions = {}): Promise<T | null> => {
    try {
      const options: RequestInit = {
        method,
        headers: {
          ...headers,
        },
      };
  
      // Agar fayl yoki FormData bo‘lsa, `Content-Type` qo‘shilmaydi (brauzer avtomatik qiladi)
      if (!(data instanceof FormData)) {
        options.body = JSON.stringify(data);
        options.headers = { "Content-Type": "application/json", ...headers };
      } else if (data) {
        options.body = data;
      }
  
      
      const fetch_url = BaseUrl+url
      const response = await fetch(fetch_url, options);
      
      if (!response.ok) {
        throw new Error(`Xatolik: ${response.status} - ${response.statusText}`);
      }
        const responseData: any = await response.text();
         return responseData as T

    } catch (error) {
      console.error("So‘rovda xatolik yuz berdi:", error);
      return null;
    }
  };
  

