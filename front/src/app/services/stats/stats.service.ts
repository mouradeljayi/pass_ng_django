import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from 'src/app/models/Application';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private user = environment.API_User;
  private UserRoles = environment.API_User;
  private UserApps = environment.API_App;

  constructor(private http:HttpClient) { }

  getAllUsers(): Observable<User[]> {
    //ajout des headers
    const headers = new HttpHeaders({
      'Authorization': 'token ' + sessionStorage.getItem('token')
    });
    
    console.log('cest dashboard',sessionStorage.getItem('token')) 
    const url = `${this.user}`;
    return this.http.get<User[]>(url, { headers });
    //return this.http.get<User[]>(`${this.user,{ headers }}`);
  }

  getRoleUsers() : Observable<[]> {
    //ajout de headers 
    const headers = new HttpHeaders({
      'Authorization': 'token ' + sessionStorage.getItem('token')
    });
    console.log('cest dashboard',sessionStorage.getItem('token'))
    //fin ajout
    const url = `${this.UserRoles}role_stats/`;
    return this.http.get<[]>(url, { headers });
    //return this.http.get<[]>(`${this.UserRoles,/* add*/{ headers }}role_stats/`)
  }

  getAppUsers() : Observable<[]> {
    //ajout de headers 
    const headers = new HttpHeaders({
      'Authorization': 'token ' + sessionStorage.getItem('token')
    });
    console.log('cest dashboard',sessionStorage.getItem('token'))
    //fin ajout
    const url = `${this.UserRoles}role_stats/`;
  return this.http.get<[]>(url, { headers });
    //return this.http.get<[]>(`${this.UserApps, { headers }}}app_stats/`)
  }


  getTotalApps() : Observable<{total_App: number}> {
    //ajout de headers 
    const headers = new HttpHeaders({
      'Authorization': 'token ' + sessionStorage.getItem('token')
    });
    console.log('cest dashboard',sessionStorage.getItem('token'))
    //fin ajout
    const url = `${this.UserApps}total_App/`;
  return this.http.get<{ total_App: number }>(url, { headers });
    //return this.http.get<{total_App: number}>(`${this.UserApps, {headers}}total_App/`)
  }



  getUserStats() : Observable<any> {
    //ajout de headers 
    const headers = new HttpHeaders({
      'Authorization': 'token ' + sessionStorage.getItem('token')
    });
    console.log('cest dashboard',sessionStorage.getItem('token'))
    //fin ajout
    const url = `${this.user}users_stats/`;
  return this.http.get<any>(url, { headers });
    //return this.http.get<any>(`${this.user, {headers}}users_stats/`)
  }

  

 

}
