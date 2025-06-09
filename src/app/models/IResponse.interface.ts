export interface Response {
  succes: boolean;
  message: string;
}

export interface DataResponse<T> extends Response {
  data: T;
}

export interface PaginatedResponse<T> extends Response {
  data: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
