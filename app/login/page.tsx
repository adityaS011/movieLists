import { Suspense } from 'react';
import LoginPage from './LoginPage';

const Page = () => {
  return (
    <Suspense>
      <LoginPage />
    </Suspense>
  );
};

export default Page;
