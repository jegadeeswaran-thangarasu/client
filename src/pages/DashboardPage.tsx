import PageContainer from '@/components/ui/PageContainer';
import PageHeader from '@/components/ui/PageHeader';
import StatCard from '@/components/ui/StatCard';
import StatCardGrid from '@/components/ui/StatCardGrid';
import SectionPanel from '@/components/ui/SectionPanel';
import SearchInput from '@/components/ui/SearchInput';
import FilterDropdown from '@/components/ui/FilterDropdown';
import DataTable from '@/components/ui/DataTable';
import Spinner from '@/components/ui/Spinner';
import ErrorAlert from '@/components/ui/ErrorAlert';
import LastRefreshed from '@/components/ui/LastRefreshed';
import { clusterColumns } from '@/components/dashboard/clusterColumns';
import { recentActivityColumns } from '@/components/dashboard/recentActivityColumns';
import { serversByLocationColumns } from '@/components/dashboard/serversByLocationColumns';
import {
  useDashboardStats,
  useClusterUtilization,
  useRecentActivity,
  useDashboardServersByLocation,
} from '@/hooks/useDashboard';
import { useClusterFilters } from '@/hooks/useClusterFilters';

const SORT_OPTIONS = [
  { label: 'Sort: CPU',     value: 'cpuUtil'     },
  { label: 'Sort: Memory',  value: 'memoryUtil'  },
  { label: 'Sort: Storage', value: 'storageUtil' },
];

export default function DashboardPage() {
  const { data: statsData,    isLoading: statsLoading,     isError: statsError     } = useDashboardStats();
  const { data: clusterData,  isLoading: clustersLoading,  isError: clustersError  } = useClusterUtilization();
  const { data: activityData, isLoading: activityLoading,  isError: activityError  } = useRecentActivity();
  const { data: locationsData,isLoading: locationsLoading, isError: locationsError } = useDashboardServersByLocation();

  const {
    filteredData: filteredClusters,
    search,     setSearch,
    location,   setLocation, locationOptions,
    sortField,  setSortField,
  } = useClusterFilters(clusterData ?? []);

  const isLoading = statsLoading || clustersLoading || activityLoading || locationsLoading;

  const header = (
    <div className="flex items-start justify-between">
      <PageHeader
        breadcrumb="Home"
        title="Dashboard"
        subtitle="Overview of infrastructure capacity across all UCS domains"
      />
      <LastRefreshed />
    </div>
  );

  if (isLoading) {
    return (
      <PageContainer>
        {header}
        <div className="flex justify-center py-24">
          <Spinner size="lg" label="Loading dashboard…" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {header}

      {statsError || !statsData ? (
        <ErrorAlert message="Failed to load dashboard stats." />
      ) : (
        <StatCardGrid cols={6}>
          <StatCard
            label="Total Servers"
            value={statsData.totalServers.toLocaleString()}
            subtitle={statsData.totalServersSubtitle}
            badge={{ label: statsData.totalServersBadge, variant: 'green' }}
          />
          <StatCard
            label="UCS Domains"
            value={statsData.ucsDomains}
            subtitle={statsData.ucsDomainsSubtitle}
            badge={{ label: statsData.ucsDomainsBadge, variant: 'green' }}
          />
          <StatCard
            label="Chassis Slots Used"
            value={`${statsData.chassisSlotsUsedPercent}%`}
            subtitle={statsData.chassisSlotsSubtitle}
            badge={{ label: statsData.chassisSlotsBadge, variant: 'yellow' }}
          />
          <StatCard
            label="Pending Upgrades"
            value={statsData.pendingUpgrades}
            subtitle={statsData.pendingUpgradesSubtitle}
            badge={{ label: statsData.pendingUpgradesBadge, variant: 'red' }}
            alertBorder={true}
          />
          <StatCard
            label="Avg CPU Utilization"
            value={`${statsData.avgCpuUtilization}%`}
            subtitle={statsData.avgCpuSubtitle}
            badge={{ label: statsData.avgCpuBadge, variant: 'yellow' }}
          />
          <StatCard
            label="SmartNet Expiring"
            value={statsData.smartNetExpiring}
            subtitle={statsData.smartNetSubtitle}
            badge={{ label: statsData.smartNetBadge, variant: 'red' }}
            alertBorder={true}
          />
        </StatCardGrid>
      )}

      <SectionPanel
        title="Cluster Resource Utilization"
        className="mb-4"
        rightSlot={
          <div className="flex items-center gap-2">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search cluster..."
            />
            <FilterDropdown
              value={location}
              options={locationOptions}
              onChange={setLocation}
              placeholder="All Locations"
            />
            <FilterDropdown
              value={sortField}
              options={SORT_OPTIONS}
              onChange={(v) => setSortField(v as 'cpuUtil' | 'memoryUtil' | 'storageUtil')}
              placeholder="Sort: CPU"
            />
          </div>
        }
      >
        {clustersError ? (
          <ErrorAlert message="Failed to load cluster utilization." />
        ) : (
          <DataTable data={filteredClusters} columns={clusterColumns} />
        )}
      </SectionPanel>

      <SectionPanel title="Servers by Location" className="mb-4">
        {locationsError ? (
          <ErrorAlert message="Failed to load servers by location." />
        ) : (
          <DataTable data={locationsData ?? []} columns={serversByLocationColumns} />
        )}
      </SectionPanel>

      <SectionPanel
        title="Recent Activity"
        rightSlot={
          <button
            type="button"
            onClick={() => console.log('View all activity')}
            className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-600 hover:bg-gray-50"
          >
            View All
          </button>
        }
      >
        {activityError ? (
          <ErrorAlert message="Failed to load recent activity." />
        ) : (
          <DataTable data={activityData ?? []} columns={recentActivityColumns} />
        )}
      </SectionPanel>
    </PageContainer>
  );
}
