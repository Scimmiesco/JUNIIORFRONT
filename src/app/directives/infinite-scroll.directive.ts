import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  inject,
  OnDestroy,
  afterNextRender,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';

@Directive({
  selector: '[appInfiniteScroll]',
  standalone: true,
  outputs: ['nearBottom'],
})
export class InfiniteScrollDirective implements OnDestroy {
  @Output() nearBottom = new EventEmitter<void>();

  private elementRef = inject(ElementRef);
  private scrollSubscription?: Subscription;

  constructor() {
    afterNextRender(() => {
      const hostElement = this.elementRef.nativeElement;

      this.scrollSubscription = fromEvent(window, 'scroll')
        .pipe(
          debounceTime(300),
          map(() => this.isNearBottom(hostElement)),
          filter((isNear) => isNear)
        )
        .subscribe(() => {
          this.nearBottom.emit();
        });
    });
  }

  private isNearBottom(element: HTMLElement): boolean {
    const scrollPosition = window.scrollY + window.innerHeight;
    const elementBottom = element.offsetTop + element.offsetHeight;
    const threshold = 450;

    return scrollPosition >= elementBottom - threshold;
  }

  ngOnDestroy(): void {
    this.scrollSubscription?.unsubscribe();
  }
}
