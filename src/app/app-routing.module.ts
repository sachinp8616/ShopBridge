import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminGuard } from './Gaurds/admin.guard';
import { GuestGuard } from './Gaurds/guest.guard';
import { ProductFormComponent } from './product-form/product-form.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  {path: '', component: SignInComponent, canActivate: [GuestGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard]},
  {path: 'product-form', component: ProductFormComponent, canActivate: [AdminGuard]},
  {path: 'product-form/:id', component: ProductFormComponent, canActivate: [AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
