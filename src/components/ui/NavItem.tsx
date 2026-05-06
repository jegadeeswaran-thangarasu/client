import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface NavItemProps {
  label: string;
  icon: LucideIcon;
  path: string;
  isActive: boolean;
  isCollapsed: boolean;
}

export default function NavItem({ label, icon: Icon, path, isActive, isCollapsed }: NavItemProps) {
  return (
    <Link
      to={path}
      title={isCollapsed ? label : undefined}
      className={[
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150',
        isCollapsed ? 'justify-center' : '',
        isActive
          ? 'bg-brand-700 text-white'
          : 'text-gray-300 hover:bg-brand-600 hover:text-white',
      ].join(' ')}
    >
      <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
      {!isCollapsed && <span className="truncate">{label}</span>}
    </Link>
  );
}
