import { Outlet } from 'react-router-dom';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <main className="container mx-auto px-4 py-8 max-w-md">
        <Outlet />
      </main>
    </div>
  );
}