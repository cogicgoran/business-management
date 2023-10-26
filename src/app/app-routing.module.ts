import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddBusinessComponent } from './add-business/add-business.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'add-business', component: AddBusinessComponent},
  { path: '', component: DashboardComponent}, 
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
