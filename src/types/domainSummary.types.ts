export interface DomainSummary {
  domain: string;
  location: string;
  model: string;
  chassis: number;
  usedSlots: number;
  emptySlots: number;
  utilizationPercent: number;
  expiration: string;
  serial: string;
  status: 'Active' | 'Maintenance' | 'Inactive';
}

export interface DomainSummaryStats {
  totalDomains: number;
  totalSlots: number;
  usedSlots: number;
  availableSlots: number;
  usedSlotsPercent: number;
  availableSlotsPercent: number;
}
