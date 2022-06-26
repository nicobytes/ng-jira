import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { RedirectGuard } from '@guards/redirect.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [RedirectGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'app',
    canActivate: [AuthGuard],
    loadChildren: () => import('@app/app.module').then((m) => m.AppModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
