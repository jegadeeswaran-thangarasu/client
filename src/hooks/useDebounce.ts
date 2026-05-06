import { useState, useEffect } from 'react';

/**
 * Delays propagating `value` until it has been stable for `delay` ms.
 * The 300 ms default matches typical keyboard input cadence — fast enough to feel
 * instant, slow enough to skip intermediate keystrokes and avoid triggering
 * an expensive filter pass on every character typed.
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
