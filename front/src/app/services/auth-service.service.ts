import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
private loginUrl = 'http://localhost:8000/login/';
isAdmin: boolean = false;
isUser: boolean = false;
isSuperAdmin: boolean = false;
authToken: null | undefined;
Name : string = ""
Lastname : string = ""
Email : string = ""
Role : string = ""
Etat : string = ""
id : number = 0
Note : string = ""
Datecreation : string = ""
field : string = ""
image : string = ""
  isFormSubmitted: boolean=false;
  errorMessage: string='';

  constructor(private http: HttpClient, private router: Router) { }
  login(email: string, password: string): Observable<any> {
    this.isFormSubmitted = true;
    return this.http.post<any>(this.loginUrl, { email: email, password: password })
      .pipe(
        tap(response => {

          this.Name = response.Info?.Name
          this.Email = response.Info?.Email
          this.Lastname = response.Info?.Lastname
          this.id = response.Info?.id
          this.Role = response.Info?.Role
          this.Etat = response.Info?.Etat
          this.Note = response.Info?.Note
          this.Datecreation = response.Info?.Datecreation
          this.field = response.Info?.field
          this.image = response.Info?.image
          this.saveData("Name",this.Name)
          this.saveData("Lastname",this.Lastname)
          this.saveData("id",response.Info?.id)
          this.saveData("Role",this.Role)
          this.saveData("Etat",this.Etat)
          this.saveData("Datecreation",this.Datecreation)
          this.saveData("field",this.field)
          this.saveData("image",this.image)
          this.saveData("Email",this.Email)
         localStorage.setItem("Note",response.Info?.Note)

         localStorage.setItem("image",response.Info?.image)
         
          localStorage.setItem('Email', response.Info?.Email);

          localStorage.setItem('id', response.Info?.id);
          console.log(response.Info?.id); 
          //vérification de l'etat
          if(response.etat == true && response.access== false){
            this.errorMessage = "Ce mot de passe n'est pas pour cette application";
          }else if (response.etat == false && response.access== false){
          
            this.errorMessage = "Ce compte est désactivé";
            setTimeout(() => {
              this.errorMessage = "";
            }, 3000); 
          
          }else
          //vérification du role
          if ( response.Info?.Role === 'admin') {
            this.isAdmin = true;
            console.log('la valeur de '+response.Info?.Name)
            sessionStorage.setItem('currentUser','admin');
            sessionStorage.setItem('token', response.token);
            console.log('cest login : ',sessionStorage.getItem('token'));
            this.router.navigate(['/applist']); 
          } else if (response.Info?.Role === 'superadmin') {
            this.isSuperAdmin = true;
            sessionStorage.setItem('currentUser','superadmin');
            sessionStorage.setItem('token', response.token);
            this.router.navigate(['/dashboard']); 
          } else if ( response.Info?.Role === 'user') {
            this.isUser = true;
            sessionStorage.setItem('currentUser','user');
            //verification des tokenss
            sessionStorage.setItem('token', response.token);
            this.router.navigate(['/password']);
          }else {
            this.errorMessage = "Mot de passe ou email incorrect";
          }    
        }),
        catchError(err => {
          console.log(err);
          this.errorMessage = "Mot de passe ou email incorrect";
          return throwError(err);
        })
      );
  }
  //fonction logout et destruction des sessions 
  logout() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.clear()
    localStorage.clear()
    this.isAdmin=false;
    this.isUser=false;
    this.isSuperAdmin=false;
    sessionStorage.clear();
    localStorage.clear();
    this.errorMessage = ''; 
    
  }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  
  getUserRole(){
    return sessionStorage.getItem('currentUser');
  }
  
 }
