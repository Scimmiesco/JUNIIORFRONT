import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/IProduct.interface';
import { ProductService } from '../../../components/products/product.service';
import { CurrencyMaskDirective } from '../../../directives/currency-mask.directive';
import { ProductCartComponent } from '../../../shared/components/back-header.component';
import { urlValidator } from '../../../validators/url.validator';
import { ProductStateService } from '../../../components/products/product-state.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CurrencyMaskDirective,
    ProductCartComponent,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly productService = inject(ProductService);
  private readonly _productStateService = inject(ProductStateService);
  private readonly _router = inject(Router);
  private readonly _notificationService = inject(NotificationService);

  @Input() product?: Product;
  @Output() formSubmitted = new EventEmitter<Product>();

  productForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [null, [Validators.required, Validators.min(0.01)]],
      imageUrl: ['', [urlValidator()]],
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const formValue = this.productForm.value;

    this.productService.create(formValue).subscribe((result) => {
      if (result.success) {
        this.formSubmitted.emit(result.data);
        this._productStateService.products.update((currentProducts) => [
          ...currentProducts,
          result.data,
        ]);
        this._productStateService.updateCache();
        this.productForm.reset();
        this._router.navigate(['../']);
        this._notificationService.show(
          'Produto criado com sucesso!',
          'success'
        );
      }
    });
  }
}
