import { useState, useMemo } from 'react';
import type { ClusterUtilization } from '@/types/dashboard.types';
import { useDebounce } from '@/hooks/useDebounce';

type SortField = 'cpuUtil' | 'memoryUtil' | 'storageUtil';
type FilterOption = { label: string; value: string };

interface ClusterFilters {
  filteredData: ClusterUtilization[];
  search: string;
  setSearch: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  locationOptions: FilterOption[];
  sortField: SortField;
  setSortField: (v: SortField) => void;
}

function toOptions(values: string[]): FilterOption[] {
  return [...new Set(values)]
    .filter(Boolean)
    .sort()
    .map((v) => ({ label: v, value: v }));
}

export function useClusterFilters(data: ClusterUtilization[]): ClusterFilters {
  const [search,    setSearch]    = useState('');
  const [location,  setLocation]  = useState('');
  const [sortField, setSortField] = useState<SortField>('cpuUtil');

  const debouncedSearch = useDebounce(search);

  const locationOptions = useMemo(() => toOptions(data.map((r) => r.location)), [data]);

  const filteredData = useMemo(() => {
    const term = debouncedSearch.toLowerCase();

    const filtered = data.filter((row) => {
      if (location && row.location !== location) return false;
      if (term && !row.cluster.toLowerCase().includes(term) && !row.domain.toLowerCase().includes(term)) return false;
      return true;
    });

    return [...filtered].sort((a, b) => b[sortField] - a[sortField]);
  }, [data, debouncedSearch, location, sortField]);

  return {
    filteredData,
    search,    setSearch,
    location,  setLocation, locationOptions,
    sortField, setSortField,
  };
}
