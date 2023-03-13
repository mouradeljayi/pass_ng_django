import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ShowHidePasswordModule } from 'ngx-show-hide-password';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { PasswordsComponent } from './components/passwords/passwords.component';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppAddComponent } from './components/apps/app-add/app-add.component';
import { AppListComponent } from './components/apps/app-list/app-list.component';
import { AppUpdComponent } from './components/apps/app-upd/app-upd.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NotificationService } from './services/notification/notification.service';
import { TestComponent } from './components/test/test.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UserUpdateComponent } from './components/users/user-update/user-update/user-update.component';
import { AddAppPasswordComponent } from './components/passwords/addapppassword/addapppassword.component';
import { AddPasswordComponent } from './components/passwords/add-password/add-password.component';
import { UserAddComponent } from './components/users/user-add/user-add.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { PopupNotificationComponent } from './components/popup-notification/popup-notification.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { DarkModeToggleComponent } from './pages/dark-mode-toggle/dark-mode-toggle.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    SidebarComponent,
    NavbarComponent,
    LoginComponent,
    PasswordsComponent,

    AppAddComponent,
    AppListComponent,
    AppUpdComponent,
    TestComponent,

    UserUpdateComponent,
    AddAppPasswordComponent,
    AddPasswordComponent,
    UserAddComponent, 
    UserListComponent, PopupNotificationComponent, NotfoundComponent, DarkModeToggleComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule,

    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    Ng2SearchPipeModule,
    ShowHidePasswordModule,

    NgxPaginationModule



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
