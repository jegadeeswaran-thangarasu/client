import { useCallback } from 'react';

/**
 * RFC 4180 quoting: wraps the stringified value in double-quotes and escapes
 * internal double-quotes by doubling them when the value contains `,`, `"`, or `\n`.
 */
function escapeValue(value: unknown): string {
  const str = value === null || value === undefined ? '' : String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Returns `exportCsv(data, filename)`, which serializes an object array to a
 * RFC 4180 CSV and triggers a browser download via Blob URL + anchor click.
 * Column headers are derived from the keys of the first object.
 * The Blob URL is revoked immediately after the click; browsers buffer the file
 * in memory before the revocation takes effect, so the download is not interrupted.
 * `.csv` is appended to `filename` automatically if not already present.
 */
export function useExportCsv<T extends object>() {
  const exportCsv = useCallback((data: T[], filename: string) => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]) as (keyof T)[];
    const headerRow = headers.map((h) => escapeValue(h)).join(',');
    const dataRows = data.map((row) =>
      headers.map((h) => escapeValue(row[h])).join(',')
    );

    const csv = [headerRow, ...dataRows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename.endsWith('.csv') ? filename : `${filename}.csv`;
    anchor.click();

    URL.revokeObjectURL(url);
  }, []);

  return { exportCsv };
}
