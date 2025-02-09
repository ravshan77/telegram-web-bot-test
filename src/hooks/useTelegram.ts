import useWebApp from "./useWebApp";

// hooks/useTelegram.ts
export const useTelegram = () => {
    const tg = useWebApp();
  
  
    return {
      tg,
      user: tg?.initDataUnsafe?.user || { id:5886555702 },
    };
  };
  