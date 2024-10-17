'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    if (!email) {
      setError('Please Enter a valid Email to login!');
      return;
    }
    login(email);
    router.push('/home');
  };

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='w-fit h-fit flex flex-col break-words gap-6 items-center justify-center bg-gray-200 border border-gray-400 p-6 rounded-md shadow-md'>
        <div className='flex flex-col items-center'>
          <p className='text-3xl font-medium font-sans text-red-500'>
            Welcome to Movie box
          </p>
          <p className='text-sm text-gray-500 font-medium'>
            Please entern your email to login
          </p>
        </div>
        <div className='flex flex-col gap-2 items-center'>
          <input
            type='email'
            placeholder='Enter your email'
            value={email}
            className={`p-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg w-60 ${
              error && 'border-2 border-red-500'
            }`}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
          />
          {error && (
            <div className='text-sm text-red-600 font-semibold font-mono'>
              {error}
            </div>
          )}
        </div>
        <button
          className='bg-blue-500 rounded-lg  p-2 text-white font-medium hover:bg-blue-600 w-24'
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
