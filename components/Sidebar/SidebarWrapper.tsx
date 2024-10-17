'use client';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar/Sidebar';

export default function SidebarLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideSidebar = pathname === '/login'; // Add more routes if needed

  return (
    <div className='flex flex-col md:flex-row md:h-screen'>
      {!hideSidebar && <Sidebar />}
      <main
        className={`flex-1 p-6 bg-gray-100 overflow-auto ${
          hideSidebar ? 'w-full' : ''
        }`}
      >
        {children}
      </main>
    </div>
  );
}
