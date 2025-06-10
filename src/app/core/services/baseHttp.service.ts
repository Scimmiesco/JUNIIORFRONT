import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {
  DataResponse,
  PaginatedResponse,
} from '../../models/IResponse.interface';
import { RequestPaginated } from '../../models/IRequest.interface';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';

export abstract class BaseHttpService<T> {
  protected http = inject(HttpClient);
  private readonly apiBaseUrl = environment.apiUrl;

  protected endpointUrl: string;

  constructor(endpoint: string) {
    this.endpointUrl = `${this.apiBaseUrl}/${endpoint}`;
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.endpointUrl);
  }

  getAllpaginated(
    pageParameters: RequestPaginated
  ): Observable<PaginatedResponse<T>> {
    let params = new HttpParams()
      .set('pageNumber', pageParameters.pageNumber)
      .set('pageSize', pageParameters.pageSize);

    return this.http.get<PaginatedResponse<T>>(
      `${this.endpointUrl}/paginated`,
      {
        params,
      }
    );
  }

  getById(id: number | string): Observable<DataResponse<T>> {
    const url = `${this.endpointUrl}/${id}`;
    return this.http.get<DataResponse<T>>(url);
  }

  create(item: T): Observable<DataResponse<T>> {
    return this.http.post<DataResponse<T>>(this.endpointUrl, item);
  }

  delete(id: number | string): Observable<void> {
    const url = `${this.endpointUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
