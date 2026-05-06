import type { RecentActivity } from '@/types/dashboard.types';

// 20 rows: 12 Approved, 5 Pending, 3 Rejected
// First 4 rows match wireframe exactly
export const RECENT_ACTIVITY_MOCK: RecentActivity[] = [
  { id: 'act-001', timestamp: '2026-04-17 09:14', type: 'CPU Upgrade',     vmServer: 'vm-prod-db-042',  change: '8 → 16 vCPU',      requester: 'A. Patel',      status: 'Approved' },
  { id: 'act-002', timestamp: '2026-04-17 08:52', type: 'Memory Upgrade',  vmServer: 'vm-prod-web-017', change: '32 → 64 GB',        requester: 'S. Kim',        status: 'Approved' },
  { id: 'act-003', timestamp: '2026-04-16 15:33', type: 'Storage Upgrade', vmServer: 'vm-dev-app-008',  change: '500 → 1000 GB',     requester: 'M. Rodriguez',  status: 'Pending'  },
  { id: 'act-004', timestamp: '2026-04-16 14:47', type: 'CPU Upgrade',     vmServer: 'vm-prod-api-031', change: '4 → 8 vCPU',        requester: 'T. Johnson',    status: 'Rejected' },
  { id: 'act-005', timestamp: '2026-04-16 13:21', type: 'Memory Upgrade',  vmServer: 'vm-prod-db-055',  change: '64 → 128 GB',       requester: 'J. Chen',       status: 'Approved' },
  { id: 'act-006', timestamp: '2026-04-16 11:45', type: 'CPU Upgrade',     vmServer: 'vm-mgmt-svc-003', change: '2 → 4 vCPU',        requester: 'L. Williams',   status: 'Approved' },
  { id: 'act-007', timestamp: '2026-04-16 10:18', type: 'Storage Upgrade', vmServer: 'vm-prod-db-012',  change: '1000 → 2000 GB',    requester: 'A. Patel',      status: 'Pending'  },
  { id: 'act-008', timestamp: '2026-04-15 16:52', type: 'Memory Upgrade',  vmServer: 'vm-dev-web-024',  change: '16 → 32 GB',        requester: 'R. Thompson',   status: 'Approved' },
  { id: 'act-009', timestamp: '2026-04-15 15:30', type: 'CPU Upgrade',     vmServer: 'vm-prod-api-019', change: '16 → 24 vCPU',      requester: 'S. Kim',        status: 'Approved' },
  { id: 'act-010', timestamp: '2026-04-15 14:07', type: 'Memory Upgrade',  vmServer: 'vm-prod-web-033', change: '32 → 48 GB',        requester: 'M. Rodriguez',  status: 'Rejected' },
  { id: 'act-011', timestamp: '2026-04-15 11:55', type: 'Storage Upgrade', vmServer: 'vm-dev-app-041',  change: '250 → 500 GB',      requester: 'T. Johnson',    status: 'Approved' },
  { id: 'act-012', timestamp: '2026-04-15 09:43', type: 'CPU Upgrade',     vmServer: 'vm-prod-db-067',  change: '4 → 8 vCPU',        requester: 'J. Chen',       status: 'Approved' },
  { id: 'act-013', timestamp: '2026-04-14 17:22', type: 'Memory Upgrade',  vmServer: 'vm-prod-api-028', change: '8 → 16 GB',         requester: 'L. Williams',   status: 'Pending'  },
  { id: 'act-014', timestamp: '2026-04-14 15:18', type: 'CPU Upgrade',     vmServer: 'vm-mgmt-svc-007', change: '8 → 16 vCPU',       requester: 'R. Thompson',   status: 'Approved' },
  { id: 'act-015', timestamp: '2026-04-14 13:44', type: 'Storage Upgrade', vmServer: 'vm-prod-db-021',  change: '2000 → 4000 GB',    requester: 'A. Patel',      status: 'Approved' },
  { id: 'act-016', timestamp: '2026-04-14 11:29', type: 'Memory Upgrade',  vmServer: 'vm-dev-web-039',  change: '64 → 96 GB',        requester: 'S. Kim',        status: 'Pending'  },
  { id: 'act-017', timestamp: '2026-04-14 09:15', type: 'CPU Upgrade',     vmServer: 'vm-prod-web-044', change: '4 → 8 vCPU',        requester: 'M. Rodriguez',  status: 'Approved' },
  { id: 'act-018', timestamp: '2026-04-13 16:47', type: 'Memory Upgrade',  vmServer: 'vm-prod-api-015', change: '16 → 32 GB',        requester: 'T. Johnson',    status: 'Approved' },
  { id: 'act-019', timestamp: '2026-04-13 14:33', type: 'Storage Upgrade', vmServer: 'vm-dev-app-052',  change: '500 → 750 GB',      requester: 'J. Chen',       status: 'Rejected' },
  { id: 'act-020', timestamp: '2026-04-13 11:08', type: 'CPU Upgrade',     vmServer: 'vm-prod-db-038',  change: '8 → 12 vCPU',       requester: 'L. Williams',   status: 'Pending'  },
];
