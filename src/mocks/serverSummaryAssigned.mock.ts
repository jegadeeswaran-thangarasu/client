import type { ServerAssigned } from '@/types/serverSummary.types';

export const SERVER_ASSIGNED_MOCK: ServerAssigned[] = [
  // UCSB-B480-M5 — Blade
  { modelFamily: 'UCSB-B480-M5', type: 'Blade',           location: 'Nashville DC2',    total:  48, assigned:  46, unassigned:  2, assignedPercent: 96 },
  { modelFamily: 'UCSB-B480-M5', type: 'Blade',           location: 'Philadelphia DC1', total:  36, assigned:  32, unassigned:  4, assignedPercent: 89 },

  // UCSX-210C-M6 — Blade (X-Series)
  { modelFamily: 'UCSX-210C-M6', type: 'Blade (X-Series)', location: 'Nashville DC2',    total:  64, assigned:  60, unassigned:  4, assignedPercent: 94 },
  { modelFamily: 'UCSX-210C-M6', type: 'Blade (X-Series)', location: 'Philadelphia DC1', total:  52, assigned:  48, unassigned:  4, assignedPercent: 92 },
  { modelFamily: 'UCSX-210C-M6', type: 'Blade (X-Series)', location: 'Denver DC3',       total:  40, assigned:  34, unassigned:  6, assignedPercent: 85 },

  // UCSB-B200-M5 — Blade
  { modelFamily: 'UCSB-B200-M5', type: 'Blade',           location: 'Philadelphia DC1', total:  80, assigned:  78, unassigned:  2, assignedPercent: 98 },
  { modelFamily: 'UCSB-B200-M5', type: 'Blade',           location: 'Nashville DC2',    total:  64, assigned:  58, unassigned:  6, assignedPercent: 91 },
  { modelFamily: 'UCSB-B200-M5', type: 'Blade',           location: 'Denver DC3',       total:  48, assigned:  40, unassigned:  8, assignedPercent: 83 },
  { modelFamily: 'UCSB-B200-M5', type: 'Blade',           location: 'Phoenix DC4',      total:  40, assigned:  36, unassigned:  4, assignedPercent: 90 },

  // UCSB-B200-M6 — Blade
  { modelFamily: 'UCSB-B200-M6', type: 'Blade',           location: 'Nashville DC2',    total:  72, assigned:  70, unassigned:  2, assignedPercent: 97 },
  { modelFamily: 'UCSB-B200-M6', type: 'Blade',           location: 'Philadelphia DC1', total:  56, assigned:  52, unassigned:  4, assignedPercent: 93 },
  { modelFamily: 'UCSB-B200-M6', type: 'Blade',           location: 'Denver DC3',       total:  44, assigned:  38, unassigned:  6, assignedPercent: 86 },
  { modelFamily: 'UCSB-B200-M6', type: 'Blade',           location: 'Phoenix DC4',      total:  36, assigned:  30, unassigned:  6, assignedPercent: 83 },

  // UCSC-C240-M5 — Rack
  { modelFamily: 'UCSC-C240-M5', type: 'Rack',            location: 'Philadelphia DC1', total:  60, assigned:  58, unassigned:  2, assignedPercent: 97 },
  { modelFamily: 'UCSC-C240-M5', type: 'Rack',            location: 'Nashville DC2',    total:  48, assigned:  44, unassigned:  4, assignedPercent: 92 },
  { modelFamily: 'UCSC-C240-M5', type: 'Rack',            location: 'Denver DC3',       total:  36, assigned:  28, unassigned:  8, assignedPercent: 78 },
  { modelFamily: 'UCSC-C240-M5', type: 'Rack',            location: 'Phoenix DC4',      total:  28, assigned:  22, unassigned:  6, assignedPercent: 79 },

  // UCSC-C220-M6 — Rack
  { modelFamily: 'UCSC-C220-M6', type: 'Rack',            location: 'Nashville DC2',    total:  52, assigned:  48, unassigned:  4, assignedPercent: 92 },
  { modelFamily: 'UCSC-C220-M6', type: 'Rack',            location: 'Denver DC3',       total:  40, assigned:  32, unassigned:  8, assignedPercent: 80 },
  { modelFamily: 'UCSC-C220-M6', type: 'Rack',            location: 'Phoenix DC4',      total:  36, assigned:  30, unassigned:  6, assignedPercent: 83 },
];
