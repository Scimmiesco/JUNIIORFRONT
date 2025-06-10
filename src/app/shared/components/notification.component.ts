import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule, NgClass } from '@angular/common';
import { Observable } from 'rxjs';
import {
  Notification,
  NotificationService,
} from '../../core/services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [AsyncPipe, CommonModule],

  template: ` @if(notification$ | async; as notification){
    <div class="container" [ngClass]="notification.type">
      <span>{{ notification.message }}</span>
    </div>
    }`,
  styles: `
  @use "styles/main.scss" as *;


@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(50%, 20px);
  }
  to {
    opacity: 1;
    transform: translateY(0, 0);
  }
}
:host{
  position: fixed;
  top: 16px;
  right: 16px;

.container{ 
  padding: 1rem 2rem;
  border-radius: $border-radius-lg;
  border: 1px solid var(--accent);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background-color: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: start;
  z-index: 9999; 
  min-width: 320px;
  max-width: 100%;
  animation: fadeIn 0.3s ease-out;

 &.success {
  border-color: $success;
}

&.error {
 border-color: $danger; 
}

&.info {
 border-color: $warning; 
}
}}
`,
})
export class NotificationComponent {
  private readonly _notificationService = inject(NotificationService);
  notification$: Observable<Notification | null>;

  constructor() {
    this.notification$ = this._notificationService.notification$;
  }
}
