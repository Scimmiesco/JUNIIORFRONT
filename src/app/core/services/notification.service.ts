import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new Subject<Notification | null>();
  private timeoutId?: number;

  public notification$: Observable<Notification | null> =
    this.notificationSubject.asObservable();

  show(
    message: string,
    type: 'success' | 'error' | 'info' = 'info',
    duration: number = 4000
  ): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.notificationSubject.next({ message, type });

    this.timeoutId = window.setTimeout(() => {
      this.hide();
    }, duration);
  }

  hide(): void {
    this.notificationSubject.next(null);
  }
}
