/**
 * Manages four filter states (text search, domain, cluster, status) for the server
 * inventory table. All active filters combine with AND logic — a row must satisfy
 * every non-empty filter to appear. Dropdown options are derived from the live data
 * set and exclude "Not Found" sentinel values so users only see meaningful choices.
 *
 * The `useMemo` guards are load-bearing: without them a ~4 000-row dataset re-filters
 * on every parent render, causing visible jank on low-end hardware.
 */
import { useState, useMemo } from 'react';
import type { ServerDetail } from '@/types/serverDetails.types';
import { useDebounce } from '@/hooks/useDebounce';

type FilterOption = { label: string; value: string };

interface ServerDetailsFilters {
  filteredData: ServerDetail[];
  search: string;
  setSearch: (v: string) => void;
  domain: string;
  setDomain: (v: string) => void;
  cluster: string;
  setCluster: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
  domainOptions: FilterOption[];
  clusterOptions: FilterOption[];
  statusOptions: FilterOption[];
  reset: () => void;
}

function toOptions(values: string[]): FilterOption[] {
  return [...new Set(values)]
    .filter((v) => Boolean(v) && v !== 'Not Found')
    .sort()
    .map((v) => ({ label: v, value: v }));
}

export function useServerDetailsFilters(data: ServerDetail[]): ServerDetailsFilters {
  const [search, setSearch]   = useState('');
  const [domain, setDomain]   = useState('');
  const [cluster, setCluster] = useState('');
  const [status, setStatus]   = useState('');

  const debouncedSearch = useDebounce(search, 300);

  const domainOptions  = useMemo(() => toOptions(data.map((r) => r.domain)),  [data]);
  const clusterOptions = useMemo(() => toOptions(data.map((r) => r.cluster)), [data]);
  const statusOptions  = useMemo(() => toOptions(data.map((r) => r.status)),  [data]);

  const filteredData = useMemo(() => {
    const term = debouncedSearch.toLowerCase();

    return data.filter((row) => {
      if (term) {
        const haystack = [
          row.domain, row.chassis, row.serial,
          row.host, row.model, row.serviceProfile,
        ].join(' ').toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      if (domain  && row.domain  !== domain)  return false;
      if (cluster && row.cluster !== cluster) return false;
      if (status  && row.status  !== status)  return false;
      return true;
    });
  }, [data, debouncedSearch, domain, cluster, status]);

  function reset() {
    setSearch('');
    setDomain('');
    setCluster('');
    setStatus('');
  }

  return {
    filteredData,
    search, setSearch,
    domain, setDomain,
    cluster, setCluster,
    status, setStatus,
    domainOptions,
    clusterOptions,
    statusOptions,
    reset,
  };
}
