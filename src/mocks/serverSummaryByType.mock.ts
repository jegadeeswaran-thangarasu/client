import type { ServerByType } from '@/types/serverSummary.types';

export const SERVER_BY_TYPE_MOCK: ServerByType[] = [
  { modelFamily: 'UCSB-B200-M5',  type: 'Blade',          count: 312, avgCpuCores: 28, avgMemoryGB: 256, location: 'Philadelphia DC1' },
  { modelFamily: 'UCSB-B200-M6',  type: 'Blade',          count: 248, avgCpuCores: 32, avgMemoryGB: 384, location: 'Nashville DC2'    },
  { modelFamily: 'UCSX-210C-M6',  type: 'Blade (X-Series)', count: 186, avgCpuCores: 40, avgMemoryGB: 512, location: 'Denver DC3'    },
  { modelFamily: 'UCSB-B480-M5',  type: 'Blade',          count: 120, avgCpuCores: 56, avgMemoryGB: 768, location: 'Nashville DC2'    },
  { modelFamily: 'UCSC-C240-M5',  type: 'Rack',           count: 248, avgCpuCores: 24, avgMemoryGB: 192, location: 'Philadelphia DC1' },
  { modelFamily: 'UCSC-C220-M6',  type: 'Rack',           count: 170, avgCpuCores: 16, avgMemoryGB: 128, location: 'Phoenix DC4'      },
];
