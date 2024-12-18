import { Outlet } from "react-router-dom";
import darkBg from "../assets/darkbg.svg";

export function MainLayout() {
  return (
    <div
      className="min-h-screen flex flex-col mx-auto max-w-md"
      style={{
        backgroundImage: `url(${darkBg})`,
        // backgroundRepeat: "no-repeat", // Takrorlanishni oldini olish
        backgroundPosition: "center", // Backgroundni markazlash
        // backgroundSize: "cover", // Backgroundni to'liq qoplash
      }}
    >
      <div className="flex-1 overflow-auto" style={{ maxHeight: "100vh" }}>
        <main className="">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
