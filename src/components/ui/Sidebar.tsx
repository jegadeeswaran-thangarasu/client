import { LogOut } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import NavItem from '@/components/ui/NavItem';
import { useSidebar } from '@/context/SidebarContext';
import { NAV_SECTIONS } from '@/modules/navigation/config/navConfig';

interface SidebarProps {
  onLogout?: () => void;
}

export default function Sidebar({ onLogout = () => console.log('logout') }: SidebarProps) {
  const { isOpen } = useSidebar();
  const { pathname } = useLocation();

  return (
    <aside
      className={[
        'fixed left-0 top-14 z-40 flex h-[calc(100vh-3.5rem)] flex-col bg-slate-800 transition-all duration-300 ease-in-out',
        isOpen ? 'w-60' : 'w-16',
      ].join(' ')}
    >
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {NAV_SECTIONS.map((section, index) => (
          <div key={section.title}>
            {!isOpen && index > 0 && (
              <hr className="my-2 border-slate-700" />
            )}
            {isOpen && (
              <p className="px-4 pb-1 pt-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                {section.title}
              </p>
            )}
            {section.items.map((item) => (
              <NavItem
                key={item.path}
                label={item.label}
                icon={item.icon}
                path={item.path}
                isActive={pathname === item.path}
                isCollapsed={!isOpen}
              />
            ))}
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-slate-700 px-2 py-3">
        <button
          type="button"
          onClick={onLogout}
          title={!isOpen ? 'Logout' : undefined}
          className={[
            'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-slate-700 hover:text-red-400',
            !isOpen ? 'justify-center' : '',
          ].join(' ')}
        >
          <LogOut className="h-5 w-5 shrink-0" aria-hidden="true" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
