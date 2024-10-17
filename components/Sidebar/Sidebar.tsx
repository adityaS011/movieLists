'use client';
import SearchBar from '../SearchBar';
import Seprator from '../Seprator';
import MyLists from '../../app/home/MyLists';
import { useRouter } from 'next/navigation';
import Dropdown from '../../app/ui/Dropdown';
import { MdAccountCircle, MdMenu, MdClose } from 'react-icons/md';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

const Sidebar = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className='relative  '>
      <div className='md:hidden p-2 flex flex-row justify-between'>
        <h1 className='text-2xl text-red-500 font-semibold'>Watchlists</h1>
        <MdMenu
          className='w-6 h-6 text-red-500 cursor-pointer'
          onClick={toggleSidebar}
        />
      </div>
      <div
        className={`fixed md:hidden  inset-0 bg-gray-900 bg-opacity-75 z-50 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={` fixed right-0  flex flex-col gap-4 top-0 w-64 bg-gray-100 text-white h-full  p-4 border-r border-gray-400 transition-transform ${
            isOpen ? 'transform-none' : '-translate-x-full'
          }`}
        >
          <div className='flex flex-row justify-between items-center '>
            <h1 className='text-4xl text-red-500 font-semibold'>Watchlists</h1>
            <MdClose
              className='w-5 h-5 text-black cursor-pointer '
              onClick={toggleSidebar}
            />
          </div>
          <SearchBar />
          <div
            className='w-full text-white bg-red-500 rounded-md p-2 cursor-pointer hover:bg-red-600 text-center'
            onClick={() => router.push('/home')}
          >
            Home
          </div>
          <Seprator />
          <MyLists />
        </div>
      </div>
      <div className='hidden md:flex flex-col gap-4 w-fit min-w-64 bg-gray-100 text-white p-4 justify-between border-r border-gray-400 h-screen'>
        <h1 className='text-4xl mt-2 flex justify-center text-red-500 font-semibold w-full'>
          Watchlists
        </h1>
        <SearchBar />
        <div
          className='w-full text-white bg-red-500 rounded-md p-2 cursor-pointer hover:bg-red-600 text-center'
          onClick={() => router.push('/home')}
        >
          Home
        </div>
        <Seprator />
        <MyLists />
        <div className='text-center flex flex-row justify-between items-center border border-gray-400 rounded px-2 mt-auto'>
          <div className='text-gray-600 gap-2 flex flex-row items-center'>
            <MdAccountCircle className='w-8 h-8 text-red-400' />
            <p className='text-gray-600 font-semibold max-w-32 line-clamp-1 text-ellipsis'>
              {user?.split('.')[0]}
            </p>
          </div>
          <Dropdown />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
