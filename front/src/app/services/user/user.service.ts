import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userurl = environment.API_User


    constructor(private http:HttpClient) { }
    getAll(): Observable<User[]> {
      const headers = new HttpHeaders({
        'Authorization': 'token ' + sessionStorage.getItem('token')
      });
      
      console.log('cest applist',sessionStorage.getItem('token'))
      return this.http.get<User[]>(this.userurl, { headers });
    }

    get(id: any): Observable<User> {
      return this.http.get<User>(`${this.userurl}${id}`);
    }

    create(data: any): Observable<any> {
      return this.http.post(this.userurl, data);
    }

    update(id : any , data: any): Observable<any> {
      return this.http.put(`${this.userurl}${id}/`,data);
    }

     updatePrf(id : number , uname: any , lname : any): Observable<any> {
    return this.http.put(`${this.userurl}${id}/`,uname , lname);
  }
  

    delete(id: any): Observable<any> {
      return this.http.delete(`${this.userurl}${id}/`);
    }

    deleteAll(): Observable<any> {
      return this.http.delete(this.userurl);
    }

    findByTitle(title: any): Observable<User[]> {
      return this.http.get<User[]>(`${this.userurl}?title=${title}`);
    }
}
