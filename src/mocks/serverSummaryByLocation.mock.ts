import type { ServerByLocation } from '@/types/serverSummary.types';

export const SERVER_BY_LOCATION_MOCK: ServerByLocation[] = [
  { location: 'Philadelphia DC1', blade: 312, rack: 145, total: 457, maintenance:  8, healthPercent: 65 },
  { location: 'Nashville DC2',    blade: 218, rack:  97, total: 315, maintenance: 12, healthPercent: 85 },
  { location: 'Denver DC3',       blade: 176, rack:  88, total: 264, maintenance:  5, healthPercent: 40 },
  { location: 'Phoenix DC4',      blade: 160, rack:  88, total: 248, maintenance:  6, healthPercent: 68 },
];
