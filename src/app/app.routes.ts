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
    ],
  },
  {
    path: '**',
    component: HomeComponent,
    title: 'Página não encontrada',
  },
];
