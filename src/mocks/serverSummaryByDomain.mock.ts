import type { ServerByDomain } from '@/types/serverSummary.types';

export const SERVER_BY_DOMAIN_MOCK: ServerByDomain[] = [
  { domain: 'ucs-dom-phl-core', location: 'Philadelphia DC1', servers: 186, clusters:  9, status: 'Healthy'     },
  { domain: 'ucs-dom-phl-edge', location: 'Philadelphia DC1', servers:  98, clusters:  5, status: 'Warning'     },
  { domain: 'ucs-dom-nas-core', location: 'Nashville DC2',    servers: 214, clusters: 11, status: 'Healthy'     },
  { domain: 'ucs-dom-den-core', location: 'Denver DC3',       servers: 142, clusters:  7, status: 'Healthy'     },
  { domain: 'ucs-dom-phx-core', location: 'Phoenix DC4',      servers: 127, clusters:  6, status: 'Maintenance' },
  { domain: 'ucs-dom-den-edge', location: 'Denver DC3',       servers:  88, clusters:  4, status: 'Warning'     },
];
