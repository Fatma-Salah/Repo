import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { HomeComponent } from './features/home/home/home.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent, data: { breadcrumb: 'auth' },
    children: [
      {
        path: 'login', data: { breadcrumb: 'login' },
        loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component:HomeComponent, data: { breadcrumb: 'Holme' }
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },

  {
    path: '404',
    component: BlankLayoutComponent,
    // loadChildren: () => import('./features/not-found/not-found.module').then(m => m.NotFoundModule)
  },

  { path: '**', redirectTo: '404' }
];
