'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { LogOut } from 'lucide-react'; // Using only what you need
import { useRouter } from 'next/navigation';
import { FiMoreHorizontal } from 'react-icons/fi';
import { useState } from 'react';

const Dropdown = () => {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className='inline-flex items-center p-2 text-black rounded-full focus:outline-none hover:bg-gray-200'>
        <FiMoreHorizontal className='h-6 w-6' />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className='min-w-[180px] bg-white shadow-md rounded-md p-2 border focus:outline-none'
          align='end'
          sideOffset={5}
        >
          <DropdownMenu.Item
            onClick={handleLogout}
            className='flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer'
          >
            <LogOut className='mr-2 h-4 w-4' /> Log out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
