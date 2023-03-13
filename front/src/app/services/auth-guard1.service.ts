import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard1 implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const currentUserRole = this.authService.getUserRole();
    if (currentUserRole && (currentUserRole === 'superadmin' || currentUserRole === 'admin' || currentUserRole === 'user')) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}