'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Home, HelpCircle, StickyNote, LogOut, PartyPopper,Pencil } from 'lucide-react';
import clsx from 'clsx';
import { logout } from './logout';

const menu = [
  { label: 'Нүүр', href: '/dashboard', tab: null, icon: Home },
  
  { label: 'Талархал бичих', href: '/dashboard?tab=new-card', tab: 'new-card', icon: Pencil },
  { label: 'Тэмдэглэлт өдрүүд', href: '/dashboard?tab=events', tab: 'events', icon: PartyPopper },
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

  return (
    <aside className="w-[30%] max-w-xs bg-white p-12">
      <div className="flex flex-col items-center justify-between h-full">
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
