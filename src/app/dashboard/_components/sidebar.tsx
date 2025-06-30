'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Home, StickyNote, LogOut, PartyPopper,Pencil, UsersRound, UserRound, ChevronDown, } from 'lucide-react';

import clsx from 'clsx';
import { logout } from './logout';

const menu = [
   {label: "Миний булан",href:"/dashboard?tab=profle",tab:"profile",icon:UserRound},
  { label: 'Нүүр', href: '/dashboard', tab: null, icon: Home },

  
  { label: 'Талархал бичих', href: '/dashboard?tab=new-card', tab: 'new-card', icon: Pencil },
  { label: 'Тэмдэглэлт өдрүүд', href: '/dashboard?tab=events', tab: 'events', icon: PartyPopper },
  {
    label: 'Талархны самбар',
    href: '/dashboard?tab=gratitude',
    tab: 'gratitude',
    icon: StickyNote,
  },
  { label : "Бүх ажилчин", href : "/dashboard?tab=users", tab : "users",icon : UsersRound },
 
];

const DashboardSidebar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab');
  

  return (
    <aside className="w-[30%] max-w-xs bg-white p-12">
      <div className="flex flex-col items-center justify-between h-full">
        <nav className="flex flex-col gap-12 text-sm text-gray-700">
         
          {menu.map(({ label, href, tab, icon: Icon }) => {
            const isActive =
              (pathname === '/dashboard' && !tab && !currentTab) || currentTab === tab;
              if(tab==="profile"){
                return (  <Link href={"/dashboard?tab=profile"} key={1}>
              <div className='rounded-[16px] border-[1px] border-solid border-[#E6E7EC] w-[226px] h-[72px] flex justify-between items-center'>
                <div className='flex justify-center items-center'>
                  <div className='flex gap-[16px] ml-[16px]'>
                  <img className='w-[40px] h-[40px] rounded-full' src={"/half.png"}></img>
                  <div>
                    <div>Name</div>
                    <div>Миний булан</div>
                  </div>
                  
                </div>
               <div className='ml-[32px]'> <ChevronDown /></div>

                </div>

              </div>

          </Link>)
              }
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'flex items-center gap-3 transition-all',
                  isActive ? 'text-[#FF5252] font-semibold' : 'hover:text-indigo-500'
                )}
              >
                <Icon size={20} className={clsx(isActive ? 'text-[#FF5252]' : 'text-gray-500')} />
                {label}
              </Link>
            );
            
          })}

          <div className="mt-auto pt-6 border-t">
            <Link
              href="/"
              className="flex items-center gap-3 text-red-500 hover:text-red-600 transition-all"
            >
              <LogOut size={20} />
              <button onClick={logout}>Гарах</button>
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
