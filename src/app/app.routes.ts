import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ProdutoComponent } from './pages/produto/produto.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'Página inicial',
      },
      {
        path: 'product/:id',
        component: ProdutoComponent,
        title: 'Detalhes do produto',
      },
      {
        path: 'new-product',
        loadComponent: () =>
          import('./pages/produto/form/form.component').then(
            (m) => m.ProductFormComponent
          ),
        title: 'Criar produto',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./pages/cart/cart.component').then((m) => m.CartComponent),
        title: 'carrinho de compras',
      },
    ],
  },
  {
    path: '**',
    component: HomeComponent,
    title: 'Página não encontrada',
  },
];
