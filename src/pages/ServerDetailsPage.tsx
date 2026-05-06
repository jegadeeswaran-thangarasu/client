import PageContainer from '@/components/ui/PageContainer';
import PageHeader from '@/components/ui/PageHeader';
import FilterBar from '@/components/ui/FilterBar';
import SearchInput from '@/components/ui/SearchInput';
import FilterDropdown from '@/components/ui/FilterDropdown';
import ResetButton from '@/components/ui/ResetButton';
import ExportButton from '@/components/ui/ExportButton';
import DataTable from '@/components/ui/DataTable';
import Spinner from '@/components/ui/Spinner';
import ErrorAlert from '@/components/ui/ErrorAlert';
import { useServerDetails } from '@/hooks/useServerDetails';
import { useServerDetailsFilters } from '@/hooks/useServerDetailsFilters';
import { serverDetailsColumns } from '@/components/serverDetails/serverDetailsColumns';
import { useExportCsv } from '@/hooks/useExportCsv';

export default function ServerDetailsPage() {
  const { data, isLoading, isError } = useServerDetails();
  const {
    filteredData,
    search, setSearch,
    domain, setDomain,
    cluster, setCluster,
    status, setStatus,
    domainOptions,
    clusterOptions,
    statusOptions,
    reset,
  } = useServerDetailsFilters(data ?? []);
  const { exportCsv } = useExportCsv();

  return (
    <PageContainer>
      <PageHeader
        breadcrumb="Infrastructure"
        title="Server Details"
        subtitle="Full inventory view — all server attributes"
      />

      <FilterBar
        leftChildren={
          <div className="flex flex-wrap items-center gap-2">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search server, host, serial..."
            />
            <FilterDropdown
              placeholder="All Domains"
              value={domain}
              options={domainOptions}
              onChange={setDomain}
            />
            <FilterDropdown
              placeholder="All Clusters"
              value={cluster}
              options={clusterOptions}
              onChange={setCluster}
            />
            <FilterDropdown
              placeholder="All Status"
              value={status}
              options={statusOptions}
              onChange={setStatus}
            />
            <ResetButton onClick={reset} />
          </div>
        }
        rightChildren={
          <ExportButton
            onClick={() => exportCsv(filteredData, 'server-details')}
            disabled={filteredData.length === 0}
          />
        }
      />

      {isLoading && (
        <div className="flex justify-center py-24">
          <Spinner size="lg" label="Loading server details…" />
        </div>
      )}

      {isError && <ErrorAlert message="Failed to load server details." />}

      {data && (
        <DataTable
          data={filteredData}
          columns={serverDetailsColumns}
        />
      )}
    </PageContainer>
  );
}
