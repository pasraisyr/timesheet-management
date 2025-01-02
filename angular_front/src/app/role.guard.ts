import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role'];
    const token = localStorage.getItem('access_token');
    const userRole = localStorage.getItem('role'); // Store the role in localStorage after login

    if (token && userRole === expectedRole) {
      return true; // Role matches, allow access
    } else {
      this.router.navigate(['/']); // Redirect if not authorized
      return false;
    }
  }
}
