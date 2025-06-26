'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Home, HelpCircle, StickyNote, LogOut, PartyPopper } from 'lucide-react';
import clsx from 'clsx';

const menu = [
  { label: 'Нүүр', href: '/dashboard', tab: null, icon: Home },
  { label: 'Тэмдэглэлт өдрүүд', href: '/dashboard?tab=events', tab: 'events', icon: PartyPopper },
  { label: 'Шинэ карт', href: '/dashboard?tab=new-card', tab: 'new-card', icon: HelpCircle },
  {
    label: 'Талархны самбар',
    href: '/dashboard?tab=gratitude',
    tab: 'gratitude',
    icon: StickyNote,
  },
];

const DashboardSidebar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab');
  const isUserTab = currentTab === 'user';

  return (
    <div className="w-[100%] max-w-xs bg-white p-12 h-screen">
      <div className="flex flex-col justify-between h-full">
        <nav className="flex flex-col gap-12 text-sm text-gray-700">
          {menu.map(({ label, href, tab, icon: Icon }) => {
            const isActive =
              (pathname === '/dashboard' && !tab && !currentTab) || currentTab === tab;

            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'flex items-center gap-3 transition-all',
                  isActive ? 'text-indigo-600 font-semibold' : 'hover:text-indigo-500'
                )}
              >
                <Icon size={20} className={clsx(isActive ? 'text-indigo-600' : 'text-gray-500')} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex flex-col gap-4 pt-8 text-sm">
          <Link
            href="/dashboard?tab=user"
            className={clsx(
              'flex items-center gap-3 transition-all',
              isUserTab ? 'text-indigo-600 font-semibold' : 'text-gray-700 hover:text-indigo-500'
            )}
          >
            <HelpCircle size={20} className={isUserTab ? 'text-indigo-600' : 'text-gray-500'} />
            Миний булан
          </Link>
          <Link
            href="/logout"
            className="flex items-center gap-3 text-red-500 hover:text-red-600 transition-all"
          >
            <LogOut size={20} />
            Гарах
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
