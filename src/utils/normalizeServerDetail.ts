/**
 * Bridges the API's raw field shape (space-delimited key names, raw MB integers)
 * to the camelCase, display-ready `ServerDetail` interface consumed by the UI.
 * Keeping this transformation isolated means UI components never import `ServerDetailRaw`
 * and are insulated from upstream API field-name changes.
 */
import type { ServerDetail, ServerDetailRaw } from '@/types/serverDetails.types';

/**
 * Converts raw MB to TB only when evenly divisible by 1024 — fractional TB values
 * (e.g. 1536 MB = 1.5 TB) stay in GB to avoid displaying misleading decimals.
 */
function formatMemory(rawMb: number): string {
  if (rawMb >= 1024 && rawMb % 1024 === 0) {
    return `${rawMb / 1024} TB`;
  }
  return `${rawMb} GB`;
}

/**
 * Maps a single raw API record to a display-ready `ServerDetail`.
 * @example
 * normalizeServerDetail({ 'Memory': 2048, ... }) // → { memoryDisplay: '2 TB', ... }
 * normalizeServerDetail({ 'Memory': 512,  ... }) // → { memoryDisplay: '512 GB', ... }
 */
export function normalizeServerDetail(raw: ServerDetailRaw): ServerDetail {
  return {
    domain: raw['Domain'],
    chassis: raw['Chassis'],
    slot: raw['Slot'],
    model: raw['Model'],
    totalCores: raw['Total Cores'],
    memoryDisplay: formatMemory(raw['Memory']),
    serial: raw['Serial'],
    serviceProfile: raw['Service Profile'],
    userLabel: raw['User Label'],
    host: raw['Host'],
    cluster: raw['Cluster'],
    status: raw['Status'],
    maintenanceMode: raw['Maintenance Mode?'],
    hwrForecast: raw['HWR Forecast'],
    smartNet: raw['SmartNet'],
    parkPlace: raw['ParkPlace'],
    cpu: raw['CPU'],
  };
}
