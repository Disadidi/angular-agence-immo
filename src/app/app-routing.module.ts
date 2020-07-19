import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { SinglePropertyComponent } from './single-property/single-property.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AuthGuardService]},
  { path: 'login', component: SigninComponent},
  { path: 'property/:id', component: SinglePropertyComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
