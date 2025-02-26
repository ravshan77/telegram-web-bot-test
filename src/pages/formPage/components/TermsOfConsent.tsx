import React, { useState } from "react";

interface Props {
    showConsentModal: boolean
    setShowConsentModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TermsOfConsentModal({ showConsentModal, setShowConsentModal }: Props) {
    const [checkbox, setCheckbox] = useState(false)

    const onChecked = () => {
      setCheckbox(true)
      setShowConsentModal(false)
    }

    return (
      <>
        <div className="flex space-y-2">
          <input type="checkbox" required  checked={checkbox} onChange={e => setCheckbox(e.target.checked)} className="h-5 w-5 mt-2 mr-2"/>
          <p className="text-sm font-medium text-white">Roziman * <span className="text-cyan-600" onClick={() => setShowConsentModal(true)}> (Rozilik shartlari bilan tanishish) </span></p>
        </div>
        {showConsentModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-xl font-semibold"> Rozilik shartlari </h3>
                    </div>
                    {/*body*/}
                    <div className="relative p-4 py-0 flex-auto">
                      <p className="my-4 text-slate-500 text-sm leading-relaxed">
                        Rozilik shartlarini tasdiqlash orqali siz o'zingizning shaxsiy ma'lumotlaringizni kompaniya maqsadlarida qayta ishlash uchun ularni saqlashga, 
                        foydalanishga va o'zaro almashishga rozilik bildirasiz. Shuningdek, ushbu anketada siz taqdim etgan barcha ma'lumotlar ishonchli ekanligi va 
                        yolg'on ma'lumot uzatilishi holatlari aniqlangan taqdirda barcha javobgarlikni o'z zimmangizga olasiz!
                      </p>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-center p-3 border-t border-solid border-slate-200 rounded-b">
                    <button onClick={onChecked} type="button" className="bg-cyan-600 text-white active:bg-cyan-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                        Roziman
                    </button>
                    </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
  );
}