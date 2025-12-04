export interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  data: T;
  errorCode?: string;
}

export interface Sort {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}

export interface Pageable {
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  offset: number;
  sort: Sort;
  unpaged: boolean;
}

export interface PageResponse<T> {
  totalPages: number;
  totalElements: number;
  pageable: Pageable;
  size: number;
  content: T[];
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export * from './Chat';
export * from './Report';
export * from './Voice';
export * from './User';
