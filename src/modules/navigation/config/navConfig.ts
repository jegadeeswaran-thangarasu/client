import {
  LayoutDashboard,
  Network,
  Server,
  Monitor,
  ArrowUpCircle,
  Settings,
  type LucideIcon,
} from 'lucide-react';
import { ROUTES } from '@/router/routes';

export type NavItem = {
  label: string;
  icon: LucideIcon;
  path: string;
  section: string;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export const NAV_SECTIONS: NavSection[] = [
  {
    title: 'OVERVIEW',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, path: ROUTES.DASHBOARD, section: 'OVERVIEW' },
    ],
  },
  {
    title: 'INFRASTRUCTURE',
    items: [
      { label: 'Domain Summary', icon: Network,  path: ROUTES.DOMAIN_SUMMARY,  section: 'INFRASTRUCTURE' },
      { label: 'Server Summary', icon: Server,   path: ROUTES.SERVER_SUMMARY,  section: 'INFRASTRUCTURE' },
      { label: 'Server Details', icon: Monitor,  path: ROUTES.SERVER_DETAILS,  section: 'INFRASTRUCTURE' },
    ],
  },
  {
    title: 'REQUESTS',
    items: [
      { label: 'Resource Upgrades', icon: ArrowUpCircle, path: ROUTES.RESOURCE_UPGRADES, section: 'REQUESTS' },
    ],
  },
  // {
  //   title: 'ANALYTICS',
  //   items: [
  //     { label: 'BU Usage',       icon: BarChart2, path: ROUTES.BU_USAGE,       section: 'ANALYTICS' },
  //     { label: 'Infra Runway',   icon: Layers,    path: ROUTES.INFRA_RUNWAY,   section: 'ANALYTICS' },
  //     { label: 'Executive View', icon: PieChart,  path: ROUTES.EXECUTIVE_VIEW, section: 'ANALYTICS' },
  //   ],
  // },
  {
    title: 'ADMINISTRATION',
    items: [
      { label: 'Configuration', icon: Settings, path: ROUTES.CONFIGURATION, section: 'ADMINISTRATION' },
    ],
  },
];
