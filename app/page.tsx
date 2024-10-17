'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/login'); // Redirect to the login page on load
  }, [router]);

  return null;
};

export default Page;
