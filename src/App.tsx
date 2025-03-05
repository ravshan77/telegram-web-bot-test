import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const MainPage = React.lazy( () => import("@/pages/mainPage"))
const FormPage = React.lazy( () => import("@/pages/formPage/FormPage"))


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<FormPage />} />
          <Route path="/main" element={<MainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;