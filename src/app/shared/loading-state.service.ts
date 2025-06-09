import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly _loading = signal<boolean>(false);

  public readonly isLoading = this._loading.asReadonly();
  /**
   *
   */
  constructor() {
    console.log('LoadingService initialized', this._loading());
  }
  show(): void {
    this._loading.set(true);
  }

  hide(): void {
    this._loading.set(false);
  }
}
