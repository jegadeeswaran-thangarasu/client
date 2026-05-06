import PageContainer from '@/components/ui/PageContainer';
import PageHeader from '@/components/ui/PageHeader';
import StatCard from '@/components/ui/StatCard';
import StatCardGrid from '@/components/ui/StatCardGrid';
import SectionPanel from '@/components/ui/SectionPanel';
import FilterBar from '@/components/ui/FilterBar';
import FilterDropdown from '@/components/ui/FilterDropdown';
import ResetButton from '@/components/ui/ResetButton';
import DataTable from '@/components/ui/DataTable';
import Spinner from '@/components/ui/Spinner';
import ErrorAlert from '@/components/ui/ErrorAlert';
import { byLocationColumns } from '@/components/serverSummary/byLocationColumns';
import { byDomainColumns }   from '@/components/serverSummary/byDomainColumns';
import { byTypeColumns }     from '@/components/serverSummary/byTypeColumns';
import { assignedColumns }   from '@/components/serverSummary/assignedColumns';
import {
  useServerSummaryStats,
  useServerByLocation,
  useServerByDomain,
  useServerByType,
  useServerAssigned,
} from '@/hooks/useServerSummary';
import { useServerTypeFilter }     from '@/hooks/useServerTypeFilter';
import { useServerAssignedFilters } from '@/hooks/useServerAssignedFilters';

const ASSIGNMENT_OPTIONS = [
  { label: 'Fully Assigned', value: 'assigned'   },
  { label: 'Has Unassigned', value: 'unassigned' },
];

export default function ServerSummaryPage() {
  const { data: statsData,    isLoading: statsLoading,    isError: statsError    } = useServerSummaryStats();
  const { data: locationData, isLoading: locationLoading, isError: locationError } = useServerByLocation();
  const { data: domainData,   isLoading: domainLoading,   isError: domainError   } = useServerByDomain();
  const { data: typeData,     isLoading: typeLoading,     isError: typeError     } = useServerByType();
  const { data: assignedData, isLoading: assignedLoading, isError: assignedError } = useServerAssigned();

  const {
    filteredData: filteredTypeData,
    location:     typeLocation,
    setLocation:  setTypeLocation,
    locationOptions: typeLocationOptions,
  } = useServerTypeFilter(typeData ?? []);

  const {
    filteredData: filteredAssigned,
    location, setLocation, locationOptions,
    model,    setModel,    modelOptions,
    type,     setType,     typeOptions,
    assignment, setAssignment,
    reset,
  } = useServerAssignedFilters(assignedData ?? []);

  const isLoading = statsLoading || locationLoading || domainLoading || typeLoading || assignedLoading;
  const isError   = statsError   || locationError   || domainError   || typeError   || assignedError;

  if (isLoading) {
    return (
      <PageContainer>
        <PageHeader
          breadcrumb="Infrastructure"
          title="Server Summary"
          subtitle="UCS server inventory — by location, domain, and model type"
        />
        <div className="flex justify-center py-24">
          <Spinner size="lg" label="Loading server summary…" />
        </div>
      </PageContainer>
    );
  }

  if (isError) {
    return (
      <PageContainer>
        <PageHeader
          breadcrumb="Infrastructure"
          title="Server Summary"
          subtitle="UCS server inventory — by location, domain, and model type"
        />
        <ErrorAlert message="Failed to load server summary." />
      </PageContainer>
    );
  }

  const stats = statsData!;

  return (
    <PageContainer>
      <PageHeader
        breadcrumb="Infrastructure"
        title="Server Summary"
        subtitle="UCS server inventory — by location, domain, and model type"
      />

      <StatCardGrid>
        <StatCard
          label="Total Servers"
          value={stats.totalServers}
        />
        <StatCard
          label="Blade Servers"
          value={stats.bladeServers}
          badge={{ label: `${stats.bladePercent}%`, variant: 'blue' }}
        />
        <StatCard
          label="Rack Servers"
          value={stats.rackServers}
          badge={{ label: `${stats.rackPercent}%`, variant: 'blue' }}
        />
        <StatCard
          label="In Maintenance"
          value={stats.inMaintenance}
          badge={{ label: `${stats.maintenancePercent}%`, variant: 'yellow' }}
        />
        <StatCard
          label="Unassigned Servers"
          value={stats.unassignedServers}
          badge={{ label: `${stats.unassignedPercent}%`, variant: 'red' }}
          alertBorder={true}
        />
      </StatCardGrid>

      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SectionPanel title="By Location">
          <DataTable data={locationData ?? []} columns={byLocationColumns} />
        </SectionPanel>
        <SectionPanel title="By Domain">
          <DataTable data={domainData ?? []} columns={byDomainColumns} />
        </SectionPanel>
      </div>

      <SectionPanel
        title="Server Type Breakdown"
        className="mb-4"
        rightSlot={
          <FilterDropdown
            value={typeLocation}
            options={typeLocationOptions}
            onChange={setTypeLocation}
            placeholder="All Locations"
          />
        }
      >
        <DataTable data={filteredTypeData} columns={byTypeColumns} />
      </SectionPanel>

      <SectionPanel title="Assigned vs Unassigned — by Model Family & Location">
        <FilterBar
          leftChildren={
            <div className="flex flex-wrap items-center gap-2">
              <FilterDropdown
                value={location}
                options={locationOptions}
                onChange={setLocation}
                placeholder="All Locations"
              />
              <FilterDropdown
                value={model}
                options={modelOptions}
                onChange={setModel}
                placeholder="All Models"
              />
              <FilterDropdown
                value={type}
                options={typeOptions}
                onChange={setType}
                placeholder="All Types"
              />
              <FilterDropdown
                value={assignment}
                options={ASSIGNMENT_OPTIONS}
                onChange={setAssignment}
                placeholder="Assigned & Unassigned"
              />
              <ResetButton onClick={reset} />
            </div>
          }
          rightChildren={null}
        />
        <DataTable data={filteredAssigned} columns={assignedColumns} />
      </SectionPanel>
    </PageContainer>
  );
}
