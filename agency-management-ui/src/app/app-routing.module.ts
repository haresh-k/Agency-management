import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgenciesComponent } from './agencies/agencies.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgencyDetailComponent } from './agency-detail/agency-detail.component';

const routes: Routes = [
  { path: 'agencies', component: AgenciesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/agencies', pathMatch: 'full' },
  { path: 'detail/:id', component: AgencyDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
