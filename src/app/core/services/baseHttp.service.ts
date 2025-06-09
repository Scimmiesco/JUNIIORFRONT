import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  DataResponse,
  PaginatedResponse,
} from '../../models/IResponse.interface';
import { RequestPaginated } from '../../models/IRequest.interface';
import { inject } from '@angular/core';

export abstract class BaseHttpService<T> {
  protected http = inject(HttpClient);
  private readonly apiBaseUrl = 'http://localhost:5000/api';

  protected endpointUrl: string;

  constructor(endpoint: string) {
    this.endpointUrl = `${this.apiBaseUrl}/${endpoint}`;
  }

  getAll(): Observable<T[]> {
    return this.http
      .get<T[]>(this.endpointUrl)
      .pipe(catchError(this.handleError));
  }

  getAllpaginated(
    pageParameters: RequestPaginated
  ): Observable<PaginatedResponse<T>> {
    let params = new HttpParams()
      .set('pageNumber', pageParameters.pageNumber)
      .set('pageSize', pageParameters.pageSize);

    return this.http
      .get<PaginatedResponse<T>>(`${this.endpointUrl}/paginated`, {
        params,
      })
      .pipe(catchError(this.handleError));
  }

  getById(id: number | string): Observable<DataResponse<T>> {
    const url = `${this.endpointUrl}/${id}`;
    return this.http
      .get<DataResponse<T>>(url)
      .pipe(catchError(this.handleError));
  }

  create(item: T): Observable<DataResponse<T>> {
    return this.http
      .post<DataResponse<T>>(this.endpointUrl, item)
      .pipe(catchError(this.handleError));
  }

  delete(id: number | string): Observable<void> {
    const url = `${this.endpointUrl}/${id}`;
    return this.http.delete<void>(url).pipe(catchError(this.handleError));
  }

  protected handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro desconhecido!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro do lado do cliente: ${error.error.message}`;
    } else {
      errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
