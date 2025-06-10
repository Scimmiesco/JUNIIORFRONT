import { inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoadingService } from '../../shared/loading-state.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class HttpBaseInterceptor implements HttpInterceptor {
  private readonly _loadingService = inject(LoadingService);
  private readonly _notificationService = inject(NotificationService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this._loadingService.show();

    return next.handle(req).pipe(
      catchError((error) => {
        this._notificationService.show(error.error.message, 'error');
        return throwError(() => error);
      }),
      finalize(() => this._loadingService.hide())
    );
  }
}
