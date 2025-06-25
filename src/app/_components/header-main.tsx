'use client';

import { usePathname } from 'next/navigation';
import Header from './header';

const HeaderMain = () => {
  const pathname = usePathname();
  if (pathname === '/') return null;
  return <Header />;
};

export default HeaderMain;
