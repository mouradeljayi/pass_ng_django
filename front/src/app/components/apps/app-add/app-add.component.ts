import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Application } from 'src/app/models/Application';
import { ApplicationService } from 'src/app/services/application/application.service';

@Component({
  selector: 'app-app-add',
  templateUrl: './app-add.component.html',
  styleUrls: ['./app-add.component.css']
})
export class AppAddComponent {

  bgColor=''
  successMessage=''
  errorMessage='' 

  mode = 'list'

  appf: Application = {
    id: 0,
    NomApp: '',
    UrlApp: '',
    Datecreation: new Date,
  };


  constructor(private appserv:ApplicationService,
    private router:Router){

  }


  form = new FormGroup({
    appname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    appurl: new FormControl('', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),


  });

  createApp(){


    const data = {
      NomApp: this.appf.NomApp,
      UrlApp: this.appf.UrlApp
    };



    this.appserv.create(data)
    .subscribe({
      next:(res) => {
        console.log(res)
        this.bgColor="bg-success"
        this.successMessage="Application ajouté avec succès"
      },
      error:(err) => {
        console.log(err);
        this.bgColor="bg-danger"
        this.errorMessage="Application existe déjà"
      }
    })
  }




  onCancel(){
    this.mode='list'
  }




  

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
  }
}

