import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from 'src/app/models/Application';
import { environment } from 'src/environments/environment';





@Injectable({
  providedIn: 'root'
})
export class ApplicationService {



  
private appurl = environment.API_App


  constructor(private http: HttpClient) { }

  getAll(): Observable<Application[]> {
    const headers = new HttpHeaders({
      'Authorization': 'token ' + sessionStorage.getItem('token')
    });
    
    console.log('cest applist',sessionStorage.getItem('token'))


    return this.http.get<Application[]>(this.appurl, { headers });
  }
  

  get(id: any): Observable<any> {
    return this.http.get(`${this.appurl}${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.appurl, data);
  }

  update(id : number , data: any): Observable<any> {
    return this.http.put(`${this.appurl}${id}/`,data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.appurl}${id}/`);
  }

 

  findByName(name: any): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.appurl}?search=${name}`);
  }
  findByUrl(url: any): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.appurl}?search=${url}`);
  }
  findByDate(date : any): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.appurl}?search=${date}`);
  }
}
