import { useState, useMemo } from 'react';
import type { ServerAssigned } from '@/types/serverSummary.types';

type FilterOption = { label: string; value: string };

interface ServerAssignedFilters {
  filteredData: ServerAssigned[];
  location: string;
  setLocation: (v: string) => void;
  locationOptions: FilterOption[];
  model: string;
  setModel: (v: string) => void;
  modelOptions: FilterOption[];
  type: string;
  setType: (v: string) => void;
  typeOptions: FilterOption[];
  assignment: string;
  setAssignment: (v: string) => void;
  reset: () => void;
}

function toOptions(values: string[]): FilterOption[] {
  return [...new Set(values)]
    .filter(Boolean)
    .sort()
    .map((v) => ({ label: v, value: v }));
}

export function useServerAssignedFilters(data: ServerAssigned[]): ServerAssignedFilters {
  const [location,   setLocation]   = useState('');
  const [model,      setModel]      = useState('');
  const [type,       setType]       = useState('');
  const [assignment, setAssignment] = useState('');

  const locationOptions = useMemo(() => toOptions(data.map((r) => r.location)),    [data]);
  const modelOptions    = useMemo(() => toOptions(data.map((r) => r.modelFamily)), [data]);
  const typeOptions     = useMemo(() => toOptions(data.map((r) => r.type)),        [data]);

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      if (location   && row.location    !== location) return false;
      if (model      && row.modelFamily !== model)    return false;
      if (type       && row.type        !== type)     return false;
      if (assignment === 'assigned'   && row.unassigned !== 0) return false;
      if (assignment === 'unassigned' && row.unassigned === 0) return false;
      return true;
    });
  }, [data, location, model, type, assignment]);

  function reset() {
    setLocation('');
    setModel('');
    setType('');
    setAssignment('');
  }

  return {
    filteredData,
    location, setLocation, locationOptions,
    model,    setModel,    modelOptions,
    type,     setType,     typeOptions,
    assignment, setAssignment,
    reset,
  };
}
