import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCurrencyMask]',
  standalone: true,
})
export class CurrencyMaskDirective implements OnInit {
  private readonly el = inject(ElementRef<HTMLInputElement>);
  private readonly ngControl = inject(NgControl);

  ngOnInit() {
    const initialValue = this.ngControl.control?.value;
    if (initialValue) {
      this.formatValue(initialValue.toString());
    }
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    this.formatValue(value);
  }

  private formatValue(value: string) {
    if (!value) {
      this.ngControl.control?.setValue(null, { emitEvent: false });
      this.el.nativeElement.value = '';
      return;
    }

    let numericValue = value.replace(/\D/g, '');

    if (!numericValue) {
      this.ngControl.control?.setValue(null, { emitEvent: false });
      this.el.nativeElement.value = '';
      return;
    }

    const valueInCents = parseFloat(numericValue) / 100;
    this.ngControl.control?.setValue(valueInCents, { emitEvent: false });

    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valueInCents);
    console.log(this.el.nativeElement );
    this.el.nativeElement.value = formattedValue;
  }
}
