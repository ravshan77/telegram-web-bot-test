import "./index.css";
import App from "./App.tsx";
import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import Loading from "@/components/Loading.tsx";

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<Loading />}>
    <App />
  </Suspense>
);
