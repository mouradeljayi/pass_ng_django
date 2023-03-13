import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string='';
  password: string='';
  isFormSubmitted: boolean=true;
  errorMessage: string='';

  constructor(public authService: AuthService, private router: Router) { }
  logout() {
    this.authService.logout();
  }
  ngOnInit(): void {
   
  }
//update this function 
onSubmit(loginForm: NgForm) {
  this.isFormSubmitted = true;
  
  if (loginForm.valid) {
    this.authService.login(this.email, this.password)
      .subscribe(
        role => {
          console.log('Logged in as'+role.Info.Role);
          console.log('Logged in as'+role.NomApp);
        },
        error => {
          console.error('Error logging in', error);
        }
      );
  } else {
    this.errorMessage = "Le formulaire est invalide.";
  }
}


  
  
  }
 
  
