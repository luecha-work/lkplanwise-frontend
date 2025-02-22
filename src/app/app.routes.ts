import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/deshbord' },
  {
    path: 'deshbord',
    loadComponent: () =>
      import('./features/home/home.component').then((mod) => mod.HomeComponent),
  },
  // {
  //   path: 'welcome',
  //   loadChildren: () =>
  //     import('./pages/welcome/welcome.routes').then((m) => m.WELCOME_ROUTES),
  // },
];
