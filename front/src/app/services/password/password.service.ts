import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from 'src/app/models/Application';
import { Password } from 'src/app/models/Password';
import { environment } from 'src/environments/environment';

const baseUrl = '';
@Injectable({
  providedIn: 'root'
})
  
export class PasswordService implements OnInit {
  
  private API_Password=environment.API_Password;
  private API_User=environment.API_User;
  private API_App=environment.API_App;
  
  constructor(private http: HttpClient) { }

  getPasswordsList(): Observable<[]> {
    const headers = new HttpHeaders({
      'Authorization': 'token ' + sessionStorage.getItem('token')
    });
    
    console.log('cest password',sessionStorage.getItem('token'))
    return this.http.get<[]>(`${this.API_Password}`,{headers});
  }


  getPassword(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'token ' + sessionStorage.getItem('token')
    });
    
    console.log('cest applist',sessionStorage.getItem('token'))
    return this.http.get(`${this.API_Password}/${id}`,{headers});
  }


  getUser(id: number): Observable<any> {

    return this.http.get(`${this.API_User}${id}`);

    const headers = new HttpHeaders({
      'Authorization': 'token ' + sessionStorage.getItem('token')
    });
    
    console.log('cest password',sessionStorage.getItem('token'))
    return this.http.get(`${this.API_User}/${id}`,{headers});

  }



  updatePassword(id: number, value: any): Observable<any> {
    return this.http.put(`${this.API_Password}${id}/`, value);
  }
  getAppsList(): Observable<any> {
    return this.http.get<[]>(`${this.API_App}`);
  }
  deletePassword(id: number): Observable<any> {
    return this.http.delete(`${this.API_Password}${id}/`);
  }
  findbyApplication(name: any): Observable<Password[]> {
    return this.http.get<Password[]> (`${this.API_Password}?search=${name}`);
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  addPassword(data: any): Observable<any> {
    return this.http.post(this.API_Password, data);
  }
}
