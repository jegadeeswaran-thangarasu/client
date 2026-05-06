import { Outlet } from 'react-router-dom';
import Header from '@/components/ui/Header';
import Sidebar from '@/components/ui/Sidebar';
import { useSidebar } from '@/context/SidebarContext';

export default function AppLayout() {
  const { isOpen } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Sidebar />
      <main
        className={[
          'pt-14 transition-all duration-300 ease-in-out',
          isOpen ? 'ml-60' : 'ml-16',
        ].join(' ')}
      >
        <Outlet />
      </main>
    </div>
  );
}
