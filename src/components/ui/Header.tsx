import { Bell, HelpCircle, Menu, X } from 'lucide-react';
import { useSidebar } from '@/context/SidebarContext';

function HeaderActions() {
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        aria-label="Notifications"
        className="relative text-gray-300 transition-colors hover:text-white"
      >
        <Bell className="h-5 w-5" aria-hidden="true" />
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500" />
      </button>

      <button
        type="button"
        aria-label="Help"
        className="text-gray-300 transition-colors hover:text-white"
      >
        <HelpCircle className="h-5 w-5" aria-hidden="true" />
      </button>

      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-xs font-semibold text-white">
          JS
        </div>
        <span className="text-sm font-medium text-white">J. Smith</span>
      </div>
    </div>
  );
}

export default function Header() {
  const { isOpen, toggle } = useSidebar();

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between bg-slate-800 px-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
          className="text-gray-300 transition-colors hover:text-white"
        >
          {isOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>

        <span className="text-sm font-bold text-white">
          Infrastructure Capacity Planning
        </span>

        <span className="select-none text-gray-500">|</span>

        <span className="text-sm font-normal text-gray-300">Enterprise Dashboard</span>
      </div>

      <HeaderActions />
    </header>
  );
}
