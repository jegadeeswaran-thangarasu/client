export interface ServerDetailRaw {
  'Domain': string;
  'Chassis': string;
  'Slot': string;
  'Model': string;
  'Total Cores': number;
  'Memory': number;
  'Serial': string;
  'Service Profile': string;
  'User Label': string;
  'Host': string;
  'Cluster': string;
  'Status': string;
  'Maintenance Mode?': string;
  'HWR Forecast': string;
  'SmartNet': string;
  'ParkPlace': string;
  'CPU': string;
}

export interface ServerDetail {
  domain: string;
  chassis: string;
  slot: string;
  model: string;
  totalCores: number;
  memoryDisplay: string;
  serial: string;
  serviceProfile: string;
  userLabel: string;
  host: string;
  cluster: string;
  status: string;
  maintenanceMode: string;
  hwrForecast: string;
  smartNet: string;
  parkPlace: string;
  cpu: string;
}
