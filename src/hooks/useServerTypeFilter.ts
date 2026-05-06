import { useState, useMemo } from 'react';
import type { ServerByType } from '@/types/serverSummary.types';

type FilterOption = { label: string; value: string };

interface ServerTypeFilter {
  filteredData: ServerByType[];
  location: string;
  setLocation: (v: string) => void;
  locationOptions: FilterOption[];
}

function toOptions(values: string[]): FilterOption[] {
  return [...new Set(values)]
    .filter(Boolean)
    .sort()
    .map((v) => ({ label: v, value: v }));
}

export function useServerTypeFilter(data: ServerByType[]): ServerTypeFilter {
  const [location, setLocation] = useState('');

  const locationOptions = useMemo(() => toOptions(data.map((r) => r.location)), [data]);

  const filteredData = useMemo(
    () => (location ? data.filter((r) => r.location === location) : data),
    [data, location],
  );

  return { filteredData, location, setLocation, locationOptions };
}
