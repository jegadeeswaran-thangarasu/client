import { LayoutGrid } from 'lucide-react';
import PageContainer from '@/components/ui/PageContainer';
import PageHeader from '@/components/ui/PageHeader';
import FilterBar from '@/components/ui/FilterBar';
import SearchInput from '@/components/ui/SearchInput';
import FilterDropdown from '@/components/ui/FilterDropdown';
import ResetButton from '@/components/ui/ResetButton';
import DataTable from '@/components/ui/DataTable';
import Spinner from '@/components/ui/Spinner';
import ErrorAlert from '@/components/ui/ErrorAlert';
import StatCard from '@/components/ui/StatCard';
import StatCardGrid from '@/components/ui/StatCardGrid';
import { domainSummaryColumns } from '@/components/domainSummary/domainSummaryColumns';
import { useDomainSummary, useDomainSummaryStats } from '@/hooks/useDomainSummary';
import { useDomainSummaryFilters } from '@/hooks/useDomainSummaryFilters';

const EXPIRATION_OPTIONS = [
  { label: 'Expires 2025', value: '2025'    },
  { label: 'Expires 2026', value: '2026'    },
  { label: 'Expires 2027+', value: 'beyond' },
  { label: 'Already expired', value: 'expired' },
];

export default function DomainSummaryPage() {
  const { data, isLoading, isError } = useDomainSummary();
  const { data: statsData } = useDomainSummaryStats();

  const {
    filteredData,
    search, setSearch,
    location, setLocation, locationOptions,
    model, setModel, modelOptions,
    expiration, setExpiration,
    reset,
  } = useDomainSummaryFilters(data ?? []);

  return (
    <PageContainer>
      <PageHeader
        breadcrumb="Infrastructure"
        title="Domain Summary"
        subtitle="UCS domain chassis — used and available blade slots"
      />

      {statsData && (
        <StatCardGrid>
          <StatCard
            label="Total Domains"
            value={statsData.totalDomains}
            badge={{ label: 'UCS Managed', variant: 'blue' }}
          />
          <StatCard
            label="Total Slots"
            value={statsData.totalSlots.toLocaleString()}
            subtitle="Across all chassis"
          />
          <StatCard
            label="Used Slots"
            value={statsData.usedSlots.toLocaleString()}
            badge={{ label: `${statsData.usedSlotsPercent}%`, variant: 'yellow' }}
          />
          <StatCard
            label="Available Slots"
            value={statsData.availableSlots.toLocaleString()}
            badge={{ label: `${statsData.availableSlotsPercent}%`, variant: 'green' }}
          />
        </StatCardGrid>
      )}

      <FilterBar
        leftChildren={
          <div className="flex flex-wrap items-center gap-2">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search domain, serial, location..."
            />
            <FilterDropdown
              placeholder="All Locations"
              value={location}
              options={locationOptions}
              onChange={setLocation}
            />
            <FilterDropdown
              placeholder="All Models"
              value={model}
              options={modelOptions}
              onChange={setModel}
            />
            <FilterDropdown
              placeholder="All Expirations"
              value={expiration}
              options={EXPIRATION_OPTIONS}
              onChange={setExpiration}
            />
            <ResetButton onClick={reset} />
          </div>
        }
        rightChildren={
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-md bg-gray-900 px-4 py-1.5 text-sm text-white hover:bg-gray-800"
            onClick={() => console.log('View Slots clicked')}
          >
            <LayoutGrid className="h-4 w-4" />
            View Slots
          </button>
        }
      />

      {isLoading && (
        <div className="flex justify-center py-24">
          <Spinner size="lg" label="Loading domain summary…" />
        </div>
      )}

      {isError && <ErrorAlert message="Failed to load domain summary." />}

      {data && (
        <>
          <div className="mb-2 text-right">
            <span className="text-xs text-gray-400">{filteredData.length} domains</span>
          </div>
          <DataTable
            data={filteredData}
            columns={domainSummaryColumns}
          />
        </>
      )}
    </PageContainer>
  );
}
