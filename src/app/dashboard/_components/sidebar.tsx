/* eslint-disable */

'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';


import { Home, StickyNote, LogOut, PartyPopper,Pencil, UsersRound, UserRound, ChevronDown,  BookUser, } from 'lucide-react';
import { logout } from './logout';


import clsx from 'clsx';

const menu = [
  { label: 'Миний булан', href: '/dashboard?tab=profile', tab:'profile', icon: UserRound },
  { label: 'Нүүр', href: '/dashboard', tab: null, icon: Home },

  { label: 'Талархал бичих', href: '/dashboard?tab=new-card', tab: 'new-card', icon: Pencil },
  { label: 'Тэмдэглэлт өдрүүд', href: '/dashboard?tab=events', tab: 'events', icon: PartyPopper },
  {
    label: 'Талархалын самбар',
    href: '/dashboard?tab=gratitude',
    tab: 'gratitude',
    icon: StickyNote,
  },
  { label: 'Бүх ажилчин', href: '/dashboard?tab=user', tab: 'user', icon: UsersRound },
  {label: 'Миний талархал',href: '/dashboard?tab=posts',tab: 'posts' ,icon:BookUser},
];

const DashboardSidebar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab');
  // const isUserTab = currentTab === 'user';



  return (
    <div className="fixed top-0 left-0 w-[100%] max-w-xs bg-white p-8 h-screen shadow z-40 pt-[120px]">
      <div className="flex flex-col justify-between h-full">
        <nav className="flex flex-col gap-6 text-sm text-gray-700">
          {menu.map(({ label, href, tab, icon: Icon }) => {
            const isActive =
              (pathname === '/dashboard' && !tab && !currentTab) || currentTab === tab;
            if (tab === 'profile') {
              return (
                <Link href={'/dashboard?tab=profile'} key={12}>
                  <div className="rounded-[16px] border-[1px] border-solid border-[#E6E7EC] w-[226px] h-[72px] flex justify-between items-center">
                    <div className="flex justify-center items-center">
                      <div className="flex gap-[16px] ml-[16px]">
                        <img className="w-[40px] h-[40px] rounded-full" src={'/half.png'}></img>
                        <div>
                          <div>Name</div>
                          <div>Миний булан</div>
                        </div>
                      </div>
                      <div className="ml-[32px]">
                        {' '}
                        <ChevronDown />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            }
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'flex items-center gap-1 transition-all px-4 py-4 rounded-lg',
                  isActive ? 'text-[#FF5252] bg-[#FFEBEB] font-semibold' : 'hover:bg-gray-100',
                )}
              >
                <Icon size={20} className={clsx(isActive ? 'text-[#FF5252]' : 'text-gray-500')} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex flex-col gap-4 pt-8 text-sm">

        
          <button
           onClick={logout}
            className="flex items-center gap-3 text-red-500 hover:text-red-600 transition-all"
          >
            <LogOut size={20} />
            Гарах
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
