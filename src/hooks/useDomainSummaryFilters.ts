import { useState, useMemo } from 'react';
import type { DomainSummary } from '@/types/domainSummary.types';
import { useDebounce } from '@/hooks/useDebounce';

type FilterOption = { label: string; value: string };

interface DomainSummaryFilters {
  filteredData: DomainSummary[];
  search: string;
  setSearch: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  locationOptions: FilterOption[];
  model: string;
  setModel: (v: string) => void;
  modelOptions: FilterOption[];
  expiration: string;
  setExpiration: (v: string) => void;
  reset: () => void;
}

function toOptions(values: string[]): FilterOption[] {
  return [...new Set(values)]
    .filter(Boolean)
    .sort()
    .map((v) => ({ label: v, value: v }));
}

function matchesExpiration(expiration: string, filter: string): boolean {
  if (!filter) return true;
  const year = expiration.slice(0, 4);
  if (filter === 'expired') {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(expiration) < today;
  }
  if (filter === 'beyond') return parseInt(year, 10) >= 2027;
  return year === filter;
}

export function useDomainSummaryFilters(data: DomainSummary[]): DomainSummaryFilters {
  const [search, setSearch]       = useState('');
  const [location, setLocation]   = useState('');
  const [model, setModel]         = useState('');
  const [expiration, setExpiration] = useState('');

  const debouncedSearch = useDebounce(search, 300);

  const locationOptions = useMemo(() => toOptions(data.map((r) => r.location)), [data]);
  const modelOptions    = useMemo(() => toOptions(data.map((r) => r.model)),    [data]);

  const filteredData = useMemo(() => {
    const term = debouncedSearch.toLowerCase();

    return data.filter((row) => {
      if (term) {
        const haystack = [row.domain, row.serial, row.location].join(' ').toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      if (location   && row.location !== location) return false;
      if (model      && row.model    !== model)     return false;
      if (!matchesExpiration(row.expiration, expiration)) return false;
      return true;
    });
  }, [data, debouncedSearch, location, model, expiration]);

  function reset() {
    setSearch('');
    setLocation('');
    setModel('');
    setExpiration('');
  }

  return {
    filteredData,
    search, setSearch,
    location, setLocation, locationOptions,
    model, setModel, modelOptions,
    expiration, setExpiration,
    reset,
  };
}
