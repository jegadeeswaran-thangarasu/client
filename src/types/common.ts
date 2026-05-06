export interface ApiError {
  message: string;
  status?: number;
}

export type SortDirection = 'asc' | 'desc' | false;
