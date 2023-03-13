import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAddComponent } from './components/apps/app-add/app-add.component';
import { AppListComponent } from './components/apps/app-list/app-list.component';
import { AppUpdComponent } from './components/apps/app-upd/app-upd.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListComponent } from './components/List/list/list.component';
import { AddAppPasswordComponent } from './components/passwords/addapppassword/addapppassword.component';
import { PasswordsComponent } from './components/passwords/passwords.component';
import { TestComponent } from './components/test/test.component';
import { UserAddComponent } from './components/users/user-add/user-add.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthGuard1 } from './services/auth-guard1.service';
import { AuthGuard2 } from './services/auth-guard2.service';

const routes: Routes = [

  {path: '', component: LoginComponent },
  {path: 'appedit/:id', component: AppUpdComponent },
  {path: 'test', component: TestComponent },
  {path: 'login', component: LoginComponent},
  
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,canActivate: [AuthGuard]
      },
      {
        path: 'password',
        component: PasswordsComponent,canActivate: [AuthGuard1]
      },
      {
        path: 'addapppwd/:id',
        component: AddAppPasswordComponent,canActivate: [AuthGuard1]
      },
      {
        path: 'password/:id',
        component: PasswordsComponent,canActivate: [AuthGuard1]
      },
      {
        path: 'appadd',
        component: AppAddComponent,canActivate: [AuthGuard2]
      },
      {
        path: 'applist',
        component: AppListComponent
      },
      {
        path: 'adduser',
        component: UserAddComponent,canActivate: [AuthGuard2]
      },

      {
        path: 'List',
        component: ListComponent,canActivate: [AuthGuard2]
      },
      {
        path: 'listuser',
        component: UserListComponent,canActivate: [AuthGuard2]
      },
    ]
  },
  {path: 'notfound', component: NotfoundComponent},
  {path: '**', redirectTo:'notfound'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
